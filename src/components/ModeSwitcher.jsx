import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const ModeSwitcher = ({ toggleTheme, isDarkMode }) =>  {
    const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); 
        }
    }


    return (
        <IconButton onClick={toggleTheme} onKeyDown={handleKeyDown} color="inherit">
            {isDarkMode ? <LightMode /> : <DarkMode />} 
        </IconButton>
    )
};

export default ModeSwitcher
