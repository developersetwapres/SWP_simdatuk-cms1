/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import List from '@mui/material/List'
import ChartDataComponent from './ChartDataComponent'
import { dataPegawai } from './sampleData'




function ChartLayout({
  title,
  subtitle
}) {
  const [employeeData, setEmployeeData] = useState({
    labels: [dataPegawai.map((data) => data.name)],
    datasets: [
      {
        label: 'Unit Kerja',
        data: dataPegawai.map((data) => data.employee),
        backgroundColor: dataPegawai.map((data) => data.color)
      }
    ]
  })


  return (
    <Paper
      sx={{
        marginTop: '1rem',
        padding: '5rem',
        display: 'flex',
        justifyContent: 'center'

      }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >

        <Grid>
          <Box item>
            <Typography
              variant='h4'
              component='h4'
              fontSize={24}
              fontWeight='bold'
            >
              {title}
            </Typography>
            <Typography
              variant='h6'
              component='p'
              fontSize={14}
            >
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '5rem',
              marginTop: '15px'
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {dataPegawai.map((value, index) => {
                const labelId = `checkbox-list-label-${value.id}`

                return (
                  <Grid
                    container
                    justifyContent='space-between'
                    direction='row'
                    maxWidth={900}
                    width='500px'
                    key={index + 1}
                    disablePadding
                    sx={{
                      gap: '10px'
                    }}
                  >
                    <Box
                      sx={{
                        py: '3px',
                        display: 'flex',
                        gap: '10px'
                      }}
                    >
                      <Box
                        component='div'
                        width={13}
                        height={13}
                        sx={{
                          backgroundColor: `${value.color}`
                        }}
                      >
                      </Box>
                      <Typography
                        id={labelId}
                        maxWidth={300}
                        sx={{
                          fontSize: '11px'
                        }}
                      >
                        {`${value.name} Orang`}
                      </Typography>
                    </Box>
                    <Typography
                      id={labelId}
                      sx={{
                        fontSize: '11px'
                      }}
                    >
                      {`${value.employee} Orang`}
                    </Typography>
                  </Grid>
                )
              })}
            </List>
          </Box>
        </Grid>
        <Box>
          <ChartDataComponent chartData={employeeData} />
        </Box>
      </Grid>
    </Paper>
  )
}

ChartLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  nameDataLeft: PropTypes.string,
  nameDataRight: PropTypes.string,
  leftData: PropTypes.string,
  rightData: PropTypes.string,
  name: PropTypes.string
}

export default ChartLayout
