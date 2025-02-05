import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Box } from "@mui/material";
import { UserContext } from "../UserContext";
import axios from "axios";
import UpdateUserForm from "./UpdateUserForm";

const UpdateUser: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
  const { state, dispatch } = useContext(UserContext);
  const contextUser = state.user || { firstName: "", lastName: "", email: "", address: "", phone: "" };
  const [updatedUser, setUpdatedUser] = useState(contextUser);
  const [error, setError] = useState("");

  useEffect(() => {
    setUpdatedUser(contextUser);
  }, [contextUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8787/api/user",
        {
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          address: updatedUser.address,
          phone: updatedUser.phone,
        },
        { headers: { "user-id": updatedUser.id } }
      );

      if (res.data.user) {
        dispatch({
          type: "UPDATE",
          payload: { ...updatedUser },
        });
        setOpen(false); 
      } else {
        setError("לא התקבלו פרטי משתמש.");
      }
    } catch (error) {
      console.error("!!!!!update error", error);
      setError("שגיאה בעדכון המשתמש.");
    }
  };

  return (
    <>
     
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        עדכון
      </Button>

    
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {error && <p>{error}</p>}
          <UpdateUserForm updatedUser={updatedUser} onChange={handleChange} onSubmit={handleSubmit} />
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
