import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
import { generateRandomSentences } from './textGenerator'

const AutoGeneratedText = ({ activeChar, onLevelChange, onResetLevel, onProgressChange,updateAccuracyData }) => {
    const numberOfWords = 3 //25
    const [level, setLevel] = useState(1);
    const [text, setText] = useState(generateRandomSentences(`level${level}`, numberOfWords));
    const [currentIndex, setCurrentIndex] = useState(0); //<- Indice de la letra actual
    const [mistakes, setMistakes] = useState([]); //<- Errores cometidos
    const [resetLevel, setResetLevel] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isLevelSeven, setIsLevelSeven] = useState(false);

    useEffect(() => {
        const progress = (currentIndex / text.length) * 100;
        onProgressChange(progress)
    }, [currentIndex, text.length, onProgressChange]);

    // Cambiar de nivel
    useEffect(() => {
        onLevelChange(level)
        setText(generateRandomSentences(`level${level}`, numberOfWords))
        setCurrentIndex(0)
        setMistakes([])
        console.log('Level changed to:', level);
    }, [level, onLevelChange]);

    // Reset del nivel
    useEffect(() => {
        if (resetLevel) {
            onResetLevel(true)
            setText(generateRandomSentences(`level${level}`, numberOfWords))
            setCurrentIndex(0)
            setMistakes([])
            setResetLevel(false)
            onResetLevel(false)
        }
    }, [level, resetLevel, onResetLevel]);

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

    // Calcular precisión
    useEffect(() => {
        const total = text.length
        const incorrect = mistakes.length
        const correct = total - incorrect

        const accuracyData = {
            correct: total > 0 ? (correct / total) * 100 : 0,//Todo: calcular bien el correcto -> Correcto es todo lo que no es error hasta el momento
            incorrect: total > 0 ? (incorrect / total) * 100 : 0
        }

        console.log(accuracyData);

        updateAccuracyData(accuracyData)
    }, [text, mistakes, updateAccuracyData]);

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
                    {char}
                </span>
            ))}
            {showConfetti && <Confetti />}
        </div>
    )
}

export default AutoGeneratedText
