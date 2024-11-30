import React from 'react'

const AverageWpm = ( { averageWpm } ) => {
    return (
        <div className='media-wpm'>
            <div className='title'>media WPM</div>
            <div className='info'>{averageWpm}</div>
        </div>
    )
}

export default AverageWpm
