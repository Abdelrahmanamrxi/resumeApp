import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import api from "@/middleware/interceptor";
import { AxiosError } from "axios";

export const generateSection=createAsyncThunk('/generateAISection',
 async({jobDescription,text,type} : RequestResumeType ,thunkAPI)=>{
    try{
        const response=await api.post('/resume/match',{jobDescription,text,type})
        return response.data
    }
    catch(err){
        if(err instanceof AxiosError){
           return thunkAPI.rejectWithValue(err.response?.data.message ?? "Error While Generating Resume") 
        }
    }
})

type RequestResumeType={
    jobDescription:string,
    text:string | string[],
    type:'summary' | 'experience' | 'skills'
}

type ResumeType={
    disabled:boolean,
    isLoading:Record<string,boolean>
    error:Record<string,string | null>,
    jobDescription:string
}
const initialState:ResumeType={
    disabled:false,
    isLoading:{
        summary:false,
        experience:false,
        skills:false
    },
    error:{
        summary:'',
        experience:'',
        skills:''
    },
    jobDescription:''
}

const resumeState=createSlice({
    name:'resumeAction',
    initialState:initialState,
    reducers:{
        setLoading:(state:ResumeType,action:PayloadAction<{type:keyof ResumeType["isLoading"], value:boolean}>)=>{
            state.isLoading[action.payload.type]=action.payload.value
        },
        setDisabled:(state:ResumeType,action:PayloadAction<boolean>)=>{
            state.disabled=action.payload
        },
        setGlobalError:(state:ResumeType,action:PayloadAction<{type:keyof ResumeType["error"],value:string}>)=>{
            state.error[action.payload.type]=action.payload.value
        },
        setJobDescription:(state:ResumeType,action:PayloadAction<string>)=>{
            state.jobDescription=action.payload
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(generateSection.pending , (state,action)=>{
            const type=action.meta.arg.type
            state.isLoading[type]=true
            state.disabled=true
            state.error[type]=null

        })
        builder.addCase(generateSection.fulfilled,(state,action)=>{
            const type=action.meta.arg.type
            state.isLoading[type]=false
            state.disabled=false
            state.error[type]=null
        })
        builder.addCase(generateSection.rejected,(state,action)=>{
            const type=action.meta.arg.type
            state.disabled=false
            state.isLoading[type]=false
            state.error[type]=action.payload as string | null
         
        })
    }
})
export default resumeState.reducer
export const {setLoading,setDisabled,setGlobalError,setJobDescription}=resumeState.actions