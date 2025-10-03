import { BrowserRouter,Routes,Route } from "react-router-dom"
import React, {Suspense} from "react"
import Loading from "./components/Loading/Loading";
const LandingPage = React.lazy(() => import("./pages/LandingPage/LandingPage"));
const Login=React.lazy(()=>import('./pages/Login/pages/Login'))
const Signup=React.lazy(()=>import('./pages/Signup/Signup'))
const CVTemplate=React.lazy(()=>import('./pages/Dashboard/CV/CVTemplate'))
const Dashboard=React.lazy(()=>import('./pages/Dashboard/Dashboard'))
const Redirect=React.lazy(()=>import('./pages/Login/pages/Redirect'))
const AuthDashboard=React.lazy(()=>import('./pages/Dashboard/AuthDashboard/AuthDashboard'))
const DashboardContent=React.lazy(()=>import('./pages/Dashboard/DashboardData/DashboardContent'))
const PricingSection=React.lazy(()=>import('./pages/Billing/PricingSection'))
const ATSResults=React.lazy(()=>import('./pages/Dashboard/ResumeAnalyze/ATSResults'))
const SavedAts=React.lazy(()=>import('./pages/Dashboard/SavedATS/SavedAts'))
const About=React.lazy(()=>import('./pages/About/About'))
const AnalyzeResume=React.lazy(()=>import('./pages/Dashboard/ResumeAnalyze/AnalyzeResume'))




function App() {
 
 

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<Loading message="Loading..."/>}>

    <Routes>
      <Route element={<LandingPage/>} path="/"/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Redirect/>} path="/login-redirect"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<About/>} path="/about"/>
      <Route element={<PricingSection/>} path="/billing"/>
       <Route element={<AuthDashboard/>}>
       <Route element={<CVTemplate/>} path="/user/dashboard/resume/:resumeId"/>
       <Route element={<Dashboard/>}>
        <Route element={<DashboardContent/>} path="/user/dashboard"/>
        <Route element={<AnalyzeResume/>} path="/user/dashboard/resume-analyze"/>  
        <Route element={<ATSResults/>} path="/user/dashboard/resume-analyze/:id"/>
        <Route element={<SavedAts/>} path="/user/dashboard/savedats"/>
        
       </Route>
       </Route>
    </Routes>
    </Suspense>
    </BrowserRouter>
   

    </>
  )
}

export default App
