import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({path : "./env.conf"})
import ProductRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';


const app = express()
app.use(express.json({limit: '50mb'}))
app.use(morgan("dev"))



app.use("/api/product" , ProductRoute)
app.use("/api/user" , userRouter)


  

export default app;