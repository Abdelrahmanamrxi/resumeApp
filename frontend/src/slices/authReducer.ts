import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import { UserFromToken } from '@/utils/token'


export interface SignUpInterface{
    email:string,
    fullName:string,
    password:string
}




type AuthType={
    accessToken:string  ,
    name:string  ,
    email:string  ,
}
const initialAuthState:AuthType={
    accessToken:localStorage.getItem('token')??'',
    name:localStorage.getItem('name')??'',
    email:localStorage.getItem('email')??''

   
    
}





const authReducer=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
         removeAccessToken:(state:AuthType)=>{
            state.accessToken=""
            state.name=''
            state.email=''
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            
            
        },
        setAccessToken:(state:AuthType,action:PayloadAction<string>)=>{
            state.accessToken=action.payload
            const user=UserFromToken(state.accessToken)
           
            if(user){
                state.name=user.name
                state.email=user.email
                localStorage.setItem('name',user.name)
                localStorage.setItem('email',user.email)
                localStorage.setItem('token',action.payload)
            }
            
           
        }

    },

})
export default authReducer.reducer
export const {removeAccessToken,setAccessToken}=authReducer.actions
