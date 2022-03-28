import { Container } from "@mantine/core";
import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Reader from "../../components/Reader";
import VideoPlayback from "../../components/VideoPlayback";
import { MediaUpload } from "../../interfaces";
import React from "react";

export const getServerSideProps: GetServerSideProps<{
  data: MediaUpload;
}> = async ({ query }) => {
  let data: MediaUpload;

  try {
    const res = await axios.get<MediaUpload>(
      `http://host.docker.internal:5555/api/media-uploads/${query.id}`
    );
    console.log(res.data);
    data = res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }

  return { props: { data } };
};

function Playback({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("playback page");
  return (
    <Container>
      <VideoPlayback src={data.cloudinaryUrl} />
      <Reader />
    </Container>
  );
}

export default Playback;
