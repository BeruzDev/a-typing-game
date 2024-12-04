import React from 'react'
import AverageWpm from './summary/AverageWpm'   
import LevelCount from './summary/LevelCount'
import TimerCount from './summary/TimerCount'
import AverageAccuracy from './summary/AverageAccuracy'

const Summary = ({ averageWpm, lastLevelTime, currentLevel, isUserGenerated, accuracy }) => {
    return (
        <div className='summary'>
            <LevelCount currentLevel={currentLevel} isUserGenerated={isUserGenerated} />
            <AverageWpm averageWpm={averageWpm} />
            <TimerCount lastLevelTime={lastLevelTime} />
            <AverageAccuracy accuracy={accuracy} />
        </div>
    )
}

export default Summary
