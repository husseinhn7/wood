import jwt from "jsonwebtoken";
import { promisify } from "util";







export const protect = async (req, res, next) =>{
    const h = await req.headers
    const {authorization} = h
    const token  = authorization.split(' ')[1]

    console.log(token)
    const ans = await promisify(jwt.verify)(token, process.env.JWT_SEC)
    console.log(ans)
    next()

    

}