import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { mui_stackedChartData } from '../../data/dummy';

export const Stacked = ({width, height, currentMode, currentColor}) => {
    const second_chartColor = currentMode==='Dark'? '#B8B6B8' : '#33373E';
    return (
        <BarChart
            className="-ml-3"
            dataset={mui_stackedChartData}
            series={[
                { dataKey: 'y_val_1', label: 'budget', stack: 'assets', color: `${currentColor}` },
                { dataKey: 'y_val_2', label: 'expense', stack: 'assets', color: `${second_chartColor}` }, 
            ]}
            xAxis={[{ scaleType: 'band', dataKey: 'x_month' }]}
            slotProps={{ legend: { hidden: false } }} 
            width={width}
            height={height}
        />
    )
}
