import mongoose from "mongoose";
import { ENV } from "../constant.js";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${ENV.MONGO_URI}`);
        console.log(`MongoDB Connected => ${con.connection.host}`)
    } catch (error) {
        console.log("Error =>", error)
    }
}