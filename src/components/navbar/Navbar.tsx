import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Zoom,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Image from "next/image";

import { MENU } from "./constants";

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (to: string) => {
    handleClose();
    router.push(to);
  };

  return (
    <>
      <AppBar elevation={0} color="inherit">
        <Toolbar color="white" sx={{ height: 128 }}>
          <Box flexGrow={1} />
          <Box gap={1} display="flex" alignItems="center">
            <Image
              alt="login"
              src="/apple-touch-icon.png"
              height={50}
              width={50}
            />
            <Typography variant="h2">Blogz</Typography>
          </Box>
          <Box flexGrow={3} />
          <Box display={{ xs: "none", md: "flex" }} gap={4}>
            {MENU.map((item) => (
              <Box key={item.id}>
                <Button
                  size="large"
                  variant="text"
                  color="inherit"
                  onClick={() => router.push(item.to)}
                  sx={(theme) => ({
                    fontWeight:
                      router.pathname === item.to
                        ? theme.typography.fontWeightMedium
                        : theme.typography.fontWeightLight,
                  })}
                >
                  {item.label}
                </Button>
                <Zoom timeout={600} in={router.pathname === item.to}>
                  <Divider sx={{ borderBottom: `2px solid black` }} />
                </Zoom>
              </Box>
            ))}
          </Box>
          <Box flexGrow={3} />
          <Box display={{ xs: "block", md: "none" }}>
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: 128 }} />
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
        slotProps={{ paper: { sx: { width: "180px" } } }}
      >
        {MENU.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleClickMenu(item.to)}
            selected={router.pathname === item.to}
            divider={router.pathname === item.to}
            sx={(theme) => ({
              fontWeight:
                router.pathname === item.to
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightLight,
            })}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Navbar;
