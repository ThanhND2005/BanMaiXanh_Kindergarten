import express from "express";
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {connectDB} from "./libs/DB";
import authRoute from './routes/authRoute'
const app = express()
const PORT = process.env.PORT || 5001
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)



connectDB()
app.listen(PORT, () => console.log(`server đang chạy tại http://localhost:${PORT}`))