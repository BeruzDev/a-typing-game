import React from 'react'
import '../../styles/components/keyboard/_key.scss'
import { useTheme } from '@mui/material/styles'


const Key = ({ chart, shift, alt, size }) => {
    const theme = useTheme()

    const keyColors = {
        primary: theme.palette.mode === 'dark' ? '#6c6666' : '#3d475c',
        secondary: theme.palette.mode === 'dark' ? '#292929' : '#cac8c8'
    }

    return (
        <div 
            className={`key ${size}`}
            style={{
                color: keyColors.primary,
                backgroundColor: keyColors.secondary
        }}>
            <span className='shift-symbol'>{shift}</span>
            <span className='normal-char'>{chart}</span>
            <span className='alt-symbol'>{alt}</span>
        </div>
    )
}

export default Key
