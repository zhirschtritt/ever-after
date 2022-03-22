import { Container } from "@mantine/core";
import type { NextPage } from "next";
import React from "react";

import Reader from "../components/Reader";
import WebcamMediaRecorder from "../components/WebcamMediaRecorder";

const Home: NextPage = () => {
  return (
    <Container>
      <WebcamMediaRecorder />
      <Reader />
    </Container>
  );
};

export default Home;
