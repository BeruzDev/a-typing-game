import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false); //<-Modo claro por defecto
  const [isAutoGenerated, setIsAutoGenerated] = useState(true);
  const [activeKey, setActiveKey] = useState(null)
  const [activeChar, setActiveChar] = useState(null)
  const [isStarted, setIsStarted] = useState(false);
  const [keyPressCount, setKeyPressCount] = useState(0);//<-Teclas presionadas
  const [startTime, setStartTime] = useState(null);//<-Tiempo inicial
  const [wpm, setWpm] = useState(0);//<-Teclas por minuto
  const [wpmHistory, setWpmHistory] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isResetLevel, setIsResetLevel] = useState(false);
  const [lastLevelTime, setLastLevelTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [accuracy, setAccuracy] = useState({ correct: 0, incorrect:0});
  const [isTracking, setIsTracking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const textDisplayRef = useRef(null);

//*** Cambiar tema dark/light *** 

  useEffect(() => {
//Leer el modo guardado en localStorage al cargar la aplicación:    
//Si en el local storage el item con clave 'isDarkMode' es 'true'    
//cambia el estado isDarkMode a oscuro si es 'false' cambia a modo claro.    
    const savedThemePreference = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedThemePreference) //<-Recogemos el valor 'true' o 'false' del local storage y una vez pasado a booleano actualizamos el estado con setIsDarkMode.
  }, []);

  //Función para cambiar el modo dark/light  
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => { //<-'prevMode' es un parámetro de react que contiene el valor anterior del estado
      const newThemeMode = !prevMode //<-Guardo en newThemeMode el valor contrario de prevMode -> si es true guarda false y viceversa
      localStorage.setItem('isDarkMode', newThemeMode) //<-Colocar el valor de newThemeMode en el item con clave 'isDarkMode' del local storage.
      return newThemeMode //<-Devolver el nuevo estado "newThemeMode" a setIsDarkMode
    })

    if (textDisplayRef.current) {
      textDisplayRef.current.focus()
    }
  }

//----------------------------------------------------------------------------------------------------

//*** Manejador entre texto autogenerado y texto del usuario***

useEffect(() => {
  const savedTextPreference = localStorage.getItem('isAutoGenerated') === 'true';
  setIsAutoGenerated(savedTextPreference)
}, []);

useEffect(() => {
  if (isAutoGenerated) {
    setIsTracking(true)
  }else{
    setIsTracking(false)
  }
}, [isAutoGenerated]);

const toggleMode = () => {
  setIsAutoGenerated((prevMode) => {
    const newTextMode = !prevMode
    localStorage.setItem('isAutoGenerated', newTextMode)
    return newTextMode
  })

  if (textDisplayRef.current) {
    textDisplayRef.current.focus()
  }
}

//----------------------------------------------------------------------------------------------------

//*** Listener para las teclas ***

  useEffect(() => {
      // Activa la tecla presionada
      const handleKeyDown = (event) => {
        setActiveKey(event.code)//<-Para resaltar la tecla en el teclado virtual
        setActiveChar(event.key)//<-Para comparar con el texto

        if (!isStarted && isTracking){
          setIsStarted(true)
          setStartTime(Date.now())
        }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted, isTracking]);

//----------------------------------------------------------------------------------------------------

//*** Stats/Summary ***

const onLevelChange = useCallback((newLevel) => {
  setCurrentLevel(newLevel)//<-Actualizar el nivel actual
  setElapsedTime(0)
  setIsStarted(false)
  setWpm(0)
}, [])

const onResetLevel = useCallback((resetStatus) => {
  setIsResetLevel(resetStatus)//<-Marcar el estado de resetear el nivel
}, [])

const handleProgressChange = useCallback((progress) => {
  setProgress(progress)
}, [])

const updateAccuracyData = useCallback((accuracyData) => {
  setAccuracy(accuracyData)
}, [])

const handleTextCompleted = useCallback((isCompleted) => {
  setIsCompleted(isCompleted)
}, [])

const isUserGenerated = !isAutoGenerated

const averageWpm = wpmHistory.length > 0 ? (wpmHistory.reduce((acc, curr) => acc + curr, 0) / wpmHistory.length).toFixed(0) : 0;

useEffect(() => {
  if (wpm > 0){
    setWpmHistory((prevHistory) => [...prevHistory, wpm])
  }
}, [wpm]);

useEffect(() => {
  if (!isTracking) return

  // Incrementar contador de teclas
  if (activeKey) setKeyPressCount((prev)=> prev + 1)
  
  // Establecer contador de tiempo
  if (!startTime) setStartTime(Date.now())

  // Calcular WPM en tiempo real
  const elapsedTime = (Date.now() - startTime) / 60000
  if (elapsedTime > 0){
    const calculateWpm = Math.floor(keyPressCount / 5 / elapsedTime)
    setWpm(calculateWpm)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeKey]);

useEffect(() => {
  setKeyPressCount(0)
  setStartTime(null)
  setWpm(0)
}, [currentLevel, isResetLevel]); 

useEffect(() => {
  if (startTime){
    const elapsedTime = (Date.now() - startTime) / 1000
    setLastLevelTime(elapsedTime.toFixed(2))
  }
  setStartTime(Date.now())
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentLevel]);

useEffect(() => {

  if (!isTracking || isCompleted) return 

  if (isStarted && startTime){
    const interval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000); // Guardar tiempo en segundos con decimales
        }, 100);

    return () => clearInterval(interval)
  }
}, [isStarted, startTime, isTracking, isCompleted]);

//----------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className='app'>
        <div className='display'>
          <div className='top-row'>
            <h2>A Typing Game</h2>
            <div className='icon-section'>
              <TypingSwitcher 
                toggleMode={toggleMode}
                isAutoGenerated={isAutoGenerated} 
                textDisplayRef={textDisplayRef}
              />
              <ModeSwitcher 
                toggleTheme={toggleTheme} 
                isDarkMode={isDarkMode}
                textDisplayRef={textDisplayRef}
              />
            </div>
          </div>
          <div className='bot-row'>
            <div className='left-column'>
              <Summary 
                averageWpm={averageWpm} 
                lastLevelTime={lastLevelTime} 
                currentLevel={currentLevel} 
                isUserGenerated={isUserGenerated}
                accuracy={accuracy}
              />
            </div>
            <div className='center-column'>
              <div className='display-text-display'>
                <TextDisplay 
                  isAutoGenerated={isAutoGenerated} 
                  activeChar={activeChar} 
                  isTracking={isTracking}
                  ref={textDisplayRef}
                  setIsTracking={setIsTracking}
                  onProgressChange={handleProgressChange} 
                  onLevelChange={onLevelChange} 
                  onResetLevel={onResetLevel}
                  updateAccuracyData={updateAccuracyData}
                  handleTextCompleted={handleTextCompleted}
                />
              </div>
              <div className='display-input-box'>
                <InputBox  
                  activeKey={activeKey}
                />
              </div>
            </div>
            <div className='right-column'>
              <StatsPanel 
                wpm={wpm} 
                elapsedTime={elapsedTime} 
                progress={progress}
                accuracy={accuracy}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider> 
  );
}

export default App;
