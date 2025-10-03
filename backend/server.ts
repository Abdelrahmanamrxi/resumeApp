import Server from "./app";
import resumeRouter from './routes/resume'
import atsRouter from './routes/ats'
import authRouter from './routes/auth'
import { Routes,AppConfig } from "./interfaces/serverInterface/serverInterfaces";
import errorMiddleware from "./middleware/errorMiddleware";
import passport from 'passport'
require('dotenv').config()

const ServerRoutes:Routes[]=[
    {path:'/api/auth',route:authRouter},
    {path:'/api/ats',route:atsRouter},
    {path:'/api/resume',route:resumeRouter}
]
const serverConfig:AppConfig={
    corsOptions:{
    origin:process.env.FRONTEND_ROUTE as string,
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
    },
    errorHandler:errorMiddleware,
    middlewares:[passport.initialize()]
}

const server=new Server(ServerRoutes,Number(process.env.PORT),serverConfig)
server.StartServer()