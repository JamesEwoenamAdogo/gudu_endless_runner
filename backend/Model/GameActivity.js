import mongoose from "mongoose"

const gameAnalyticsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    game:{
        type:String
    }
},{timestamps:true})


export const gameAnalytics = mongoose.model("gameAnalytics",gameAnalyticsSchema)