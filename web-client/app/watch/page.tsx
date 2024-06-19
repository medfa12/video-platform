import { useSearchParams } from 'next/navigation';
export default function Watch() {
    const videoPrefix = 'https://storage.googleapis.com/DemoMtubeProcessed/';
    const videoSrc = useSearchParams().get('v');
    return (
        <div>
            <h1>Watch </h1>
            <video controls src={videoPrefix + videoSrc} />
        </div>
    );
}


