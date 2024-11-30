import React from 'react'

const LevelCount = ({ currentLevel, isUserGenerated }) => {


    return (
        <div className='level-counter'>
            <div className='title'>nivel</div>
            <div className='info'>
                {isUserGenerated ? '< / >' : currentLevel}
            </div>
        </div>
    )
}

export default LevelCount
