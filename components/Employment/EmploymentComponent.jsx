/* eslint-disable indent */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import EmploymentLayout from './EmploymentLayout'
import { Box, Grid, Typography } from '@mui/material'
import CardEmployment from '../shared/Card/CardEmployment'
import { useRouter } from 'next/router'
import Card from '../shared/Card/Index'

const EmploymentComponent = (props) => {
  const { data } = props
  const router = useRouter()

  const handleGetCountEmployee = (datas) => {
    return datas.reduce((accumulator, currentValue) => {
      currentValue.children.forEach((child) => {
        accumulator += child.count
      })
      return accumulator
    }, 0)
  }

  // checking data length, if more than 1 return true
  const dataLength = useMemo(() => {
    return data.length > 1 ? true : false
  }, [data])

  // Retrieval of total employee data
  const totalEmployee = useMemo(() => {
    return handleGetCountEmployee(data)
  }, [data])

  return (
    <EmploymentLayout
      summary='Rekapitulasi Pegawai Sekretariat Wakil Presiden RI'
      count={`Total Keseluruhan : ${totalEmployee}`}
    >
      <Grid container spacing={3}>
        {data?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card
              otherStyle={{
                padding: dataLength ? '20px' : '4px 0',
                backgroundColor: dataLength ? '#FFF' : 'transparent',
                boxShadow: dataLength
                  ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
                  : 'none'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: dataLength ? 'flex' : 'none',
                  alignItems: 'start',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  variant='h3'
                  component='h3'
                  color='primary'
                  sx={{
                    marginBottom: '12px',
                    fontSize: '16px',
                    fontWeight: 800
                  }}
                >
                  {item?.title || '-'}
                </Typography>
                <Typography
                  variant='h3'
                  component='h3'
                  color='primary'
                  sx={{
                    marginBottom: '12px',
                    fontSize: '16px',
                    fontWeight: 800
                  }}
                >
                  {handleGetCountEmployee([item])}
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {item?.children.map((itm, idx) => (
                  <Grid
                    item
                    key={idx}
                    xs={6}
                    sm={
                      item?.children.length == 2
                        ? 6
                        : item?.children.length == 3
                        ? 4
                        : 3
                    }
                  >
                    <CardEmployment
                      data={itm}
                      path={`${router?.asPath}/${btoa(itm?.category)}`}
                      cardStyle={{
                        border: dataLength ? '2px solid #394346' : 'none',
                        boxShadow: !dataLength
                          ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
                          : 'none'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </EmploymentLayout>
  )
}

EmploymentComponent.propTypes = {
  data: PropTypes.array
}

export default EmploymentComponent
