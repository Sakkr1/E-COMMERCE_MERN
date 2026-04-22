import { NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

interface ExtendRequest extends Request {
    user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorization = req.get("authorization");
    if(!authorization) {
        res.status(403).send("Auth Is Not Provided!");
        return;
    }

    const token = authorization.split(" ")[1];
    if(!token) {
        res.status(403).send("Token Is Not Provided!");
        return;
    }

    jwt.verify(token, "d090d9b788340d8e09a093c29db31863a9c425ef4f1a59a76ba1657a89771c1d", async(err, payload) => {
        if(err) {
            res.status(403).send("Invalid Token");
            return;
        }

        if(!payload) {
            res.status(403).send("Invalid Token Payload");
            return;
        }

        const userPayload = payload as { email: string }

        const user = await userModel.findOne({ email: userPayload.email});
        if(!user) {
            return res.status(403).send("User Not Found");
        }
        req.user = user;
        next();
    })
}

export default validateJWT;