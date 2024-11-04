import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { userRoutes } from "./Routes/userRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
const port = process.env.PORT

app.listen(port, ()=>{
    console.log("Database connected at "+port)
})
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected")
})
app.use("/api/v1",userRoutes)