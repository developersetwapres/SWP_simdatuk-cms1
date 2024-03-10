import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '../../shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'





function CardComponent({ summary, amount }) {
  return (
    <Card sx={{
      width: '240px',
      height: '200px'
    }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{ fontSize: 12 }}
          fontWeight='bold'
          gutterBottom
          textAlign='center'
        >
          {summary}
        </Typography>
        <Typography
          variant='h2'
          component='p'
          color='primary'
          fontWeight='bold'
        >
          {amount}
        </Typography>
        <Button
          text='Lihat Detail'
          color='primary'
          fullWidth
          type='submit'
          sx={{
            ...primaryButtonStyle,
            textTransform: 'none'
          }}
        />
      </CardContent>
    </Card>
  )
}

CardComponent.propTypes = {
  summary: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
}

export default CardComponent