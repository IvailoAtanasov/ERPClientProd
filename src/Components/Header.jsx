import React from "react";
import { Toolbar, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { styled } from "@mui/material/styles";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  backgroundColor: "#fff",
  maxHeight: "40px",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={logoutHandler}
          style={{ marginLeft: "auto", marginBottom: "auto" }}
        >
          <PowerSettingsNewOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
