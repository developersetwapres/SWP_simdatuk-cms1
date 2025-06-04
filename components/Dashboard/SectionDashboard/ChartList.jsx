import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

const ChartList = ({ data }) => {
  const handleGetPercentage = (datas, count) => {
    const totalCount = datas.reduce((total, item) => total + item.count, 0)
    const value = (100 / totalCount) * count
    return value.toFixed(1)
  }

  return (
    <Box sx={{ width: '100%' }}>
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
          margin: '6px 0 16px 0',
          fontSize: '16px'
        }}
      >
        {data?.copytext}
      </Typography>
      <Box>
        {data?.children?.map((item, index) => (
          <Box
            sx={{
              width: '100%',
              marginBottom: index + 1 == data?.children?.length ? 0 : '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
            key={index}
          >
            <Box
              sx={{
                width: '16px',
                height: '16px',
                backgroundColor: item?.color
              }}
            />
            <Box
              sx={{
                width: '100%',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant='p'
                component='p'
                sx={{ width: '80%', fontSize: '16px' }}
              >
                {`${item?.name} (${handleGetPercentage(
                  data?.children,
                  item?.count
                )}%)`}
              </Typography>
              <Typography variant='p' component='p' sx={{ fontSize: '16px' }}>
                {`${item?.count} orang`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

ChartList.propTypes = {
  data: PropTypes.object
}

export default ChartList
