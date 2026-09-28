import express from 'express'
import app from './app.js'
import { config } from 'dotenv';
import DBconn from './src/DB/dbConn.js';

config()

await DBconn()



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})