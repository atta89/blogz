import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import axios from "axios";

import { Page } from "@/types";
import { Layout as MainLayout } from "@/layouts";
import { Theme } from "@/styles";
import { API_TOKEN } from "@/config";

type Props = AppProps & {
  Component: Page;
};

// initialize axios
axios.defaults.baseURL = "https://gorest.co.in/public/v2";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

function App({ Component: NextComponent, pageProps }: Props) {
  const Layout = NextComponent.layout ?? MainLayout;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3}>
          <Layout {...NextComponent}>
            <NextComponent {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
