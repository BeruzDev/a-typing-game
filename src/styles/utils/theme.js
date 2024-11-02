import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#f4f0f0',
        },
        text: {
            primary: '#3d475c'
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#333333',
        },
        text: {
            primary: '#6c6666',
        }
    }
})

export {lightTheme, darkTheme}