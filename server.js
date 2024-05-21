import app from './app.js'
import mongoose from 'mongoose';


import { networkInterfaces } from "os";


const db = process.env.DB_ATLAS.replace("<password>" , process.env.BD_PASS)
const local = process.env.DB_LOCAL


// console.log(networkInterfaces())

mongoose.connect(local)
.then((con)=>{
    if(con){
        app.listen( 5000 , ()=>console.log("server is listing on http://localhost:5000 "))  
    }
}).catch((err)=>console.log(err))






