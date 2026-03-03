"use client";
import ReactPlayer from "react-player";
const TrailerPlayer = ({ url }: { url: string }) => {
  return (
    <div className="aspect-video">
      <ReactPlayer style={{ width: "100%", height: "100%" }} src={url} />
    </div>
  );
};

export default TrailerPlayer;
