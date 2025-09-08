
import { useReducer } from "react"

type ResumeUploadState={
    fileInformation:{
        file:File | null,
        fileSizeError:string | null,
        error:string | null
    },
    jobDescription:string,
    _id:string,
    isLoading:boolean,
    dragEvent:boolean
}

type ResumeActionState=
    | {type:'SET_FILE', payload: File | null}
    | {type:'SET_JOB', payload:string} |
      {type:'SET_FILE_ERROR', payload:string} |
      {type:'SET_ID',payload:string}|
      {type:'SET_LOADING',payload:boolean} |
      {type:'SET_DRAG_EVENT',payload:boolean} |
      {type:'SET_ERROR',payload:string} | 
      {type:'RESET'}
    


const initialState:ResumeUploadState={
    fileInformation:{
        file:null,
        fileSizeError:null,
        error:null
    },
    jobDescription:'',
    _id:'',
    isLoading:false,
    dragEvent:false
}

function reducer(state:ResumeUploadState,action:ResumeActionState):ResumeUploadState{
    switch(action.type){
        case 'SET_FILE':
        return {...state,fileInformation:{
            ...state.fileInformation,
            file:action.payload,
            fileSizeError:''
        }}
        case 'SET_JOB':
        return {...state,jobDescription:action.payload}
        case 'SET_DRAG_EVENT':
        return {...state,dragEvent:action.payload}
        case 'SET_LOADING':
        return {...state,isLoading:action.payload}
        case 'SET_ID':
        return {...state,_id:action.payload}
        case 'SET_FILE_ERROR':
        return {...state,fileInformation:{
            ...state.fileInformation,
            fileSizeError:action.payload
        }}
        case 'SET_ERROR':
         return {...state,fileInformation:{
            ...state.fileInformation,
            error:action.payload
        }}
        case 'RESET':
        return initialState
        default: return state
    }
}

export default function useResumeUploader():[ResumeUploadState,React.Dispatch<ResumeActionState>] {
    const[state,dispatch]=useReducer(reducer,initialState)
    return [state,dispatch]
}

