import mongoose from "mongoose"

import { ENV } from "./env.js"

export const connectDB = async()=>{
    try {
        const conn =await mongoose.connect(ENV.DB_URI);
        console.log("✅ Connected to MongoDB:",conn.connection.host)
    } catch (error) {
        console.error("❌ Failed in connecting MongoDB",error);
        process.exit(1); // 0 means success 1 means failure
    }
}
