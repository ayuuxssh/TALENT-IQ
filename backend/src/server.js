// const express = require("express");

// we are using module not commonjs

import express from "express"
import path from"path";
import { ENV } from "./lib/env.js";
const app = express();
const port = ENV.PORT;


app.use(express.json());
const __dirname = path.resolve();
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
app.listen((port),(err)=>{
if(err)
{
    console.log(err);
}
    console.log(`Application is running in ${port}`);
})