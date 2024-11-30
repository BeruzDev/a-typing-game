import React from 'react'

const WpmCounter = ({ wpm }) => {
    return (
        <div className='wpm'>
            <div className='title'>WPM</div>
            <div className='info'>{wpm}</div>
        </div>
    )
}

export default WpmCounter
