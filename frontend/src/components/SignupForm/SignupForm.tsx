import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import googleLogo from '../../assets/google.svg'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import  {setAccessToken, type SignUpInterface} from "@/slices/authReducer"
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/hooks/useReducerHooks"
import {useSignUpMutation} from "@/slices/authServiceReducer"
import { useNavigate,Link } from "react-router-dom"


 function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const [customError,setCustomError]=useState<string>("")
  const [showPassword, setShowPassword] = useState(false);

  const[SignUp,{isLoading}]=useSignUpMutation()
  
  
  const SignupSchema=z.object({
    fullName:z.string(),
    email:z.string().email("Invalid Email Format"),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, "Password must have uppercase, lowercase, number, special character, and be at least 8 characters long"),
  }) satisfies z.ZodType<SignUpInterface>
  
   type SignupType=z.infer<typeof SignupSchema>
  const {register,handleSubmit,formState:{errors}}=useForm<SignupType>({
    resolver:zodResolver(SignupSchema),
    mode:'onChange'
  }
  )
  async function onSubmit(data:SignupType){
    try{
     setCustomError("")
     const response=await SignUp(data).unwrap()
     dispatch(setAccessToken(response))
     navigate('/user/dashboard')
    }
    catch(err:unknown){
    if (typeof err === "object" && err !== null && "data" in err) {
    const errorData = err as { data?: { message?: string } };
    setCustomError(errorData.data?.message || "Something went wrong");
  } else {
    setCustomError("Something went wrong");
  }
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">New here? Join us today!</h1>
        <p className="text-muted-foreground text-sm text-balance">
        Sign up to your account.
        </p>
        <p className="errorMessageHeader">{customError.includes('registered') && customError}</p>
      </div>
      <div className="grid gap-6">
         <div className="grid gap-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input {...register('fullName')} id="fullName" type="name" placeholder="John Philips" required />
          {errors.fullName?<p className="errorMessage">{errors.fullName.message}</p>:''}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input {...register('email')} id="email" type="email" placeholder="m@example.com" required />
          {(!!errors.email?.message || customError.includes("Format"))
          ? <p className="errorMessage">{errors.email?.message || customError}</p>: null}
        </div>
        <div className="grid gap-3">
          <div className="flex  flex-col gap-3">
            <Label htmlFor="password">Password</Label>
          <div className="relative">

          <Input {...register('password')} id="password"   type={showPassword? "text" : 'password'} required />
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
           {(!!errors.password?.message || customError.includes("Password"))
          ? <p className="errorMessage">{errors.password?.message || customError}</p>: null}
        </div>
        <Button type="submit" className="w-full">
        {isLoading? (<>
          <p>Signing up..</p>
        <LoaderCircle className="animate-spin" size={20}/>
        </>
      ) 
           : "Sign Up"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-transparent text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      
      </div>
     
    </form>
    <Button onClick={()=>{window.location.href="http://localhost:3000/api/auth/google"}}  variant="outline" className="w-full mt-3 cursor-pointer items-center flex flex-row">
          <img className="w-4 h-4" src={googleLogo}/>
          Sign Up With Google
        </Button>
         <div className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login 
        </Link>
      </div>
    </>
  )
}
export default SignupForm