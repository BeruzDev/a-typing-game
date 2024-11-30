import React from 'react'

const TimerCount = ({ lastLevelTime }) => {
    

    return (
        <div className='temporizador'>
            <div className='title'>último tiempo</div>
            <div className='info'>{lastLevelTime}</div>
        </div>
    )
}

export default TimerCount
