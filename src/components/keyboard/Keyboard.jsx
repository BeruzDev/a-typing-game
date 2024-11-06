import React from 'react'
import Key from './Key'
import keys from './keys'
import '../../styles/components/keyboard/_keyboard.scss'

const keyboard = ({ keyColors }) => {
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
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default keyboard
