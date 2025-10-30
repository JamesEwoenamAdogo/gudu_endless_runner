import express from "express"
import { signUp,login,deleteUser,updateUser, getUser, updateScores, updateAssets, verifyAccount, checkNumber, checkOTP, resetPassword,deleteAccount, userAnalysis, userDashBoardLogin } from "../Controller/userController.js"
import { userAuth } from "../middleware/authUser.js"
import { gameAnalytics } from "../Model/GameActivity.js"

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

userRoutes.get("/user-analytics", userAnalysis)
userRoutes.post("/user-dashboard-login",userDashBoardLogin)

userRoutes.get("/game-analytics", gameAnalytics)


