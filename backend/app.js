import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
const app = express()

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/users",userRouter)



export default app