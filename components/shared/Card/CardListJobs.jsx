import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, List, Typography } from '@mui/material'
import { Button } from '..'

const CardListJobs = ({ data, otherStyle }) => {
  const ExpandButton = useMemo(() => {
    let newData = []

    data?.jobs.map((job) => {
      newData = [...newData, ...job?.children]
    })

    if (newData?.length > 0) return true

    return false
  }, [data])

  return (
    <Box
      marginTop={1}
      backgroundColor='#FFF'
      border='1px solid #000'
      borderRadius='10px'
      padding={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...otherStyle
      }}
    >
      <Box>
        <Typography textAlign='center' fontWeight='600' color='primary'>
          {data?.title}
        </Typography>
        <List sx={{ marginBottom: '14px' }}>
          {data?.jobs.map((job, idx) => (
            <Typography key={idx} fontWeight='600'>
              {`${idx + 1}. ${job?.title} (${job?.children?.length}/${
                job?.slot
              })`}
            </Typography>
          ))}
        </List>
      </Box>
      {ExpandButton && (
        <Button
          // onClick={onCLick}
          text='Lihat Detail'
          color='primary'
          fullWidth
          type='submit'
          sx={{
            color: '#fff',
            textTransform: 'none',
            fontSize: '10px',
            alignSelf: 'flex-end'
          }}
        />
      )}
    </Box>
  )
}

CardListJobs.propTypes = {
  data: PropTypes.object,
  otherStyle: PropTypes.object
}

export default CardListJobs
