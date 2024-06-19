import express  from "express";
import ffmpeg from "fluent-ffmpeg"
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./gstorage";
import { upload } from "@google-cloud/storage/build/cjs/src/resumable-upload";
import { isVideoNew, setVideo } from "./firestore";
setupDirectories();
const app = express();
app.use(express.json());
app.post("/process-video",async (req,res)=> {
   let data;
   try {
    const message =Buffer.from(req.body.message.data,'base64').toString('utf-8');
    data=JSON.parse(message);
    if (!data.name){
        throw new Error("Invalid message payload received")
    }
   }
   catch(error) {
    console.error(error);
    return res.status(400).send("Bad Request : missing name ");

   }

   const inputFileName = data.name;
   const outputFileName = `ps-${inputFileName}`;
   const videoId =inputFileName.split('.')[0];
   if (!isVideoNew(videoId)){
    return res.status(400).send("already processing or processed");
   }
   else {
    setVideo(videoId,{
        id:videoId,
        uid: videoId.split('-')[0],
        status:'processing'
    })
   }
   await downloadRawVideo(inputFileName);
   try{
    await convertVideo(inputFileName,outputFileName);
   }
   catch(error) {
    console.error(error);
    await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)])
    return res.status(500).send("Internal server error : failed to convert video");
   }

   await uploadProcessedVideo(outputFileName);
   await setVideo(videoId,{
    status:'processed',
    filename:outputFileName,
   })
   await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)])
    return res.status(200).send("Success");


})
const port =process.env.PORT||3000;
app.listen(port, ()=>{
    console.log(`vid-ps app listening on port ${port}`)
})