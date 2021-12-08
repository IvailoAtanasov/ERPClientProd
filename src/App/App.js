import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../Routes/PrivateRoute";
import { SignInPage } from "../Pages/LoginPage/SignInPage";
import { ForgotPasswordPage } from "../Pages/ForgotPassword/ForgotPasswordPage";
import { ResetPasswordPage } from "../Pages/ResetPassword/ResetPasswordPage";
import { HomePage } from "../Pages/HomePage/HomePage";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.appMain}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<SignInPage />} />
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <CssBaseline />
    </Router>
  );
}

export default App;
