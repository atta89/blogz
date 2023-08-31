import { createTheme } from "@mui/material";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  typography: {
    htmlFontSize: 16,
    fontFamily: "Space Grotesk",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Space Grotesk",
      fontSize: 40,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 700,
      [breakpoints.down("sm")]: {
        fontSize: 26,
      },
    },
    h2: {
      fontFamily: "Space Grotesk",
      fontSize: 24,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 700,
      [breakpoints.down("sm")]: {
        fontSize: 20,
      },
    },
    h3: {
      fontFamily: "Space Grotesk",
      fontSize: 20,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 700,
      [breakpoints.down("sm")]: {
        fontSize: 18,
      },
    },
    h4: {
      fontFamily: "Space Grotesk",
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "Space Grotesk",
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Space Grotesk",
      fontSize: 12,
      lineHeight: 1.25,
      letterSpacing: "normal",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "Space Grotesk",
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0.05,
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: "Space Grotesk",
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0.05,
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Space Grotesk",
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: 0.05,
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Space Grotesk",
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: 0.05,
      fontWeight: 400,
    },
    caption: {
      fontFamily: "Space Grotesk",
      fontSize: 12,
      lineHeight: 1.25,
      letterSpacing: 0.05,
      fontWeight: 400,
    },
  },
});

export default theme;
