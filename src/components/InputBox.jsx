import React from 'react'
import '../styles/components/_InputBox.scss'
import Keyboard from './keyboard/Keyboard.jsx'


const InputBox = ({ activeKey }) => {

    return (
        <div className='input-box'>
            <Keyboard activeKey={activeKey}/>
        </div>
    )
}

export default InputBox
