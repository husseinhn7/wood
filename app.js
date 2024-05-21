import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({path : "./env.conf"})
import ProductRoute from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import reviewRoute from './routes/reviewRoute.js'
import orderRouter from './routes/orderRoute.js';
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(morgan("dev"))



app.use("/api/product" , ProductRoute)
app.use("/api/user"    , userRouter)
app.use("/api/review"  , reviewRoute)
app.use("/api/order"  , orderRouter)




  

export default app;