import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../Components/Header";
import { Main } from "../../Pages/Main/Main";
import { Orders } from "../../Pages/Orders/Orders";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem("userRole") === "admin" ? (
        <Main />
      ) : (
        <>
          {" "}
          <Header /> <Orders />{" "}
        </>
      )}
    </div>
  );
};
