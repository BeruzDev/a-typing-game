import React, { useState, useEffect } from 'react';
import ModeSwitcher from "./components/ModeSwitcher";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/utils/theme';
import InputBox from "./components/InputBox";
import StatsPanel from "./components/StatsPanel";
import Summary from "./components/Summary";
import TextDisplay from "./components/TextDisplay";
import TypingSwitcher from './components/TypingSwitcher';
import './styles/main.scss';

function App() {
//*** Cambiar tema dark/light ***
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

//----------------------------------------------------------------------------------------------------

//*** Listener para las teclas ***
  // Estado que almacena la tecla activa
  const [activeKey, setActiveKey] = useState(null)
  //Estado que almacena el carácter presionado
  const [activeChar, setActiveChar] = useState(null)

  useEffect(() => {
      // Activa la tecla presionada
      const handleKeyDown = (event) => {
          setActiveKey(event.code)//<-Para resaltar la tecla en el teclado virtual
          setActiveChar(event.key)//<-Para comparar con el texto autogenerado
      }

      // Desactiva la tecla presionada
      const handleKeyUp = (event) => {
          setActiveKey(null)
          setActiveChar('')
      }

      // Almacenamos el evento en cada función
      window.addEventListener('keypress', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)

      return () => {
          // Limpia los listeners cuando se desmonta el componente
          window.removeEventListener('keypress', handleKeyDown)
          window.removeEventListener('keyup', handleKeyUp)

      };
  }, []);

//----------------------------------------------------------------------------------------------------

//*** Manejador entre texto autogenerado y texto del usuario***
  const [isAutoGenerated, setIsAutoGenerated] = useState(true);

  const toggleMode = () => {
    setIsAutoGenerated((prevMode) => !prevMode)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className='app'>
        <div className='display'>
          <div className='top-row'>
            <h2>A Typing Game</h2>
            <div className='icon-section'>
              <TypingSwitcher isAutoGenerated={isAutoGenerated} toggleMode={toggleMode}/>
              <ModeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
            </div>
          </div>
          <div className='bot-row'>
            <div className='left-column'>
              <Summary />
            </div>
            <div className='center-column'>
              <div className='display-text-display'>
                <TextDisplay isAutoGenerated={isAutoGenerated} activeChar={activeChar}/>
              </div>
              <div className='display-input-box'>
                <InputBox  activeKey={activeKey}/>
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
