import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"

function AuthDashboard() {
    const accessToken=localStorage.getItem('token')
    const navigate=useNavigate()
    useEffect(()=>{
          if(!accessToken){
          navigate('/login',{'state':{'message':'Your Session has expired Please try to login again.'}})
            }
    },[accessToken,navigate])
    
    return <Outlet/>
  
}

export default AuthDashboard
