import { MouseEvent, useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MoreVert, AddRounded } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";

import { Page, UserType } from "@/types";
import { AuthorForm } from "@/components/author";

const Author: Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  const menu = [
    { label: "Edit", isEdit: true },
    { label: "Delete", isEdit: false },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<UserType[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios
      .get(`/users`)
      .then((res) => {
        const { data } = res;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = async () => {
    await axios
      .delete(`/users/${selectedId}`)
      .then(() => {
        fetchUser();
        enqueueSnackbar("Successfully deleted author!", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>, id?: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleClickMenu = (isEdit: boolean) => {
    handleClose();
    setIsEdit(isEdit);
    if (isEdit) {
      setIsModalOpen(true);
    } else {
      deleteUser();
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid
          item
          lg={3}
          container
          spacing={1}
          alignItems="center"
          justifyContent={{ xs: "center", lg: "flex-start" }}
        >
          <Grid item>
            <IconButton
              size="large"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedId(undefined);
              }}
            >
              <AddRounded />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h1">Author</Typography>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          lg={6}
          container
          spacing={1}
          justifyContent={{ xs: "center", lg: "flex-start" }}
        >
          {user.map((item, index) => (
            <Grid key={index} item>
              <Card variant="outlined">
                <Grid p={1} container spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {item.name.charAt(0)}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="small"
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Menu
        open={open}
        elevation={1}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
        slotProps={{ paper: { sx: { width: "120px" } } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menu.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClickMenu(item.isEdit)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
      <AuthorForm
        isEdit={isEdit}
        id={selectedId}
        open={isModalOpen}
        title={isEdit ? "Edit Author" : "Create Author"}
        refetch={fetchUser}
        handleClose={handleClose}
      />
    </>
  );
};

Author.title = "Author";

export default Author;
