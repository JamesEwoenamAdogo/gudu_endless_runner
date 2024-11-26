import { userSchema } from "../Model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signUp = async(req,res)=>{
    try{
        // console.log(req.body)
        const {firstName, userName, D_O_B,password,confirm_Password,phoneNumber}= req.body
        const passwordMatch = confirm_Password==password
        const allFields = firstName && userName && userName && D_O_B&& password && confirm_Password && phoneNumber
        const existingUserName = await userSchema.find({userName})
        console.log(existingUserName)
        if(!(existingUserName.length==0)){
            return res.json({success:false,message:"username already existing"})
        }
        if(!allFields){
            return res.json({success:false,message:"please enter all fields"})
        }
        if(!passwordMatch){
            return res.json({success:false,message:"Passwords mismatch"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new userSchema({firstName,userName,D_O_B, password:hashedPassword,phoneNumber})
        newUser.save()
        return res.json({success:true})




    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}
export const login = async(req,res)=>{
    try{
        const {userName,password}= req.body
        console.log(req.body)
        if(!(userName && password)){
            return res.json({success:false, message: "Please enter all fields"})
        }
        const findExisting = await userSchema.find({userName})
        if(!(findExisting.length==1)){
            return res.json({success:false, message:"User not existing"})
        }
        console.log(findExisting)
        const comparePasswords = await bcrypt.compare(password,findExisting[0].password)
        if(!comparePasswords){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = jwt.sign({id:findExisting[0]._id,userName}, process.env.TOKEN_SECRET)
        return res.json({success:true,token,message:"Login successful",userId:findExisting[0]._id})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
export const getUser = async(req,res)=>{
    try{
        const {id} = req.params
        const userDetails = await userSchema.findById(id)
        return res.json({success:true,fullName:userDetails.firstName,userName:userDetails.userName,D_O_B:userDetails.D_O_B, phoneNumber:userDetails.phoneNumber,overAllCoins:userDetails.Scores.overallCoins,currentToken:userDetails.Scores.currentToken, overallToken:userDetails.Scores.overallToken,balance: userDetails.Scores.balance,shield:userDetails.powerUps.Shield,magnet:userDetails.powerUps.magnet, life:userDetails.powerUps.life})
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}



export const deleteUser = async(req,res)=>{
    try{
        const id= req.userId
        await userSchema.findByIdAndDelete(id)
        return res.json({success:true,message:"Account deleted successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }
}


export const updateUser = async(req,res)=>{
    try{
        const id = req.userId
        if(req.body['currentPassword']){
            const {currentPassword,newPassword, confirmPassword} = req.body
            const existingUser = await userSchema.findById(id)
            const comparePassword = await bcrypt.compare(currentPassword, existingUser.password)
            if(!(comparePassword)){
                console.log(existingUser.password)
                return res.json({success:false, message:"Current Password Incorrect"})
            }
            if(!(newPassword==confirmPassword)){
                return res.json({success:false, message:"Password mismatch"})
            }
            const hashedNewPassword = await bcrypt.hash(newPassword,10)
            const upadatePasswordBody = {password:hashedNewPassword}
            const updatedPassword = await userSchema.findByIdAndUpdate(id, upadatePasswordBody, {new: true})
            return res.json({success: true, message: "Password Updated"})

        }
        const updateData= req.body
        delete updateData.token
        console.log(updateData)
        const updated = await userSchema.findByIdAndUpdate(id, updateData, {new:true})
        return res.json({success:true, data:updated})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false})
    }

}

export const updateScores = async(req,res)=>{
    try{
        const id = req.userId
        const {coins} = req.body
        const existing = await  userSchema.findById(id)
        let currentToken = existing.Scores.currentToken
        let overallToken = existing.Scores.overallToken
        let overallCoins = existing.Scores.overallCoins
        let balance = existing.Scores.balance

        balance = coins
        overallCoins+=balance
        currentToken = (coins/5000).toFixed(2)
        overallToken = (overallCoins/5000).toFixed(2)
        const scoreUpdate = {overallCoins,currentToken,overallToken,balance}
        const updateScores = await userSchema.findByIdAndUpdate(id,{Scores:scoreUpdate},{new:true})
        return res.json({message:"success",overAllCoins:updateScores.Scores.overallCoins,overAllToken:updateScores.Scores.overallToken, currentTokens:updateScores.Scores.currentToken, Balance:updateScores.Scores.balance})







    }catch(error){
        console.log(error)
        res.status(500).json({message:"error"})
    }
}