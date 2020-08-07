import React, { useState, useEffect } from 'react'
import './LineGraph.css'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const LineGraph = () => {
    const [data, setData] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
            const data = await (await fetch(url)).json()
            const chartData = buildChartData(data);
            setData(chartData)
        }

        fetchData()


    }, [])

    const buildChartData = (data, caseType = 'cases') => {
        const chartData = [];
        let lastDataPoint;

        for (let date in data[caseType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[caseType][date]
        }

        return chartData;
    }

    return (
        <div class="lineGraph">
            {data?.length > 0 && <Line data={{
                datasets: [
                    {
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: data
                    }
                ]
            }} options={options}>

            </Line>}

        </div>
    )
}

export default LineGraph;