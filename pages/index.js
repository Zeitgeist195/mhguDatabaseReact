import React from "react";
import Head from "next/head";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import App from "./app";

function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#013e87",
      },
      secondary: {
        main: "#2e74c9",
      },
    },
  });

  return (
    <>
      <Head>
        <title>Monster Hunter Generations Ultimate Database</title>
        <meta name="description" content="MHGU Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </main>
    </>
  );
}

export default Home;
