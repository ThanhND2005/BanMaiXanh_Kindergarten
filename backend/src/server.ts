import express from "express";
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {connectDB} from "./libs/DB";
import authRoute from './routes/authRoute'
import adminRoute from './routes/adminRoute'
import parentRoute from './routes/parentRoute'
import teacherRoute from './routes/teacherRoute'
import studentRoute from './routes/studentRoute'
import paymentRoute from './routes/paymentRoute'
import { verifyToken,requireRole } from "./middlewares/authMiddleware";
const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use('/api/auth',authRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/student',verifyToken,studentRoute)
app.use('/api/admin',verifyToken,requireRole('admin'),adminRoute)
app.use('/api/teacher',verifyToken,requireRole('teacher'),teacherRoute)
app.use('/api/parent',verifyToken,requireRole('parent'),parentRoute)

connectDB()
app.listen(PORT, () => console.log(`server đang chạy tại http://localhost:${PORT}`))