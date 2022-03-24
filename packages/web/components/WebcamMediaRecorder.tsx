import React, { useEffect, useRef, useState } from "react";
import useMediaRecorder from "@wmik/use-media-recorder";
import { Button, Container, Group } from "@mantine/core";
import axios from "axios";
import { MediaUpload } from "../interfaces";
import { useRouter } from "next/router";

function LiveStreamPreview({ stream }: { stream: MediaStream }) {
  let videoPreviewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoPreviewRef} width={520} height={480} autoPlay />;
}

export default function WebcamMediaRecorder() {
  const [uploadVisible, setUploadVisible] = useState<boolean>(false);

  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
    liveStream,
  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: true, video: true },
    onStop: () => setUploadVisible(true),
  });

  const router = useRouter();

  async function upload() {
    const formData = new FormData();
    formData.append("file", mediaBlob!);

    const res = await axios.post<MediaUpload>(
      `${process.env.NEXT_PUBLIC_API_URL}/media-uploads`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res);

    router.push(`/playback/${res.data.id}`);
  }

  useEffect(() => {
    getMediaStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container p="md">
      <Group direction="column">
        <Group>
          {error ? `${status} ${error.message}` : undefined}
          <Button
            onClick={() => startRecording()}
            disabled={status === "recording"}
          >
            Start recording
          </Button>
          <Button onClick={stopRecording} disabled={status !== "recording"}>
            Stop recording
          </Button>
          <Button onClick={upload} disabled={!uploadVisible}>
            Upload
          </Button>
        </Group>
        <LiveStreamPreview stream={liveStream} />
      </Group>
    </Container>
  );
}
