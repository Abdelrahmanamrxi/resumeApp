import { LoginForm } from "../../../components/LoginForm/LoginForm"
import logo from '../../../assets/CATALYx.png'
import { useLocation } from "react-router-dom"
export default function Page() {
  const location=useLocation()
  const message=location?.state?.message
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      {message && <p className="errorMessage ">{message}</p>}
      <img className="w-32 h-32" src={logo}/>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
