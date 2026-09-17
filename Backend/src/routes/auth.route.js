import { Router } from "express";
import authcontrollers from "../controllers/user.controllers.js"
import authMiddleware from "../middleware/auth.middleware.js";


const authrouter=Router()

authrouter.post('/register',authcontrollers.RegisterUser)
authrouter.post('/login',authcontrollers.LoginUser)
authrouter.post('/logout',authcontrollers.LogoutUser)
authrouter.get('/get-me',authMiddleware.authUser,authcontrollers.getmeUser)



export default authrouter