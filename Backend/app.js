import express, { urlencoded } from 'express'
import authrouter from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app=express()


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authrouter)



export default app;