import React, { useState, useContext } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { UserContext } from "../UserContext";
import Register from "./Register";

interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedUser: React.Dispatch<React.SetStateAction<any>>;
}

const Login: React.FC<LoginProps> = ({ open, setOpen, setIsLogin, setSavedUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center' }}>
          {isLoginMode ? "התחברות" : "הרשמה"}
        </Typography>
        <Register
          setOpen={setOpen}
          setIsLogin={setIsLogin}
          setSavedUser={setSavedUser}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
      </Box>
    </Modal>
  );
};

export default Login;
