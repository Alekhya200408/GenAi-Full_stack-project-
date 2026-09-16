import {mongoose,Schema} from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        unique:[true,"username already Exists"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already exists with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usermodel=mongoose.model("user",userSchema)

export default usermodel; 