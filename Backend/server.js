import express from 'express'
import app from './app.js'
import { config } from 'dotenv';
import DBconn from './src/DB/dbConn.js';
import invokeGeminiAI from './src/services/ai.services.js';

config()
DBconn()
invokeGeminiAI()


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})