import { SignUp } from "@clerk/clerk-react";
import React from "react";
export default function SignupPage(){
    return(
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-10" >
            <SignUp signInUrl="/login"  forceRedirectUrl={"/"}/>
        </div>
    )
}