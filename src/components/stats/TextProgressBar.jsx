import React from 'react'
import { useTheme } from '@mui/material/styles'

const TextProgressBar = ({ progress}) => {
    const theme = useTheme()

    const barColors = {
        primary: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        secondary: theme.palette.mode === 'dark' ? '#542967' : '#CAC8C8'
    }

    return (
        <div className='progress-bar'>
            <div className='background' style={{backgroundColor: barColors.secondary}}></div>
            <div className='text' style={{color: barColors.primary}}>progreso...</div>
            <div className='foreground' style={{width: `${progress}%`, backgroundColor: barColors.primary}}></div>
        </div>
    )
}

export default TextProgressBar
