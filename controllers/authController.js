import { Error } from "mongoose";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import nodeMailer from "nodemailer"
import crypto from 'crypto'
import { promisify } from "util";
import fresh from "fresh";



const Token = (id) =>{
    return jwt.sign({ id  } , process.env.JWT_SEC ,{
        expiresIn : process.env.JWT_EXP
    })
}


export const signUp = async (req , res) => {
    const user = await User.create(req.body)
    const token = jwt.sign({ id : user._id} , process.env.JWT_SEC ,{
        expiresIn : process.env.JWT_EXP
    })  
    res.status(201).json({user : user , token :token})
}




export const login = async (req, res) =>{
    const { email, password } = await req.body
    if(!email || !password) return  res.json({err : "we need email and password"})

    const user = await User.findOne({email}).select("+password")
    // const correct = await User.correctPass(password , user.password)
    console.log(user)
    if(!user || !(await user.correctPass(password , user.password))){
        return res.json({err : "incorrect email or pass"})
    }

    const token = Token(user._id)

    res.status(200).json({
        token : token 
    })
}



export const  resetPass = async (req, res , next) =>{
  const email = await req.body.email
  const user  =  await User.findOne({email : email})
  if (!user ) {
    return res.json({m : "could not find user "})


  }



}


export const forgotPassword = async (req, res) =>{

  const email = await req.body.email
  const user  =  await User.findOne({email : email})
  if (!user ) {
    return res.json({m : "could not find user "})


  }

  const token = user.passwordRestTokenFun()
  await user.save({validateBeforeSave : false})
  return res.json({restToken : token})
    // const transporter = nodeMailer.createTransport({
    //     service: "Gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: "7ussein2510@gmail.com",
    //       pass: "ufhw cuxa mxgm olmx",
    //     },
    //   }) 

    //   const mailOptions = {
    //     from: "7ussein2510@gmail.com",
    //     to: "Saeedallam527@outlook.com",
    //     subject: " ازيك ياعلق",
    //     text: " احلي مسا ع فخادك",
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error("Error sending email: ", error);
    //     } else {
    //       console.log("Email sent: ", info.response);
    //     }
    //   });

    //   res.json({s: "done"})

}


export const restPassword = async (req, res) =>{
  const hashedToken =  crypto.createHash("sha256").update(req.body.token).digest("hex")
  console.log(hashedToken)
  const user = await User.findOne({  passwordRestToken : hashedToken , PasswordRestExpires : {$gt : Date.now()} })
  console.log(user)
  if (!user){
    return res.json({m : "token exp or not valid "})
  }

  const newPassword = req.body.password 
  user.password = newPassword
  user.PasswordRestExpires = undefined
  user.passwordRestToken = undefined
  await user.save({validateBeforeSave : false})

  const token = Token(user._id)

  res.json({
    token : token,
     password : newPassword
  })

}




export const  updatePassword  = async (req, res) =>{
  // const user = User.findById(req.user.id).select("+password")
  // if ( !user ) return res.json({m : " user not found "})
    const {password , newConfirmPassword , newPassword} = await req.body
    const h = await req.headers
    const {authorization} = h
    const token  = authorization.split(' ')[1]

    // console.log(token)

    //2- verify the token if its expired or not or its valid token  
    const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SEC)

    // console.log(decodedJwt)

    //3- check if user still exists
    const freshUser  = await User.findById( decodedJwt.id ).select("+password")
    if(!freshUser) return res.json({msg : "no user"}) 

    const Conf = freshUser.correctPass( password ,freshUser.password)

    if(!Conf) return res.json({m : "password incoreect "})
    
    freshUser.password = newPassword 
    freshUser.confirmPassword = newConfirmPassword
    freshUser.save()


    // const ntoken  = Token(freshUser._id) 

    res.json({
      "status" : "success",
    })











}