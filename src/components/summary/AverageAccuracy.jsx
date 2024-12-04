import React, { useState, useEffect} from 'react'

const AverageAccuracy = ({ accuracy }) => {
    const [accuracyPercentage, setAccuracyPercentage] = useState(0);

    useEffect(() => {
        setAccuracyPercentage(accuracy.correct.toFixed(0))
    }, [accuracy]);

    return (
        <div className='accuracy-average'>
            <div className='title'>precisión</div>
            <div className='info'>{accuracyPercentage}%</div>
        </div>
    )
}

export default AverageAccuracy
