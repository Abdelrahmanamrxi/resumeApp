import { Outlet,useNavigate } from "react-router-dom"
import { useEffect } from "react"

function AuthDashboard() {
    const navigate=useNavigate()
    const accessToken=localStorage.getItem('token')
    useEffect(()=>{
          if(!accessToken){
            navigate("/login", {replace: true,state: { message: "Your session expired. Please login again." } });
            }
    },[accessToken,navigate])
    
    return <Outlet/>
  
}

export default AuthDashboard
