import React, { PureComponent }  from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import { useTheme } from '@mui/material/styles'

const AccuracyChart = ({ accuracy }) => {
    const theme = useTheme()

    const total = accuracy.correct + accuracy.incorrect
    const defaultValue = total < 100 ? 100 - total : 0
    const data = [
        { name: 'correct', value: accuracy.correct },
        { name: 'incorrect', value: accuracy.incorrect },
        { name: 'default', value: defaultValue}
    ]

    const pieColors = {
        correct: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        incorrect: '#f16e60', 
        default: theme.palette.mode === 'dark' ? '#362349' : '#DDDEE5'
    }
    
    return (
        <div className='accuracy-chart'>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx='50%'
                        cy='50%'
                        outerRadius={55}
                        dataKey='value'
                        labelLine={false}
                        stroke='none'
                        animationDuration={1000}
                        animationEasing='ease-out'
                    >
                        {data.map((entry, index) => {
                            return <Cell 
                                key={`cell-${index}`}
                                fill={entry.name === 'correct'
                                        ? pieColors.correct
                                        : entry.name === 'incorrect'
                                        ? pieColors.incorrect
                                        : pieColors.default
                                    }
                            />
                        })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AccuracyChart
