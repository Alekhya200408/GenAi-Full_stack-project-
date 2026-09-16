import {mongoose,Schema} from "mongoose";

const blacklistScheema= new Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
})

const blacklistModel=mongoose.model('blacklistedToken',blacklistScheema)

export default blacklistModel