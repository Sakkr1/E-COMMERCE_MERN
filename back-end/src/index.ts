import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitProducts } from "./services/productServices";
import cartRoute from "./routes/cartRoute";
import dotenv from "dotenv";
import cors from "cors";
console.log("index.ts is loaded")

const app = express();
const port = 3111;
dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log(`Connected To Database!`))
    .catch((err) => console.log("Something went wrong: ", err));

seedInitProducts();

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})


