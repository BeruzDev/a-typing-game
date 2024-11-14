import React, { useState, useEffect } from 'react'

const TimerCount = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(300); // <-Temporizador de 60 segundos

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp() // <-LLamar cuando el tempo termina
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1)
        }, 1000)

        return () => clearInterval(timer) // <-Limpiar el intervalo cuando el componente se desmonta
    }, [timeLeft, onTimeUp]);

    return (
        <div className='temporizador'>
            {timeLeft}
        </div>
    )
}

export default TimerCount
