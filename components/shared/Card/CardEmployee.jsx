/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardContent, Typography } from '@mui/material'

const style = {
  cardParent: {
    minWidth: {
      md: '18vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: 'fit-content'
  },
  imageBox: {
    width: '100%',
    minHeight: '266px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  cardContent: {
    minHeight: 'fit-content',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  }
}

const CardEmployee = ({ data, otherStyle }) => {
  return (
    <Card sx={{ ...style.cardParent, ...otherStyle }}>
      <CardContent sx={style.cardContent}>
        <Box sx={style.imageBox}>
          {data?.image?.length > 0 ? (
            <Box
              sx={{
                width: '150px',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={data?.image}
                alt='profile'
                srcset='/simdatuk/userIcon.png'
                style={{ height: '100%', width: '100%' }}
              />
            </Box>
          ) : (
            <Box
              height={200}
              width={150}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                borderRadius: '6px'
              }}
            >
              <img
                src='/simdatuk/userIcon.png'
                alt='profile'
                height={70}
                width={70}
              />
            </Box>
          )}
          <Typography
            color='primary'
            fontWeight='600'
            textAlign='center'
            sx={{
              margin: '10px 0',
              minHeight: '24px'
            }}
          >
            {data?.name || '-'}
          </Typography>
          <Typography fontWeight='400' textAlign='center'>
            {data?.date || '-'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

CardEmployee.propTypes = {
  data: PropTypes.object,
  otherStyle: PropTypes.object
}

export default CardEmployee
