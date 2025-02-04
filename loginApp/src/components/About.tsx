import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet } from "react-router-dom";

const About = () => {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                    color: '#9c27b0',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}
            >
                About
            </Typography>
            <Outlet/>
        </Box>
    );
};

export default About;