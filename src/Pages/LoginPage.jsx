import { SignIn } from "@clerk/clerk-react";
import React from "react";

export default function LoginPage(){
    return(
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-10">
            
            <SignIn
  path="/login"
  routing="path"
  signUpUrl="/signup"
  forceRedirectUrl="/"
/>

        </div>
    )
}