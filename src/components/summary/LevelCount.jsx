import React from 'react'
import { TbCode } from "react-icons/tb";

const LevelCount = ({ currentLevel, isUserGenerated }) => {


    return (
        <div className='level-counter'>
            <div className='title'>nivel</div>
            <div className='info'>
                {isUserGenerated ? <TbCode /> : currentLevel}
            </div>
        </div>
    )
}

export default LevelCount
