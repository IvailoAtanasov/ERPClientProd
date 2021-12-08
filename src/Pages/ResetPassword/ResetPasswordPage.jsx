import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import theme from "../../Helpers/theme";
import { useForm, Form } from "../../Helpers/useForm";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pageContent: {
    padding: theme.spacing(3),
    width: "40vw",
  },
  "@media only screen and (max-width: 600px)": {
    pageContent: {
      padding: theme.spacing(3),
      width: "80vw",
    },
  },
}));

const initialValues = {
  passwprd: "",
  confirmPassword: "",
};

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const classes = useStyles();
  const [submitError, setSubmitError] = useState();
  const [success, setSuccess] = useState();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Това поле е задължително";
    if ("confirmPassword" in fieldValues)
      temp.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "Паролите не съвпадат";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, handleInputChange, resetForm, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (values.password !== values.confirmPassword) {
      resetForm();
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
      return setSubmitError("Паролите не съвпадат");
    }

    try {
      const { data } = await axios.put(
        `/api/users/resetpassword/${resetToken}`,
        {
          password: values.password,
        },
        config
      );

      setSuccess(data.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setSubmitError(error.response.data.error);
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Paper className={classes.pageContent}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Възтановяване на парола
          </Typography>
          <Form onSubmit={resetPasswordHandler}>
            {success && (
              <Alert severity="success">
                Успешна регистрация на нова парола
              </Alert>
            )}
            {submitError && <Alert severity="error">{submitError}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={values.password}
              label="Парола"
              type="password"
              id="password"
              onChange={handleInputChange}
              error={errors.password}
              helperText={errors.password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              value={values.confirmPassword}
              label="Потвърди парола"
              type="password"
              id="confirmPassword"
              onChange={handleInputChange}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Изпрати
            </Button>
          </Form>
        </Paper>
      </div>
    </Container>
  );
};
