import React from 'react'
import { SignIn, SignInButton, SignOutButton,Show,UserButton} from "@clerk/react";
import toast from 'react-hot-toast';
const HomePage = () => {
  return (
    <>
     <h1> Welcome to the app</h1>
  <button className="btn btn-primary"
  onClick={()=>{
    toast.success("This is success toast");
  }}
  >click me</button>
  <Show when="signed-out">
          <SignInButton  mode ="modal"/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
        </>
  )
}

export default HomePage