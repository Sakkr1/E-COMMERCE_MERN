import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface CreateCart {
    userId: string;
}

const createCart = async({ userId }: CreateCart) => {
    const cart = await cartModel.create({ userId, items: [], totalAmount: 0});
    await cart.save();
    return cart;
}

interface GetActiveCart {
    userId: string;
}

export const getActiveCart = async ({ userId }: GetActiveCart) => {
    let cart = await cartModel.findOne({ userId, status: "active" });

    if(!cart) {
        cart = await createCart({ userId });
    }

    return cart;
}

interface AddItemToCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async({ userId, productId, quantity }: AddItemToCart) => {
    const cart = await getActiveCart({ userId });

    const existedCart = cart.items.find(p => p.product.toString() === productId);
    if(existedCart) {
        return { data: "Item already exists in cart!", status: 400 };
    }

    const product = await productModel.findById(productId);
    if(!product) {
        return { data: "Product is not found!", status: 400 };
    }

    if (product.stock < quantity) {
        return { data: "Low stock for this product!", status: 400 };
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity });

    cart.totalAmount += product.price * quantity;


    const updatedCart = await cart.save();

    return { data: updatedCart, status: 201 };
}

interface UpdateItemInCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const updateItemInCart = async({ userId, productId, quantity }: UpdateItemInCart) => {
    const cart = await getActiveCart({ userId });

    const existedInCart = cart.items.find(p => p.product.toString() === productId);
    if(!existedInCart) {
        return { data: "Item does not exist in your cart", status: 400 }
    }

    const product = await productModel.findById(productId);
    if(!product) {
        return { data: "Product is not found!", status: 400 };
    }
    if (product.stock < quantity) {
        return { data: "Low stock for this product!", status: 400 };
    }

    const otherCartItems = cart.items.filter((p) => p.product === productId);

    let total = calcTotal(otherCartItems);

    existedInCart.quantity = quantity;
    total += existedInCart.unitPrice * existedInCart.quantity;

    cart.totalAmount = total;
    
    const updatedCart = await cart.save();

    return { data: updatedCart, status: 201 };
}

interface DeleteItemInCart {
    userId: string;
    productId: any;
}

// TO DO: Fix The Problem With Deleting an Item
export const deleteItemInCart = async({ userId, productId }: DeleteItemInCart) => {
    const cart = await getActiveCart({ userId });

    const existedInCart = cart.items.find(p => p.product.toString() === productId);
    if(!existedInCart) {
        return { data: "Item does not exist in your cart", status: 400 }
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

    const total = calcTotal(otherCartItems);

    cart.items = otherCartItems;
    cart.totalAmount = total;
    
    const updatedCart = await cart.save();

    return { data: updatedCart, status: 204 };
}

const calcTotal = (cartItems :ICartItem[]) => {
    const total = cartItems.reduce((sum, product) => {
        sum = product.quantity * product.unitPrice;
        return sum;
    }, 0)

    return total;
}

interface ClearCart {
    userId: string;
}

export const clearCart = async({ userId }: ClearCart) => {
    const cart = await getActiveCart({ userId });
    if(!cart.items) {
        return { data: "The cart is already empty!", status: 400 }
    }

    cart.items = [];
    cart.totalAmount = 0;

    const updatedCart = await cart.save();
    return { data: updatedCart, status: 204 }
}

interface Checkout {
    userId: string;
    address: string;
}

export const checkout = async({ userId, address }: Checkout) => {
    if(!address) {
        return { data: "Please enter the address!", status: 400 }
    }

    const cart = await getActiveCart({ userId });

    const orderItems: IOrderItem[] = [];

    for(const item of cart.items) {
        const product = await productModel.findById(item.product);
        if(!product) {
            return { data: "Product is not found!", status: 400 }
        }

        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }
        orderItems.push(orderItem);
    }

    const order = await orderModel.create({
        userId: userId,
        orderItems: orderItems,
        total: cart.totalAmount,
        address: address
    })

    await order.save();
    return { data: order, status: 200 };
}