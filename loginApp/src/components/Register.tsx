import React, { useState, useContext } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import { UserContext } from "../UserContext";
import { UserData } from "../types/UserData";
import RegisterForm from "./RegisterForm";

const Register: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
  const { dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8787/api/user/register", formData);
      if (res.data.userId) {
        dispatch({ type: "LOGIN", payload: { ...formData, userId: res.data.userId } as UserData });
        alert("הרשמתך בוצעה בהצלחה!");
        setOpen(false);
      } else {
        setError("הרשמה בוצעה אך לא התקבל userId.");
      }
    } catch (e: any) {
      setError(`שגיאה: ${e.response?.data?.message || e.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8787/api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      dispatch({ type: "LOGIN", payload: res.data.user });
      alert("התחברת בהצלחה!");
      setOpen(false);
    } catch (e) {
      setError("הפרטים אינם נכונים.");
    }
  };

  return (
    <Modal open={true} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        {error && <Typography color="error">{error}</Typography>}
        <RegisterForm
          {...formData}
          onChange={handleChange}
          onSubmit={isLoginMode ? handleLogin : handleRegister}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default Register;
