import React from 'react'
import '../../styles/components/keyboard/_key.scss'
import { useTheme } from '@mui/material/styles'


const Key = ({ chart, shift, alt, size, isActive }) => {
    const theme = useTheme()

    const keyColors = {
        primary: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        secondary: theme.palette.mode === 'dark' ? '#542967' : '#CAC8C8'
    }

    return (
        <div 
            className={`key ${size} ${isActive ? 'active' : ''}`}
            style={{
                color: keyColors.primary,
                backgroundColor: keyColors.secondary,
                border: isActive ? `2px solid ${keyColors.primary}` : 'none',
        }}>
            <span className='shift-symbol'>{shift}</span>
            <span className='normal-char'>{chart}</span>
            <span className='alt-symbol'>{alt}</span>
        </div>
    )
}

export default Key
