import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"
const app = express()

connectDB()
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use(cors())

export default app