import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

const app = express();
const port = 3111;

app.use(express.json());
app.use("/user", userRouter);

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log(`Connected To Database!`))
    .catch((err) => console.log("Something went wrong: ", err));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})


