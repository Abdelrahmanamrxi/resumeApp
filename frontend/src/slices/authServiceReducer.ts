import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { SignUpInterface } from './authReducer'
const authSlice=createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/api/auth'}),
    endpoints:(builder)=>({
    SignUp:builder.mutation<string,SignUpInterface>({
        query:(data)=>({
            url:'/signup',
            body:data,
            method:'POST'

        })
    }),
    Login:builder.mutation<string,Omit<SignUpInterface,"fullName">>({
        query:(data)=>({
            body:data,
            url:'/login',
            method:'POST'
        })
    }),
})
})
export default authSlice
export const {useLoginMutation,useSignUpMutation}=authSlice