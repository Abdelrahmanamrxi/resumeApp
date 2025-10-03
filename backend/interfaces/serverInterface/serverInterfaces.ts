import { RequestHandler, Router } from "express"
import { ErrorRequestHandler } from "express"
export type Routes={
    route:Router,
    path:string
}

export interface AppConfig {
    middlewares:RequestHandler[]
    errorHandler:ErrorRequestHandler,
    corsOptions?:{
    origin:string,
    methods:string[],
    credentials:boolean
    },

}
