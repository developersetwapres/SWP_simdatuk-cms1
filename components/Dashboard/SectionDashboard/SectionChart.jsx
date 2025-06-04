/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import 'chart.js/auto'
import DashboardSectionLayout from '../DashboardSectionLayout'
import { Box, Grid } from '@mui/material'
import { Chart } from 'react-chartjs-2'
import ChartList from './ChartList'

const style = {
  grid: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}

const SectionChart = ({ data, datas }) => {
  const counts = datas[data?.type]
  const generateRandomColor = (name, index) => {
    const colorWheel = [
      '#FF0000', // Merah
      '#FFA500', // Oranye
      '#FFFF00', // Kuning
      '#008000', // Hijau
      '#0000FF', // Biru
      '#800080', // Ungu
      '#FF4500', // Jingga
      '#A52A2A', // Coklat
      '#FFC0CB', // Pink
      '#808080' // Abu-abu
    ]

    let color = ''

    if (index < colorWheel.length) {
      color = colorWheel[index]
    } else {
      let hash = 0
      for (let i = 0; i < name?.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
      }
      color = '#' + ((hash & 0xffffff) << 0).toString(16).padStart(6, '0')
    }

    return color
  }

  const newDatas = useMemo(() => {
    const payload = {
      ...Object.keys(data).reduce((acc, key) => {
        if (key !== 'children') {
          acc[key] = data[key]
        }
        return acc
      }, {}),
      children: counts?.map((item, index) => ({
        ...item,
        count: item?.total || item?.quantity,
        color: generateRandomColor(item?.name, index)
      }))
    }

    return payload
  }, [datas])

  const dataCharts = useMemo(() => {
    const payload = {
      labels: !!newDatas?.children?.length ? newDatas?.children?.map((item) => item.name) : [],
      datasets: [
        {
          label: newDatas?.title,
          data: newDatas?.children?.map((item) => item.count),
          backgroundColor: newDatas?.children?.map((item) => item.color),
          borderWidth: 1
        }
      ]
    }

    return payload
  }, [newDatas])

  return (
    <DashboardSectionLayout>
      <Grid container sx={{ height: '80vh' }}>
        {!!newDatas?.children?.length && (
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              ...style?.grid,
              paddingLeft: '44px'
            }}
          >
            <ChartList data={newDatas} />
          </Grid>
        )}

        {!!dataCharts && (
          <Grid item xs={12} sm={7} sx={style?.grid}>
            <Box sx={{ width: '60%' }}>
              <Chart type='doughnut' data={dataCharts} options={options} />
            </Box>
          </Grid>
        )}
      </Grid>
    </DashboardSectionLayout>
  )
}

SectionChart.propTypes = {
  data: PropTypes.object,
  datas: PropTypes.object
}

export default SectionChart
