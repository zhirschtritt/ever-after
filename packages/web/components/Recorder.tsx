import React, { useEffect, useRef, useState } from "react";
import useMediaRecorder from "@wmik/use-media-recorder";
import { Button, Container, Group } from "@mantine/core";
import axios from "axios";

function Player({ srcBlob }: { srcBlob: Blob | null }) {
  if (!srcBlob) {
    return null;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
}

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

  async function upload() {
    const data = new FormData();
    data.append("file", mediaBlob!);

    await axios.post("http://localhost:5555/media", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("uploaded!");
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
