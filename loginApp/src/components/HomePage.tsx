import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
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
                gutterBottom
                sx={{ 
                    color: '#9c27b0',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}
            >
                Hello!! ✋✋
            </Typography>
            <Typography 
                variant="h4" 
                component="h2"
                sx={{ 
                    color: '#666',
                    marginBottom: '40px'
                }}
            >
                ברוכים הבאים לאתר המתכונים שלנו
            </Typography>
        </Box>
    );
};

export default HomePage;
