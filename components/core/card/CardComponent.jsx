import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '../../shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'





function CardComponent({ summary, amount, rootStyle, path }) {
  const router = useRouter()


  const handleButtonClick = () => {
    router.push(path)
  }

  return (
    <Card sx={rootStyle || {
      width: {
        lg: '16vw',
        md: '20vw',
        sm: '25vw',
        xs: '50vw'
      },
      height: '200px'
    }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{ fontSize: 11 }}
          fontWeight='bold'
          gutterBottom
          paddingY={1}
          height={60}
          textAlign='center'
        >
          {summary}
        </Typography>
        <Typography
          variant='h3'
          component='p'
          color='primary'
          height={80}
          fontWeight='bold'
        >
          {amount}
        </Typography>
        {amount !== 0 ? (
          <Button
            onClick={handleButtonClick}
            text='Lihat Detail'
            color='primary'
            fullWidth
            type='submit'
            sx={{
              ...primaryButtonStyle,
              textTransform: 'none'
            }}
          />
        ) : ''}
      </CardContent>
    </Card>
  )
}

CardComponent.propTypes = {
  summary: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  rootStyle: PropTypes.object,
  path: PropTypes.string
}

export default CardComponent