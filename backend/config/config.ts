import mongoose, { mongo } from "mongoose"
require('dotenv').config()

class Database {
    private static instance:Database
    private connectionString!:mongoose.Connection
    private constructor(){}
    public static async getDBInstance():Promise<Database>{
        try{
            if(!Database.instance){  
                Database.instance=new Database()
                await mongoose.connect(process.env.MONGO_URL!)
                Database.instance.connectionString=mongoose.connection
            }
            return Database.instance
        }
        catch(err){
         throw new Error(`[ERROR]":${err}`)
        }
}
   public getConnectionString():mongoose.Connection{
    if(!this.connectionString){
        console.log("Database isn't connected")
    }
    return this.connectionString
   }
   public async disconnectDB():Promise<void>{
    try{
        await mongoose.disconnect()
    }
    catch(err){
        console.error(`[ERROR]:${err}`)
    }
   }
   
}
export default Database