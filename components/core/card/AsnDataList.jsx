import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CardComponent from './CardComponent'
import PropTypes from 'prop-types'

const AsnDataList = ({
  data,
  name,
  cardStyle
}) => {
  
  const totalAmount = data.reduce((acc, current) => acc + current.amount, 0)

  return (
    <>
      <Grid
        container
        direction='column'
        marginTop={2}
        // columnSpacing={2}
        // rowSpacing={2}

        sx={{
          padding: '5px 15px 10px 15px',
          gap: '5px',
          backgroundColor: '#fff',
          marginLeft: `10px`,
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '5px'
          }}
        >
          <Typography
            color='primary'
            fontWeight='500'
          >
            {name}
          </Typography>
          {
            name && (
              <Typography
                color='primary'
                fontWeight='500'
              >
                {`Total : ${totalAmount}`}
              </Typography>
            )
          }
        </Box>
        <Grid
          item
          container
          alignItems='center'
          sx={{
            gap: '2.3rem'
          }}
        >
          {
            data.map((item, index) =>
              <Grid item
                key={index + 1}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid black'
                }}
              >
                <CardComponent
                  rootStyle={cardStyle}
                  summary={item.name}
                  amount={item.amount}
                />
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </>
  )
}

AsnDataList.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  cardStyle: PropTypes.object
}

export default AsnDataList
