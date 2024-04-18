import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, Typography } from '@mui/material'

const ContentCount = ({ data }) => {
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
        {data?.count.map((item, index) => (
          <CardCount key={index} title={item?.title} count={item?.total} />
        ))}
      </Box>
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
  data: PropTypes.object
}

export default ContentCount
