/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import { UserType } from "@/types";

type AuthorFormProps = {
  id?: number;
  open: boolean;
  title: string;
  isEdit: boolean;
  refetch: () => Promise<void>;
  handleClose: () => void;
};

const AuthorForm = ({
  id,
  open,
  title,
  isEdit,
  refetch,
  handleClose,
}: AuthorFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [initialValue, setInitialValue] = useState<UserType>({
    name: "",
    email: "",
    gender: "",
    status: "active",
  });

  useEffect(() => {
    if (!id) {
      setInitialValue({
        name: "",
        email: "",
        gender: "",
        status: "active",
      });
      return;
    }
    fetchUser();
  }, [id, open]);

  const fetchUser = async () => {
    await axios
      .get(`/users/${id}`)
      .then((res) => {
        const { data } = res;
        setInitialValue(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormikSubmit = async (
    values: UserType,
    { resetForm }: FormikHelpers<UserType>
  ) => {
    handleClose();
    if (isEdit) {
      await axios
        .put(`/users/${id}`, values)
        .then(() => {
          refetch();
          resetForm();
          enqueueSnackbar("Successfully edited author!", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post(`/users`, values)
        .then(() => {
          refetch();
          resetForm();
          enqueueSnackbar("Successfully created author!", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog open={open}>
      <Formik<UserType>
        initialValues={initialValue}
        onSubmit={handleFormikSubmit}
        validateOnChange={false}
        enableReinitialize
      >
        {({ values, resetForm, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle variant="h3">{title}</DialogTitle>
            <Divider />
            <DialogContent>
              <FormControl fullWidth margin="normal">
                <TextField
                  required
                  fullWidth
                  name="name"
                  size="small"
                  type="text"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  required
                  fullWidth
                  name="email"
                  size="small"
                  type="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <RadioGroup
                  row
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    required
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    required
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AuthorForm;
