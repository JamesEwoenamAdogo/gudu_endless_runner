import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required: true
    },
    D_O_B:{
        type:Date,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    Scores:{
        type:[Object]
    }
},{timestamps:true})


export const userSchema = mongoose.model("user",userModel)