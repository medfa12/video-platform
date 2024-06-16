import express  from "express";
import ffmpeg from "fluent-ffmpeg"
const app = express();
const port =3000;

app.listen(port, ()=>{
    console.log(`vid-ps app listening on port ${port}`)
})