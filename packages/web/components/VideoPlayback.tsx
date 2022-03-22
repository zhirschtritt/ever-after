import { useVideo } from "react-use";
import React from "react";

export default function VideoPlayback({ src }: { src: string }) {
  const [video, state, controls, ref] = useVideo(
    <video src={src} width={520} height={480} controls />
  );

  return <>{video}</>;
}
