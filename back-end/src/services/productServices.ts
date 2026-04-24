import productModel from "../models/productModel";

export const getAllProducts = async() => {
    return await productModel.find();
}

export const seedInitProducts = async() => {
    const products = [
    { 
        title: "iPhone X", 
        image: "https://m.media-amazon.com/images/I/51G4Jpqq46L._AC_UF350,350_QL80_.jpg", 
        price: 10000, 
        stock: 15 
    },
    { 
        title: "MacBook Air Pro", 
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606", 
        price: 90000, 
        stock: 12 
    },
    { 
        title: "iPhone 13 Pro", 
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select", 
        price: 19000, 
        stock: 20 
    }
];

    const existedProducts = await getAllProducts();

    if(existedProducts.length == 0) {
        productModel.insertMany(products);
    }
}