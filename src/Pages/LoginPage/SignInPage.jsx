import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Form } from "../../Helpers/useForm";
import theme from "../../Helpers/theme";

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
    display: "flex",
    backgroundColor: "#004d4d",
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
  email: "",
  password: "",
};

export const SignInPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState();

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
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Това поле е задължително";

    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, handleInputChange, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { email, password } = values;
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);

      navigate("/");
    } catch (error) {
      setSubmitError(error.response.data.error);
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
    }
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Paper className={classes.pageContent}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Form onSubmit={handleSubmit}>
            {submitError && (
              <Alert severity="error">
                Невалидни потребителско име или парола
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл адрес"
              name="email"
              value={values.email}
              autoFocus
              onChange={handleInputChange}
              error={errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={values.password}
              required
              fullWidth
              name="password"
              label="Парола"
              type="password"
              id="password"
              onChange={handleInputChange}
              error={errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="запомни ме"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Вход
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </div>
    </Container>
  );
};
