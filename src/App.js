import React, { useState, useEffect } from 'react';
import ModeSwitcher from "./components/ModeSwitcher";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/utils/theme';
import InputBox from "./components/InputBox";
import StatsPanel from "./components/StatsPanel";
import Summary from "./components/Summary";
import TextDisplay from "./components/TextDisplay";
import './styles/main.scss';

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
      <div className='app'>
        <div className='display'>
          <div className='top-row'>
            <h2>A Typing Game</h2>
            <ModeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
          </div>
          <div className='bot-row'>
            <div className='left-column'>
              <Summary />
            </div>
            <div className='center-column'>
              <div className='display-text-display'>
                <TextDisplay />
              </div>
              <div className='display-input-box'>
                <InputBox />
              </div>
            </div>
            <div className='right-column'>
              <StatsPanel />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider> 
  );
}

export default App;
