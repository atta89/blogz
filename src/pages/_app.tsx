import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Page } from "@/types";
import { Layout as MainLayout } from "@/layouts";
import { Theme } from "@/styles";
import { SnackbarProvider } from "notistack";
import axios from "axios";

type Props = AppProps & {
  Component: Page;
};

// initialize axios
axios.defaults.baseURL = "https://gorest.co.in/public/v2";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer 2dc3a6b1b6efcd0589e36b836d7765eccbebd5161311c956d5a8256a92181602`;

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
