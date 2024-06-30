import express from 'express'
import { signUp, login , forgotPassword , resetPass , restPassword, updatePassword } from '../controllers/authController.js'
import multer from 'multer'
import { uploadPhoto } from '../controllers/authController.js'


const multerStorage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, "../public/images")
    },
    filename : (req, file, cb) =>{
        const ext = file.mimetype.split("/")[1]
        cb(null, `hu.${ext}`)
    }
})

const multerFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else {
        console.log("err")
    }
}
export const upload = multer({
    storage : multerStorage,
    fileFilter : multerFilter
})


const userRouter = express.Router()

 
userRouter
.post("/signup", signUp)
.post("/login", login )
.post("/changePassword" , restPassword )
.post("/forgetPassword/", forgotPassword  )
.post("/updatePassword/", updatePassword  )
.post("/photo", upload.single("photo") , uploadPhoto )




export default userRouter