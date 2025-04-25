import { ThemeProvider } from "@mui/material";
import React from "react";
import Head from "next/head";
import theme from "../styles/theme";
import PersistentDrawerLeft from "components/Navigation/PersistentDrawerLeft";

function Root({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Monster Hunter Generations Ultimate Database</title>
        <meta name="description" content="MHGU Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="">
        <ThemeProvider theme={theme}>
          <PersistentDrawerLeft />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default Root;
