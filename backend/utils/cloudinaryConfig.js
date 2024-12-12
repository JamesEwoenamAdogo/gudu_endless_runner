import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.api_key,
    api_secret: process.env.api_Secret

})

export default cloudinary