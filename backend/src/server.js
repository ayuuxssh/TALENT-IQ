// const express = require("express");

// we are using module not commonjs

import express from "express"
import path from"path";
import { clerkMiddleware } from '@clerk/express'
import {serve} from "inngest/express"
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"
import { inngest,functions } from "./lib/injest.js";

const app = express();
const port = ENV.PORT;


app.use(express.json());
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use("/api/inngest",serve({client:inngest,functions}))

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use(clerkMiddleware());// this adds auth field to request object:req.auth();

app.use("api/chat",chatRoutes);
app.get("/",(req,res)=>{
    res.send("Hey Welcome");
});
app.get("/books",(req,res)=>{
    res.send("Welcome to Books route");
})


//when you pass an array of middleware to express it automatically flattens and executes them sequentially one by one

app.get("/video-calls",protectRoute,(req,res)=>{
    res.status(200).json({msg:"Video call endpoint"});
})
// make ready for production
if(ENV.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")));


    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

const startServer = async()=>{
    try {
        await connectDB();
app.listen((port),()=>{
    console.log(`Application is running in ${port}`);
})
    } catch (error) {
        console.error("Error  Starting the server ",error);
    }
}
startServer();