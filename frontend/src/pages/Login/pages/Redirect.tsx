import { useSearchParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useReducerHooks"
import { setAccessToken } from "../../../slices/authReducer"
import { useEffect } from "react"
 function Redirect() {
    const[searchParams]=useSearchParams()
    const accessToken=searchParams.get('accessToken')
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    } else {
      dispatch(setAccessToken(accessToken))
      navigate("/user/dashboard")
    }
  }, [accessToken, dispatch, navigate])
      return (
        <div>
          <h1>Redirecting...</h1>
        </div>
      )
}
export default Redirect