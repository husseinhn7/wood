import express from 'express'
import { signUp, login , forgotPassword , resetPass , restPassword, updatePassword } from '../controllers/authController.js'




const userRouter = express.Router()

 


userRouter
.post("/signup", signUp)
.post("/login", login )
.post("/changePassword" , restPassword )
.post("/forgetPassword/", forgotPassword  )
.post("/updatePassword/", updatePassword  )




export default userRouter