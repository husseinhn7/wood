import express from 'express'
import signUp, {login} from '../controllers/authController.js'





const userRouter = express.Router()




userRouter
.post("/signup", signUp)
.post("/login", login )


export default userRouter