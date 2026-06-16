// const express = require("express");

// we are using module not commonjs

import express from "express"
import { ENV } from "./lib/env.js";
const app = express();
const port = ENV.PORT;


app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hey Welcome");
});

app.listen((port),()=>{
    console.log(`Application is running in ${port}`);
})