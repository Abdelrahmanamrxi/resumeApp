import express from 'express'
import cors from 'cors'
import Database from './config/config'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/errorMiddleware'
import passport from 'passport'
import googleStrategy from './config/GoogleStrategy'
import authRouter from './routes/auth'
import resumeRouter from './routes/resume'
import atsRouter from './routes/ats'
require('dotenv').config()
const PORT=process.env.PORT? process.env.PORT : 3000
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({
    extended:false
}))
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))
const Strategy=new googleStrategy()
Strategy.SetUpStrategy()
app.use(passport.initialize())
app.use('/api/auth',authRouter)
app.use('/api/resume',resumeRouter)
app.use('/api/ats',atsRouter)





app.use(errorMiddleware)
app.listen(PORT,async():Promise<void>=>{
    try{
    await Database.getDBInstance()
    console.log(`[SUCCESS] : Database has been connected to The Server`)
    console.log(`Server is Listening on Port ${PORT}`)
    }
    catch(err){
        console.error(`[ERROR]:${err}`)
    }
})