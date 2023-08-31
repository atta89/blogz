import { Box, Divider, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Divider />
      <Toolbar>
        <Box flexGrow={1} textAlign="center">
          <Typography variant="caption">
            2023 &#169; Blogz. All Rigth Reserved.
          </Typography>
        </Box>
      </Toolbar>
    </>
  );
};

export default Footer;
