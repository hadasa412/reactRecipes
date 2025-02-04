import React, { useState } from 'react';
import { Avatar, Button, Modal, Box } from '@mui/material';
import { purple } from '@mui/material/colors';
import UpdateUser from './UpdateUser';

const AvatarUser = ({ savedUser, handleLogout }:any) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ position: 'absolute', left: 20, top: 20, display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
      <div>
        <h3>שלום, {savedUser.firstName}!</h3>
      </div>
      <Avatar sx={{ bgcolor: purple[500], marginTop: '10px' }}>
        {savedUser.firstName ? savedUser.firstName[0] : ''}
      </Avatar>
      <Button onClick={() => setOpenUpdate(true)} color="secondary" variant="outlined">
        עדכון
      </Button>
      <Button onClick={handleLogout} color="secondary" variant="outlined">
        יציאה
      </Button>
      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <Box sx={style}>
          <UpdateUser open={openUpdate} setOpen={setOpenUpdate} />
        </Box>
      </Modal>
    </div>
  );
};

export default AvatarUser;
