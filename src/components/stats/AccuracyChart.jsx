import React, { PureComponent }  from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import { useTheme } from '@mui/material/styles'

const AccuracyChart = ({ accuracy }) => {
    const theme = useTheme()

    const data = [
        { name: 'correct', value: accuracy.correct },
        { name: 'incorrect', value: accuracy.incorrect }
    ]

    const pieColors = {
        correct: theme.palette.mode === 'dark' ? '#83E949' : '#7736EE',
        incorrect: '#f16e60' 
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
                                fill={index === 0 ? pieColors.correct : pieColors.incorrect}
                            />
                        })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AccuracyChart
