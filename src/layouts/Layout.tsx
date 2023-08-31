import { FC, ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import Head from "next/head";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const index: FC<{
  children: ReactNode;
  title?: string;
}> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Grid container flexGrow={1} justifyContent="center">
          <Grid item xs={11} md={10} lg={9}>
            {children}
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  );
};

export default index;