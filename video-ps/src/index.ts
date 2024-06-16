import express  from "express";
import ffmpeg from "fluent-ffmpeg"
const app = express();
app.use(express.json());
app.post("/process-video",(req,rep)=> {
    const inputFilePath= req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;
    if (!inputFilePath || !outputFilePath) {
        return rep.status(400).send("ERROR !, Missing input or output file path");
    }
    ffmpeg(inputFilePath).videoFilters('scale=-1:360')
    .on("end", ()=>{
        return rep.status(200).send("SUCCESS !, Video has finished successfully")
    })
    .on("error",(err)=>{
        console.log(`An error has occured ${err.message}`)
        rep.status(500).send("ERROR !, An error has occured")
    })
    .save(outputFilePath)

})
const port =process.env.PORT||3000;
app.listen(port, ()=>{
    console.log(`vid-ps app listening on port ${port}`)
})