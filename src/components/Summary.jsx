import React from 'react'
import AverageWpm from './summary/AverageWpm'   
import LevelCount from './summary/LevelCount'
import TimerCount from './summary/TimerCount'

const Summary = ({ averageWpm, lastLevelTime, currentLevel, isUserGenerated  }) => {
    return (
        <div className='summary'>
            <LevelCount currentLevel={currentLevel} isUserGenerated={isUserGenerated} />
            <AverageWpm averageWpm={averageWpm} />
            <TimerCount lastLevelTime={lastLevelTime} />
        </div>
    )
}

export default Summary
