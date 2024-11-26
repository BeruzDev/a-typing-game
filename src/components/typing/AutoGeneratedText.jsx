import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
import { generateRandomSentences } from './textGenerator'

const AutoGeneratedText = ({ activeChar }) => {
    const numberOfWords = 20
    const [level, setLevel] = useState(1);
    const [text, setText] = useState(generateRandomSentences(`level${level}`, numberOfWords));
    const [currentIndex, setCurrentIndex] = useState(0); //<- Indice de la letra actual
    const [mistakes, setMistakes] = useState([]); //<- Errores cometidos
    const [resetLevel, setResetLevel] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isLevelSeven, setIsLevelSeven] = useState(false);

    // Cambiar de nivel
    useEffect(() => {
        setText(generateRandomSentences(`level${level}`, numberOfWords))
        setCurrentIndex(0)
        setMistakes([])
        console.log(level)
    }, [level]);

    // Reset del nivel
    useEffect(() => {
        if (resetLevel) {
            setText(generateRandomSentences(`level${level}`, numberOfWords))
            setCurrentIndex(0)
            setMistakes([])
            setResetLevel(false)
        }
    }, [level, resetLevel]);

    // Verificar si pasa de nivel o reinicio
    useEffect(() => {
        if (currentIndex === text.length) {
            if (mistakes.length <= 2){
                setLevel(prevLevel => {
                    if (prevLevel === 7) {
                        setIsLevelSeven(true)
                        return 6 //<- Si se llega al nivel 7, avanzamos al nivel 6 de nuevo
                    }
                    if (isLevelSeven) {
                        setResetLevel(true)
                        return 6 //<- Si ya estamos en el modo lvl 6 constante, mantenemos lvl 6
                    }
                    return prevLevel + 1 //<- Avanzamos normal
                })
            }else{
                setResetLevel(true) //<- Reiniciar lvl si hay mas de dos errores
            }
        }
    }, [currentIndex, mistakes, text.length, isLevelSeven]);

    // Si pasamos el nivel 7 mantenernos en el nivel 6
    useEffect(() => {
        console.log(isLevelSeven)
        if (isLevelSeven){
            setLevel(6)
        }
    }, [isLevelSeven]);

    // Iterar y comparar cada letra con cada tecla
    useEffect(() => {
        if (!activeChar) return //<- Si no hay letra activa no hacer nada

        const currentChar = text[currentIndex]

        if (activeChar === currentChar) {
            console.log('correct')
            setCurrentIndex(prevIndex => prevIndex + 1) //<- Avanza a la siguiente letra
        } else {
            console.log('incorrect')
            setMistakes((prevMistakes) => [...prevMistakes, currentIndex]) // <- Agrega el error al array mistakes
            setCurrentIndex(prevIndex => prevIndex + 1) //<- Avanza a la siguiente letra
        }

        //TODO: arreglar la deshabilitación de react-hooks/exhaustive-deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChar]);

    // Confetti si se supera el nivel 6 XD
    useEffect(() => {
        if (level === 7) {
            setShowConfetti(true)
            setTimeout(() => {
                setShowConfetti(false)
            }, 5000);
        }
    }, [level]);

    // Ejecutar cada clase al momento
    const getCharacterClass = (index) => {
        if (index < currentIndex && !mistakes.includes(index)) return 'correct'
        if (mistakes.includes(index)) return 'incorrect'
        if (index === currentIndex) return 'current'
        return ''
    }

    return (
        <div className='text-container'>
            {text.split('').map((char, index) => (
                <span key={index} className={getCharacterClass(index)}>
                    {showConfetti && <Confetti />}
                    {char}
                </span>
            ))}
        </div>
    )
}

export default AutoGeneratedText
