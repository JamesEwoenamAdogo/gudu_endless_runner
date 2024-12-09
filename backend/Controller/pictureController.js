import { pictureModel } from "../Model/pictureUpload.js";
import fs from "fs"


export const addPicture = async(req,res)=>{
    try{
        // const fileName = req.files.filename
        // console.log(req.file)
        const newPicture = await new pictureModel({picture:req.file.filename})
        newPicture.save()
        return res.json({file:req.file})
        



    }catch(error){
        console.log(error)
        return res.status(500).json({success: false})
    }

    
}

export const allPictures = async(req,res)=>{
    try{
        const allImages = await pictureModel.find({})
        let numberIndex = allImages.length -1
        let displayIndex = Math.floor(Math.random()*numberIndex)
        return res.json({success:true,image:allImages[displayIndex]})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}


export const deletePicture = async(req,res)=>{

    try{
        const {id}= req.body
        await pictureModel.findByIdAndDelete(id)
        fs.unlink("./upload",()=>{

        })
        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}