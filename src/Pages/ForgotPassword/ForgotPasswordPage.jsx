import React, { useState } from "react";
import SettingsBackupRestoreOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import {
  Button,
  Avatar,
  TextField,
  Paper,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useForm, Form } from "../../Helpers/useForm";
import theme from "../../Helpers/theme";

const initialValues = {
  email: "",
};

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
    width: "35vw",
  },
  "@media only screen and (max-width: 600px)": {
    pageContent: {
      padding: theme.spacing(3),
      width: "80vw",
    },
  },
}));

export const ForgotPasswordPage = () => {
  const classes = useStyles();
  const [submitError, setSubmitError] = useState();
  const [success, setSuccess] = useState();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email =
        fieldValues.email &&
        /* eslint-disable-next-line */
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          fieldValues.email
        ) // eslint-disable-line
          ? ""
          : "Невалиден имейл адрес";
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, handleInputChange, setValues, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { email } = values;
      const { data } = await axios.post(
        "/api/users/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setSubmitError(error.response.data.error);
      setValues();
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
            <SettingsBackupRestoreOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6" align="center">
            Моля въведете имейл адреса си. Ще получите имейл с информация за
            възтановяването на паролата ви.
          </Typography>
          <Form onSubmit={forgotPasswordHandler}>
            {success && (
              <Alert severity="success">
                Успешна заявка за възтановяване на парола е изпратена на имейл
                адресът ви.
              </Alert>
            )}
            {submitError && <Alert severity="error">Невалидна заявка</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл адрес"
              name="email"
              autoFocus
              onChange={handleInputChange}
              error={errors.email}
              helperText={errors.email}
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
