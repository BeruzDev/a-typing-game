import React,{ useState, useEffect, useRef } from 'react'
import { useTheme } from '@mui/material/styles'

const UserGeneratedText = ({activeChar}) => {
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

    // Referencia del contenedor text-to-compare
    const containerRef = useRef(null)

    useEffect(() => {
        if (!activeChar) return
        const currentChar = userText[currentIndex]

        if (currentChar === ' '){
            const nextIndex = userText.slice(currentIndex + 1).search(/\S/)
            if (nextIndex >= 0){
                setCurrentIndex((prevIndex) => prevIndex + nextIndex + 1)
            } else {
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }
        }else if (currentChar === '\n') {
            const remainingText = userText.slice(currentIndex + 1);
            const nextNonSpaceIndex = remainingText.search(/\S/); // Encuentra el próximo carácter no vacío
            if (nextNonSpaceIndex >= 0) {
                setCurrentIndex(currentIndex + nextNonSpaceIndex + 1); // Ajusta el índice
            } else {
                setCurrentIndex(userText.length); // Si no hay más texto, avanza al final
            }
        } else {
            if (activeChar === currentChar) {
                setCurrentIndex((prevIndex) => prevIndex + 1)
            } else if (currentChar !== ' ') {
                setMistakes((prevMistakes) => [...prevMistakes, currentIndex])
                setCurrentIndex((prevIndex) => prevIndex + 1)
            } else {
                const remainingText = userText.slice(currentIndex + 1);
                const nextIndex = remainingText.search(/\S/); // Busca el siguiente carácter no vacío
                if (nextIndex >= 0) {
                    // Avanzamos hasta el siguiente carácter no vacío
                    setCurrentIndex((prevIndex) => prevIndex + nextIndex + 1);
                } else {
                    // Si no hay caracteres no vacíos, avanzamos al final del texto
                    setCurrentIndex((prevIndex) => prevIndex + 1)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChar]);

    // Mantener el focus del scroll en el currentIndex
    useEffect(() => {
        if (containerRef.current) {
            const element = containerRef.current.children[currentIndex]
            if (element && element.textContent.trim() !== ' ') {
                element.scrollIntoView({ behavior: 'smooth', inline: 'nearest' }) //Todo <-> arreglar temblor de scroll
            }
        }
    }, [currentIndex]);

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
    }

    return (
        <div className='user-text'>
            {!isTextEntered ? (
                <div>
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
