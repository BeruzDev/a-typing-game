import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#EAECF8',
        },
        text: {
            primary: '#7736EE'
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
            default: '#222036',
        },
        text: {
            primary: '#83E949',
        }
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
})

export {lightTheme, darkTheme}