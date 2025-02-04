import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';

import RecipeForm from './RecipeForm';

const AddRecipeButton = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('סוגרים את הדיאלוג');
        setOpen(false);
    };
    

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: '#fff',
                    color: '#9c27b0',
                    '&:hover': {
                        backgroundColor: '#f3e5f5'
                    }
                }}
            >
                הוספת מתכון
            
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <RecipeForm onClose={handleClose} />
            </Dialog>

        </>
    );
};

export default AddRecipeButton;
