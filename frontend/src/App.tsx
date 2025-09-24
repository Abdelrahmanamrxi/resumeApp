import { BrowserRouter,Routes,Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingPage"
import Login from "./pages/Login/pages/Login"
import Signup from "./pages/Signup/Signup"
import CVTemplate from "./pages/Dashboard/CV/CVTemplate"
import Dashboard from "./pages/Dashboard/Dashboard"
import Redirect from "./pages/Login/pages/Redirect"
import AuthDashboard from "./pages/Dashboard/AuthDashboard/AuthDashboard"
import ResumeAnalyze from "./pages/Dashboard/ResumeAnalyze/ResumeAnalyze"
import DashboardContent from "./pages/Dashboard/DashboardContent"
import PricingSection from "./pages/Billing/PricingSection"
import ATSAnalysis from "./pages/Dashboard/ResumeAnalyze/ATSAnaylsis"
import SavedAts from "./pages/Dashboard/SavedATS/SavedAts"
import About from "./pages/About/About"



function App() {
 
 

  return (
    <>
    <BrowserRouter>
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
        <Route element={<ResumeAnalyze/>} path="/user/dashboard/resume-analyze"/>  
        <Route element={<ATSAnalysis/>} path="/user/dashboard/resume-analyze/:id"/>
        <Route element={<SavedAts/>} path="/user/dashboard/savedats"/>
        
       </Route>
       </Route>
    </Routes>
    </BrowserRouter>
   

    </>
  )
}

export default App
