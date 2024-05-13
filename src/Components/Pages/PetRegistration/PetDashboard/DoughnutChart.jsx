import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart(props) {

  const { id, type } = useParams()

  const [datas, setdatas] = useState()
  const [label, setlabel] = useState()

  useEffect(() => {

    console.log(props?.pending, props?.approved)

      setdatas([parseFloat(props?.pending), parseFloat(props?.approved)])
      setlabel(['Pending Application', 'Approved Application'])

  }, [props?.pending, props?.approved])

  const options = {
    responsive: true,
    animation: {
      duration: 2000 // set the duration of the animation in milliseconds
    },
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: 'Total No.',
        data: datas,
        backgroundColor: [
          '#492dffc1',
          '#22C55E',
        ],
      },
    ],
  };
  return (
    <>
        <Doughnut data={data} options={options} className=' h-[15rem]' />
    </>
  )
}

export default DoughnutChart