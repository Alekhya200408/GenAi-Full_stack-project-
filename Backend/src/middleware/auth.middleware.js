import jwt from 'jsonwebtoken'

function authUser(req,res,next) {
    const token=req.cookies.token

    if (!token) {
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        
        const user=decoded
        next()
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

export default {authUser}