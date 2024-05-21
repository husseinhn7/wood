import jwt from "jsonwebtoken";
import { promisify } from "util";
import { User } from "../models/userModel.js";


export const protect = async (req, res, next) =>{
    // check if token exists in headers 
    const h = await req.headers
    const {authorization} = h
    const token  = authorization.split(' ')[1]

    // console.log(token)

    //2- verify the token if its expired or not or its valid token  
    const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SEC)

    // console.log(decodedJwt)

    //3- check if user still exists
    const freshUser  = await User.findById( decodedJwt.id )
    if(!freshUser) return res.json({msg : "no user"}) 


    //4- check if user changed his password    
    console.log((await freshUser.passwordChangedAfter(decodedJwt.iat)))
    if ((await freshUser.passwordChangedAfter(decodedJwt.iat))){
        return res.json({msg : "passchanged login again"})
    }
    console.log("(await freshUser.passwordChangedAfter(decodedJwt.iat))")
    req.user = freshUser
    next()  

}



export const restrict = (...role) =>{
    return (req, res, next) =>{
        console.log(req.user.role)
        if(!role.includes(req.user.role)){
            return res.json({no : " only admins"})
        }
        next()
    } 
}