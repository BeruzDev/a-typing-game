import React, { useState, useEffect } from 'react';
import ModeSwitcher from "./components/ModeSwitcher";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/utils/theme';
import InputBox from "./components/InputBox";
import StatsPanel from "./components/StatsPanel";
import Summary from "./components/Summary";
import TextDisplay from "./components/TextDisplay";

function App() {
//Estado dark/light  
  const [isDarkMode, setIsDarkMode] = useState(false); //<-Modo claro por defecto

  useEffect(() => {
//Leer el modo guardado en localStorage al cargar la aplicación:    
//Si en el local storage el item con clave 'isDarkMode' es 'true'    
//cambia el estado isDarkMode a oscuro si es 'false' cambia a modo claro.    
    const savedThemePreference = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedThemePreference) //<-Recogemos el valor 'true' o 'false' del local storage y una vez pasado a booleano actualizamos el estado con setIsDarkMode.
    return () => {
      
    };
  }, []);

//Función para cambiar el modo dark/light  
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => { //<-'prevMode' es un parámetro de react que contiene el valor anterior del estado
      const newMode = !prevMode //<-Guardo en newMode el valor contrario de prevMode -> si es true guarda false y viceversa
      localStorage.setItem('isDarkMode', newMode) //<-Colocar el valor de newMode en el item con clave 'isDarkMode' del local storage.
      return newMode //<-Devolver el nuevo estado "newMode" a setIsDarkMode
    })
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <ModeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
        <InputBox/>
        <StatsPanel/>
        <Summary/>
        <TextDisplay/>
      </div>
    </ThemeProvider> 
  );
}

export default App;
