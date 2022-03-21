import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

function App({ Component, pageProps }: AppProps) {
  return <MantineProvider theme={{ colorScheme: "dark" }}>
    <Component {...pageProps} />;
  </MantineProvider>;
}

export default App;
