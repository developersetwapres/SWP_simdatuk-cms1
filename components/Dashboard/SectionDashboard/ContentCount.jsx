/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Grid, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

const ContentCount = ({ data, datas }) => {
  const counts = datas[data?.type]
  const labels = data?.count?.map((e) => e?.title)
  const transformed = !!counts && typeof counts === 'object' && Array.isArray(counts) ? counts : Object.entries(counts)

  return (
    <Box>
      <Typography
        variant='h3'
        component='h3'
        sx={{
          fontSize: '28px',
          fontWeight: '800'
        }}
      >
        {data?.title}
      </Typography>
      <Typography
        variant='p'
        component='p'
        fontSize={16}
        sx={{
          margin: '6px 0 10px 0',
          fontSize: '16px'
        }}
      >
        {data?.copytext}
      </Typography>

      {data?.type === 'generations' && (
        <Grid container spacing={2}>
          {transformed?.map(item => (
            <Grid key={uuidv4()} item>
              <CardCount title={item?.name || ''} count={item?.total || 0} />
            </Grid>
          ))}
        </Grid>
      )}

      {data?.type !== 'generations' && (
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: '16px'
          }}
        >
          {transformed?.map(([key, value], idx) => (
            <CardCount key={uuidv4()} title={labels[idx]} count={value} />
          ))}
        </Box>
      )}
    </Box>
  )
}

const CardCount = ({ title, count }) => {
  return (
    <Card
      sx={{
        width: '160px',
        minHieght: '130px',
        padding: '16px',
        backgroundColor: '#FBF6EE',
        boxShadow: 'none',
        borderRadius: '8px'
      }}
    >
      <Typography
        variant='p'
        component='p'
        sx={{
          // width: '90%',
          marginBottom: '8px',
          fontSize: '16px',
          fontWeight: 440
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='h4'
        component='p'
        fontSize={24}
        fontWeight='bold'
        color='primary'
      >
        {count}
      </Typography>
    </Card>
  )
}

CardCount.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number
}
ContentCount.propTypes = {
  data: PropTypes.object,
  datas: PropTypes.object
}

export default ContentCount
