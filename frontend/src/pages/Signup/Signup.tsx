
import SignupForm from "@/components/SignupForm/SignupForm"
import signUpCover from '../../assets/signupCover.jpg'
import logo from '../../assets/CATALYx.png'
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function Signup() {
  return (
  <div className="flex min-h-svh h-screen">

  {/* Left side: Form */}
  <div className="flex flex-col w-full lg:w-1/2 xl:w-2/5 p-6 md:p-10">
    {/* Logo */}
    <div className="flex flex-col justify-center md:justify-start">
     
        <Link to={'..'} className="flex flex-row  text-gray-600 gap-2 cursor-pointer hover:underline"><ArrowLeft /> Back </Link>
        <img className="w-20 h-20 md:w-24 md:h-24" src={logo} alt="Logo" />
     
    </div>

    {/* Form centered */}
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md"> {/* wider than xs */}
        <SignupForm />
      </div>
    </div>
  </div>

  {/* Right side: Image */}
  <div className="hidden lg:flex w-1/2 xl:w-3/5">
    <img
      src={signUpCover}
      alt="Sign up cover"
      className="h-full w-full object-cover object-center dark:brightness-[0.25] dark:grayscale"
    />
  </div>
</div>

  )
}