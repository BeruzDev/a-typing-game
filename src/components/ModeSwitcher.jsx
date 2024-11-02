import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const ModeSwitcher = ({ toggleTheme, isDarkMode }) =>  (
    <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <LightMode /> : <DarkMode />} 
    </IconButton>
);

export default ModeSwitcher
