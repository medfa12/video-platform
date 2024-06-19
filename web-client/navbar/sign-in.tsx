"use client";
import { Button } from "@/components/ui/button"
import { Fragment } from "react"
import { signInWithGoogle, signOut } from "@/firebase/firebase"
import { User } from "firebase/auth";
interface SignInProps{
    user:User|null;
}
export default function SignIn({user}:SignInProps){
    return (
        <Fragment>
            {user ?
            <Button variant="outline" onClick={signOut}>Sign Out</Button> 
                :
     
            <Button variant="outline" onClick={signInWithGoogle}>Sign In</Button>   
            }
            

            

        </Fragment>


    )

    
}