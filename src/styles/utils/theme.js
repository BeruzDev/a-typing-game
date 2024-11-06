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
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
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
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
})

export {lightTheme, darkTheme}