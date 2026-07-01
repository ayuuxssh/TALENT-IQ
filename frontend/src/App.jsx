
import { SignIn, SignInButton, SignOutButton,Show,UserButton, useUser } from "@clerk/react";
import HomePage from "./pages/HomePage.jsx"
import ProblemsPage from "./pages/ProblemsPage.jsx";
import { Routes,Route, Navigate } from "react-router";
import {Toaster} from "react-hot-toast"

function App()
{
   const {isSignedIn}=useUser()
    return (
      <>
  <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/problems" element={isSignedIn?<ProblemsPage/>:<Navigate to={"/"}/>}/>
  </Routes>
  <Toaster toastOptions={{duration:2000}} />
  </>
  )
}

export default App;