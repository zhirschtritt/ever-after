import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Title } from "@mantine/core";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Component {...pageProps} />;
    </MantineProvider>
  );
}

export default App;
