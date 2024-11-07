import React from 'react'
import Key from './Key.jsx'
import keys from './keys.js'
import '../../styles/components/keyboard/_keyboard.scss'

const Keyboard = ({ activeKey }) => {
    
    return (
        <div className='keyboard'>
            {keys.map((row, rowIndex) => (
                <div className='row-keyboard' key={rowIndex}>
                    {row.map((keyData, keyIndex) => (
                        <Key 
                            key={keyIndex}
                            chart={keyData.chart}
                            shift={keyData.shift}
                            alt={keyData.alt}
                            size={keyData.size}
                            isActive={activeKey === keyData.keyListener}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
