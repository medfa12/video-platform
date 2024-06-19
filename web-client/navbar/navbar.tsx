"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper} from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Uplaod from "./upload";
export default function Navbar() {
    const [user,setUser]=useState<User|null>(null);
    useEffect(()=>{
        const Unsubscribe=onAuthStateChangedHelper((user)=>{
            setUser(user);
        });
        return ()=>{
            Unsubscribe();
        }
    });

return(
<nav className={styles.nav}>
<Link href="/">
<Image width={90} height={20} src="/file.png" alt="mtube"/>
</Link>
user&&<Uplaod/>
<SignIn user ={user}/>
</nav>
);
}