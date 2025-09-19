import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import googleLogo from '../../assets/google.svg'
import { Link } from "react-router-dom"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { setAccessToken } from "@/slices/authReducer"
import { useNavigate } from "react-router-dom"
import getErrorMessage from '../../utils/errorUtil'
import { useAppDispatch } from "@/hooks/useReducerHooks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/slices/authServiceReducer"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    type formDataType={
      email:string,
      password:string
    }
    const [customError,setCustomError]=useState<string | null>('')
    const[Login,{isLoading,error}]=useLoginMutation()
    const [showPassword, setShowPassword] = useState(false);
    const[formData,setFormData]=useState<formDataType>({
      email:'',
      password:''
    })

    const dispatch=useAppDispatch()
    const navigate=useNavigate()

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
      const {name,value}=e.target
      setFormData((prevData)=>{
        return {...prevData,[name]:value}
      })
    }
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>):Promise<void>{
        try{

          e.preventDefault()
          setCustomError('')
          const response=await Login(formData).unwrap()
          dispatch(setAccessToken(response))
          navigate('/user/dashboard')
        }
        catch(err){
          setCustomError(getErrorMessage(err))
        }
    }
 
  
  
    
      
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
          {error?<p className="errorMessageHeader">{customError}</p>:'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{handleSubmit(e)}}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
               
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <div className="relative">

                <Input name="password" value={formData.password} onChange={handleChange} id="password" type={showPassword?"password":'text'} required />
                
                 <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute cursor-pointer right-3 top-1/5 text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
          </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button   type="submit" className="w-full">
                  {isLoading?(
                  <>
                    <p>Logging In..</p>
             <LoaderCircle className="animate-spin" size={20}/>
                  </>):'Login'}
                </Button>
               
              </div>
            </div>
            
          </form>
           <Button onClick={()=>{window.location.href="http://localhost:3000/api/auth/google"}} variant="outline" className="w-full mt-5 flex flex-row items-center cursor-pointer">
                  Login with Google
                  <img className="w-3 h-3" src={googleLogo}/>
                </Button>
                <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline hover:underline-offset-4">
                Sign up
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default LoginForm