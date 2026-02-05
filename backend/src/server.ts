import express from "express";
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {connectDB} from "./libs/DB";
import authRoute from './routes/authRoute'
import adminRoute from './routes/adminRoute'
import parentRoute from './routes/parentRoute'
import teacherRoute from './routes/teacherRoute'
import { protectedRoute } from "./middlewares/authMiddleware";
const app = express()
const PORT = process.env.PORT || 5001
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)

app.use(protectedRoute)
app.use('/api/admin',adminRoute)
app.use('/api/parent',parentRoute)
app.use('/api/teacher',teacherRoute)

connectDB()
app.listen(PORT, () => console.log(`server đang chạy tại http://localhost:${PORT}`))