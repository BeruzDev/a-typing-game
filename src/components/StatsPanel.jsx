import React from 'react'
import WpmCounter from './stats/WpmCounter'
import AccuracyChart from './stats/AccuracyChart'
import TimeCounter from './stats/TimeCounter'
import TextProgressBar from './stats/TextProgressBar'

const StatsPanel = ({ wpm, elapsedTime, progress }) => {
    return (
        <div className='stats-panel'>
            <WpmCounter wpm={wpm}/>
            <TimeCounter elapsedTime={elapsedTime} />
            <TextProgressBar progress={progress} />
            <AccuracyChart />
        </div>
    )
}

export default StatsPanel
