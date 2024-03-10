import React from 'react'
import PropTypes from 'prop-types'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

const ChartDataComponent = ({ chartData }) => {
  return (
    <>
      <Chart type='doughnut' data={chartData} />
    </>
  )
}

ChartDataComponent.propTypes = {
  chartData: PropTypes.object
}

export default ChartDataComponent
