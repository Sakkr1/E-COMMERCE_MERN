import productModel from "../models/productModel";

export const getAllProducts = async() => {
    return await productModel.find();
}

export const seedInitProducts = async() => {
    const products = [
        { title: "iPhone X", image: "https://www.google.com/imgres?q=iphone%20x&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51G4Jpqq46L._AC_UF350%2C350_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.eg%2F-%2Fen%2FApple-Iphone-Facetime-Silver-Single%2Fdp%2FB07PPRNRF4&docid=jCcqlZshjFSwxM&tbnid=4mrpIs0XbzmoZM&vet=12ahUKEwjtvMba7--TAxWx7AIHHeM2FvcQnPAOegQIERAB..i&w=245&h=350&hcb=2&ved=2ahUKEwjtvMba7--TAxWx7AIHHeM2FvcQnPAOegQIERAB", price: 10000, stock: 15 }
    ];

    const existedProducts = await getAllProducts();

    if(existedProducts.length == 0) {
        productModel.insertMany(products);
    }
}