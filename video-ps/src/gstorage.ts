import {Bucket, Storage} from "@google-cloud/storage";
import fs from 'fs';
import ffmpeg from "fluent-ffmpeg";
const storage = new Storage();
const rawVideoBucketName = "DemoMtubeRaw";
const processedVideoBucketName = "DemoMtubeProcessed";
const localRawVideoPath = "./RawVideos";
const localProcessedVideoPath = "./ProcessedVideos"    

export function setupDirectories(){
    checkExistenceOfDirectory(localRawVideoPath)
    checkExistenceOfDirectory(localProcessedVideoPath)
}



export function convertVideo(rawVideoName : string, processedVideoName: string){
    return  new Promise<void>((resolve,reject)=>{
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`).videoFilters('scale=-1:360')
    .on("end", ()=>{
        console.log("SUCCESS !, Video has finished successfully");
        resolve();
    })
    .on("error",(err)=>{
        console.log(`An error has occured ${err.message}`);
        reject(err);
    })
    .save(`${localProcessedVideoPath}/${processedVideoName}`)
})
}
export async function downloadRawVideo(filename : string){
    await storage.bucket(rawVideoBucketName)
    .file(filename)
    .download({destination: `${localRawVideoPath}/${filename}`});
    console.log(`gs://${rawVideoBucketName}/${filename} downloaded to ${localRawVideoPath}/${filename}`)   
}


export async function uploadProcessedVideo(filename:  string){
    const bucket = storage.bucket(processedVideoBucketName);
 

    await bucket.upload(`${localProcessedVideoPath}/${filename}`,{destination: filename});

    console.log(`${localProcessedVideoPath}/${filename}  uploaded to gs://${processedVideoBucketName}/${filename}`)

    await bucket.file(filename).makePublic();

}

function deleteFile(filePath: string): Promise<void>{
    return new Promise((resolve,reject)=>{
            if(fs.existsSync(filePath)) {
                reject(`File ${filePath} does not exist.`)
            } else
            {
                fs.unlink(filePath,(err)=>{
                    if(err){
                        console.log("ERROR",err);
                        reject(err);
                    } else {
                        console.log(`File ${filePath} deleted successfully.`)
                        resolve()
                    }
                })
            }



    })
}
export function deleteRawVideo(filename: string){
    return deleteFile(`${localRawVideoPath}/${filename}`)
}
export function deleteProcessedVideo(filename: string){
    return deleteFile(`${localProcessedVideoPath}/${filename}`)
}
function checkExistenceOfDirectory(dirPath: string){
    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, {recursive: true})
        console.log(`Directory ${dirPath} created successfully.`)
    }
}



