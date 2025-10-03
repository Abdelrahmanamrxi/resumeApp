import { Application, RequestHandler, Router } from "express";
import express from 'express'
import { AppConfig,Routes } from "./interfaces/serverInterface/serverInterfaces";
import GoogleConfig from "./config/GoogleStrategy";
import cors from 'cors'
import cookieParser from "cookie-parser";
import Database from './config/config'


require('dotenv').config()
export class Server{
    private app:Application
    private port:number | string
    public config:AppConfig
    public routes:Routes[]

    constructor(routes:Routes[], port:number | string,config:AppConfig){
        this.port=port
        this.routes=routes
        this.config=config

        this.app=express()
        this.initMiddlewares()
        this.initGoogleStrategy()
        this.initRoutes()
        this.initErrorHandler()
      
    }
    async connectToDB(){
       return await Database.getDBInstance()
    }
    initRoutes(){
        for(const route of this.routes){
            this.app.use(`${route.path}`,route.route)
        }
    }
    initMiddlewares(){
         this.app.use(express.json())
         this.app.use(express.urlencoded({extended:false}))
         this.app.use(cookieParser())

        if(this.config.corsOptions){
            this.app.use(cors(this.config.corsOptions))
        }
        else{
            this.app.use(cors())
        }   
         // custom middlewares
        for(const middleware of this.config.middlewares){
            this.app.use(middleware)
        }
    }
    initErrorHandler(){
        this.app.use(this.config.errorHandler)
    }
    initGoogleStrategy(){
        const Strategy=new GoogleConfig()
        Strategy.SetUpStrategy()
    }
    async StartServer(){
        try{
            await this.connectToDB()
            this.app.listen(this.port,()=>{
                console.log('Database Connected Succesfully')
                console.log(`[CONNECTED]: Server is Listening on Port ${this.port}`)
            })
        }
        catch(err){
            console.log(err)
        }

    }

    }
    export default Server
