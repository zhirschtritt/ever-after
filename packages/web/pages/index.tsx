import { Container, Group } from "@mantine/core";
import type { NextPage } from "next";

import Reader from "../components/Reader";
import WebcamMediaRecorder from "../components/Recorder";

const Home: NextPage = () => {
  return (
    <Container>
      <WebcamMediaRecorder />
      <Reader />
    </Container>
  );
};

export default Home;
