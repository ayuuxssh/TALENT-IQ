
import { SignIn, SignInButton, SignOutButton,Show,UserButton, useUser } from "@clerk/react";
import HomePage from "./pages/HomePage.jsx"
import ProblemsPage from "./pages/ProblemsPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { Routes,Route, Navigate } from "react-router";
import {Toaster} from "react-hot-toast"

function App()
{
   const {isSignedIn,isLoaded}=useUser();
   // this will get rid of flickering effect
   if(!isLoaded)
   {
    return null;
   }
    return (
      <>
  <Routes>
        <Route path="/" element={!isSignedIn?<HomePage/>:<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={isSignedIn?<DashboardPage/>:<Navigate to="/"/>}/>
        <Route path="/problems" element={isSignedIn?<ProblemsPage/>:<Navigate to={"/"}/>}/>
        <Route path="/problem/:id" element={isSignedIn?<ProblemPage/>:<Navigate to={"/"}/>}/>
  </Routes>
  <Toaster toastOptions={{duration:2000}} />
  </>
  )
}

export default App;