import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const ModeSwitcher = ({ toggleTheme, isDarkMode, textDisplayRef }) =>  {
    const handleKeyDown = () => {
        toggleTheme()

        if (textDisplayRef.current) {
            textDisplayRef.current.focus()
        }
    }


    return (
        <IconButton 
            onClick={handleKeyDown} 
            color="inherit"
            aria-label={isDarkMode ? 'Switch to  light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? <LightMode /> : <DarkMode />} 
        </IconButton>
    )
};

export default ModeSwitcher
