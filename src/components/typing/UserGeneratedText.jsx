import React,{ useState, useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'

const UserGeneratedText = ({ activeChar, onProgressChange, updateAccuracyData, isTracking, setIsTracking, handleTextCompleted }) => { 
    const theme = useTheme()

    const textareaColors = {
        primary: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        secondary: theme.palette.mode === 'dark' ? '#222036' : '#EAECF8'
    }

    const btnColors = {
        primary: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        secondary: theme.palette.mode === 'dark' ? '#542967' : '#CAC8C8'
    }

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--scrollbar-track', theme.palette.mode === 'dark' ? '#542967' : '#CAC8C8');
        root.style.setProperty('--scrollbar-thumb', theme.palette.mode === 'dark' ? '#83E949' : '#7736EE');
    }, [theme]);
    
    const [userText, setUserText] = useState('');
    const [isTextEntered, setIsTextEntered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mistakes, setMistakes] = useState([]);
    
    useEffect(() => {
        if (isTracking && userText.length > 0){
            const progress = (currentIndex / userText.length) * 100;
            onProgressChange(progress)
        }
    }, [currentIndex, userText.length, onProgressChange, isTracking]);

    // Referencia del contenedor text-to-compare
    const containerRef = useRef(null)

    useEffect(() => {
        if (!activeChar || !isTracking) return;

        const currentChar = userText[currentIndex];

        if (currentChar === activeChar) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (currentChar === ' ' || currentChar === '\n') {
            const remainingText = userText.slice(currentIndex + 1);
            const nextNonSpaceIndex = remainingText.search(/\S/);
            if (nextNonSpaceIndex >= 0) {
                setCurrentIndex((prevIndex) => prevIndex + nextNonSpaceIndex + 1);
            } else {
                setCurrentIndex(userText.length); // Mueve al final si no hay más caracteres
            }
        } else {
            setMistakes((prevMistakes) => [...prevMistakes, currentIndex]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChar]);

    //Calcular precisión
    useEffect(() => {
        if (isTracking && currentIndex > 0 && userText.length > 0) {
            const total = userText.length
            const totalTyped = currentIndex
            const incorrect = mistakes.length
            const correct = totalTyped - incorrect
            const accuracyData = {
                correct: (correct / total) * 100,
                incorrect: (incorrect / total) * 100
            }    
            updateAccuracyData(accuracyData)
        }

    }, [userText.length, currentIndex, mistakes.length, updateAccuracyData, isTracking]);

    // Mantener el focus del scroll en el currentIndex
    useEffect(() => {
        if (containerRef.current) {
            const element = containerRef.current.children[currentIndex]
            if (element && element.textContent.trim() !== ' ') {
                element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
    }, [currentIndex]);

    useEffect(() => {
        if (userText.length > 0 && currentIndex === userText.length) {
            handleTextCompleted(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userText.length, handleTextCompleted, currentIndex]);

    const getCharacterClass = (index) => {
        const className = 
            index < currentIndex && !mistakes.includes(index) 
                ? 'correct' 
                : mistakes.includes(index)
                ? 'incorrect'
                : index === currentIndex
                ? 'current'
                : ''
        return className
    }

    const formattedText = userText.split('').map((char, index) => (
        <span key={index} className={getCharacterClass(index)}>
            {char}
        </span>
    ))

    const saveUserText = (e) => {
        setUserText(e.target.value) //<-Guardar el texto
    }

    const handlePasteText = () => {
        setIsTextEntered(true) //<-Controlamos si el usuario ha pegado el texto
        setIsTracking(true)
    }

    return (
        <div className='user-text'>
            {!isTextEntered ? (
                <div className='drag-text-cont'>
                    <textarea 
                        className='drag-text'
                        style={{
                            color: textareaColors.primary,
                            backgroundColor: textareaColors.secondary,
                        }}
                        value={userText}
                        onChange={saveUserText}
                        spellCheck="false"
                        placeholder='Pega aquí tu código y empieza a practicar!'
                        rows='6'
                        cols='50'
                    />
                    <button 
                        className='start' 
                        onClick={handlePasteText}
                        style={{
                            color: btnColors.primary,
                            backgroundColor: btnColors.secondary
                        }}
                    >Empezar</button>
                </div>
            ) : (
                <div 
                    className='text-to-compare'
                    ref={containerRef}
                >
                        {formattedText}
                </div>
            )}
        </div>
    )
}

export default UserGeneratedText
