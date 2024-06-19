
import styles from "./page.module.css";
import { getVideos } from "@/firebase/functions";
import Skeleton from "@/components/ui/skeleton";
import Card from "@/components/ui/Card";
import { Fragment } from "react";
import Link from "next/link";
export default function Home() {
   const videos = await getVideos()
  return (
    <main className={styles.main}>
      <div className={styles.description}>
       <h1 >home</h1>
      </div>
      <Fragment>
      videos?<Skeleton/>:{
        videos.map((video)=>
        (
          <><Link href={`watch?v=${video.filename}`} key={video.id} >
            <Card videoID={video.id}/>
            </Link ></>

          )
          )
        
      }
      </Fragment>
    </main>
  );
}
