// const express = require("express");

// we are using module not commonjs

import express from "express"
import path from"path";
import {serve} from "inngest/express"
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { inngest,functions } from "./lib/injest.js";

const app = express();
const port = ENV.PORT;


app.use(express.json());
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use("/api/inngest",serve({client:inngest,functions}))

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.get("/",(req,res)=>{
    res.send("Hey Welcome");
});
app.get("/books",(req,res)=>{
    res.send("Welcome to Books route");
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