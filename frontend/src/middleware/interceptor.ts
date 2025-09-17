import axios from 'axios'
import store from '../store'
const api=axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})
api.interceptors.request.use(
    (config)=>{
        const {accessToken}=store.getState().authState
        if(accessToken)
         config.headers.authorization=`Bearer ${accessToken}`
         return config
    },
    (err)=>Promise.reject(err)
)
api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config

        if(error.response?.status===401 && !originalRequest._retry&& !originalRequest.url.includes("auth/refreshToken")){

            originalRequest._retry=true
            
            try{
                const response=await api.post('auth/refreshToken')
                const accessToken=response.data.accessToken
                store.dispatch({type:'auth/setAccessToken',payload:accessToken})
                
                api.defaults.headers.common['Authorization']=`Bearer ${accessToken}`
                originalRequest.headers['Authorization']=`Bearer ${accessToken}`
                
                return api(originalRequest)
                
            }
            catch(refreshErr){
                console.log(refreshErr)
                localStorage.removeItem('accessToken')
                window.location.href="/login"
                
            }
        }
            return Promise.reject(error);
    }
    
    

)
export default api