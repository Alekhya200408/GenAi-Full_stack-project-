import { mongoose} from "mongoose";

const DBconn=async(req,res)=>{
    try {
        mongoose.connect(`${process.env.MONGO_URI}genAIFullStack`)
        console.log("MongoDB connected Successfully");
        
    } catch (error) {
        console.log('MongoDb Connection error');
        
    }
}

export default DBconn;