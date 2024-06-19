import React from "react";
const Card = (videoID:string) => {
  return (
    <div className="border p-4 rounded shadow-2xl w-[80%] max-w-[500px]">
      <div className="relative h-60 mb-4">
        <img
          className="absolute w-full h-full object-cover rounded"
          src={"/thumbnail.png"}
          alt="/"
        />
      </div>
      <div>
        <p className="font-semibold">{videoID}</p>
    
      </div>
    </div>
  );
};

export default Card;