import React from "react";
import { TextField, Button, Box } from "@mui/material";

interface UpdateUserFormProps {
    updatedUser: {
      firstName: string | undefined;
      lastName: string | undefined;
      email: string | undefined;
      address: string | undefined;
      phone: string | undefined;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  }
const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ updatedUser, onChange, onSubmit }) => {
  return (
    <Box>
      <TextField
        label="First Name"
        name="firstName"
        value={updatedUser.firstName}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={updatedUser.lastName}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={updatedUser.email}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={updatedUser.address}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={updatedUser.phone}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={onSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
        שמירה
      </Button>
    </Box>
  );
};

export default UpdateUserForm;
