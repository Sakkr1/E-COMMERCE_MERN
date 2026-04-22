/* Register and Login */
import("dotenv/config")
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface registerParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
}

export const register = async({ firstName, lastName, email, password }: registerParams) => {
    const findUser = await userModel.findOne({ email });
    if(findUser) {
        return { data: "This email is already linked to an account", statusCode: 400 }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
}

interface loginParams {
    email: string;
    password: string;
}

export const login = async({ email, password }: loginParams) => {
    const findUser = await userModel.findOne({ email });
    if(!findUser) {
        return { data: "Wrong email or password", statusCode: 400 }
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if(passwordMatch) {
        return { data: generateJWT({ firstName: findUser.firstName, lastName: findUser.lastName, email: findUser.email }), statusCode: 200 };
    }

    return { data: "Wrong email or password", statusCode: 400 }
}

const generateJWT = (data: any) => {
    return jwt.sign(data, process.env.SECRET_JWT || "");
}