import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type ResumeType={
    disabled:boolean,
    isLoading:boolean,
    error:string | null
}
const initialState:ResumeType={
    disabled:false,
    isLoading:false,
    error:null
}

const resumeState=createSlice({
    name:'resumeAction',
    initialState:initialState,
    reducers:{
        setLoading:(state:ResumeType,action:PayloadAction<boolean>)=>{
            state.isLoading=action.payload
        },
        setDisabled:(state:ResumeType,action:PayloadAction<boolean>)=>{
            state.disabled=action.payload
        },
        setGlobalError:(state:ResumeType,action:PayloadAction<string>)=>{
            state.error=action.payload
        }

    }
})
export default resumeState.reducer
export const {setLoading,setDisabled,setGlobalError}=resumeState.actions