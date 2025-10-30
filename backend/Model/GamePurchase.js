import mongoose from "mongoose"

const gamePurchaseSchema = new mongoose.Schema({
    name:{
        type:String
    },
    game:{
        type:String
    },
    type:{
        type:String
    }
},{timestamps:true})


export const gamePurchase = mongoose.model("gamePurchase",gamePurchaseSchema)