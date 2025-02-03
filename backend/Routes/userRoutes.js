import express from "express"
import { signUp,login,deleteUser,updateUser, getUser, updateScores, updateAssets, verifyAccount, checkNumber, checkOTP, resetPassword,deleteAccount } from "../Controller/userController.js"
import { userAuth } from "../middleware/authUser.js"

export const userRoutes = express.Router()

userRoutes.post("/sign-up/:name",signUp)
userRoutes.post("/login/:name",login)
userRoutes.put("/update-user",userAuth,updateUser)
userRoutes.delete("/delete-user",userAuth,deleteUser)
userRoutes.get("/user-details/:id/:name", getUser)
userRoutes.put("/update-scores/:name", userAuth, updateScores)
userRoutes.put("/update-powerUps/:name",userAuth,updateAssets)
userRoutes.post("/verify-account", verifyAccount)

userRoutes.post("/check-number", checkNumber)
userRoutes.post("/checkOTP",checkOTP)
userRoutes.post("/update-password",resetPassword)
userRoutes.delete("/delete-account/:phone",deleteAccount) 

