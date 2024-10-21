import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
export const SparkLine = ({ height, width, color}) => {
    return (
        <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
            series={[
                {
                data: [2, 6, 8, 5, 10, 8],
                area: true,
                color: color,
                },
            ]}
            width={width}
            height={height}
        />
    )
}
