import express from "express"
import { signUp,login,deleteUser,updateUser, getUser, updateScores, updateAssets } from "../Controller/userController.js"
import { userAuth } from "../middleware/authUser.js"

export const userRoutes = express.Router()

userRoutes.post("/sign-up",signUp)
userRoutes.post("/login",login)
userRoutes.put("/update-user",userAuth,updateUser)
userRoutes.delete("/delete-user",userAuth,deleteUser)
userRoutes.get("/user-details/:id", getUser)
userRoutes.put("/update-scores", userAuth , updateScores)
userRoutes.put("/update-powerUps",userAuth,updateAssets)
