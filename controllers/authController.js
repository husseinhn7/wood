import { Error } from "mongoose";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'



const Token = (id) =>{
    return jwt.sign({ id  } , process.env.JWT_SEC ,{
        expiresIn : process.env.JWT_EXP
    })
}


const signUp = async (req , res) => {
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




export default signUp

