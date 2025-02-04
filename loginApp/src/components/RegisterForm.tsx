import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface RegisterFormProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoginMode: boolean;
  setIsLoginMode: (isLoginMode: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  password,
  firstName,
  lastName,
  address,
  phone,
  onChange,
  onSubmit,
  isLoginMode,
  setIsLoginMode,
}) => {
  return (
    <Box>
      <Typography variant="h6">{isLoginMode ? "התחברות" : "הרשמה"}</Typography>

      {!isLoginMode && (
        <>
          <TextField name="firstName" label="שם פרטי" value={firstName} onChange={onChange} fullWidth margin="normal" />
          <TextField name="lastName" label="שם משפחה" value={lastName} onChange={onChange} fullWidth margin="normal" />
          <TextField name="address" label="כתובת" value={address} onChange={onChange} fullWidth margin="normal" />
          <TextField name="phone" label="טלפון" value={phone} onChange={onChange} fullWidth margin="normal" />
        </>
      )}

      <TextField name="email" label="מייל" value={email} onChange={onChange} fullWidth margin="normal" />
      <TextField name="password" label="סיסמא" type="password" value={password} onChange={onChange} fullWidth margin="normal" />

      <Button variant="contained" onClick={onSubmit} fullWidth>
        {isLoginMode ? "התחבר" : "הרשם"}
      </Button>

      <Button variant="outlined" onClick={() => setIsLoginMode(!isLoginMode)} fullWidth sx={{ marginTop: "10px" }}>
        {isLoginMode ? "חדש? לחץ כאן כדי להירשם" : "כבר רשום? לחץ כאן להתחברות"}
      </Button>
    </Box>
  );
};

export default RegisterForm;
