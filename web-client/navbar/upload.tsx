"use client";
import { Button } from "@/components/ui/button"
import React, { Fragment } from "react"
import { uploadVideo } from "@/firebase/functions";
export default function Uplaod (){
    const HandleFileChange =(event :React.ChangeEvent<HTMLInputElement>) => {
        const file =event.target.files?.item(0);
        if (file){
            HandleUpload(file);
        }
    }
    const HandleUpload =async (file:File)=>{
        try {
            const response = await uploadVideo(file);
            alert(`SUCESS !!! response : ${response}`)

        }
        catch(error){
            alert(`UPLOAD FAILED ${error}`)
        }
    }
            
    
    return (
            <Button>
                upload
            <input onChange={HandleFileChange} id="upload" type="file" accept="video/*" />
            </Button>
       
    )

    
    }