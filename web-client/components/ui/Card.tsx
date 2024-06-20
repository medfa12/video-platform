import React from "react";
import { useSearchParams } from 'next/navigation';
const Card = (videoID:any) => {
  let vv=videoID
  return (
    <div className="border p-4 rounded shadow-2xl w-[80%] max-w-[500px]">
      
      <div className="relative h-60 mb-4">
        <img
          className="absolute w-full h-full object-cover rounded"
          src={"/thumbnail.jpg"}
          alt="/"
        />
      </div>
      <div>
        <p className="font-semibold"></p>
    
      </div>
    </div>
  );
};

export default Card;