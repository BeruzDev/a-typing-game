import React from 'react'

const TimeCounter = ({ elapsedTime}) => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = Math.floor(elapsedTime % 60)
    const milliseconds = Math.floor((elapsedTime % 1) * 100)

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds

    return (
        <div className='time-counter'>
            <div className='title'>tiempo</div>
            <div className='info'>{formattedMinutes}:{formattedSeconds}:{formattedMilliseconds}</div>
        </div>
    )
}

export default TimeCounter
