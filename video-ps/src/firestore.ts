import { Firestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import {  credential } from "firebase-admin";
initializeApp({credential : credential.applicationDefault()})
const firestore = new Firestore()

const videoCollectionId= 'Video';
export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string
}
async function getVideo(videoId :string){
    const videoRef = firestore.collection(videoCollectionId).doc(videoId);
    const videoSnap = await videoRef.get();
    if (!videoSnap.exists) {
        return {};
    }
    return videoSnap.data() as Video;
}
export function setVideo(videoId : string, video:Video){
    const videoRef = firestore.collection(videoCollectionId).doc(videoId);
    return videoRef.set(video, {merge:true})
}
export async function isVideoNew(videoId:string){
    const video = await getVideo(videoId);
    return video?.status ===undefined;
}