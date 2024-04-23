import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Button } from '..'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Card from './Index'
import { Box } from '@mui/material'

function CardEmployment({ data, path, cardStyle }) {
  const router = useRouter()

  const style = {
    container: {
      width: '100%',
      minHeight: '164px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: data?.slot > 0 ? 'space-between' : 'flex-start',
      flexDirection: 'column'
    }
  }

  return (
    <Card otherStyle={cardStyle}>
      <Box sx={style?.container}>
        <Typography
          textAlign='center'
          sx={{
            minHeight: '40px',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {data?.title || '-'}
        </Typography>
        <Typography
          variant='h3'
          component='h3'
          color='primary'
          sx={{
            margin: '12px 0',
            fontWeight: 800
          }}
        >
          {data?.count || 0}
        </Typography>
        {data?.count > 0 && (
          <Button
            onClick={() => router.push(path)}
            text='Lihat Detail'
            color='primary'
            fullWidth
            type='submit'
            sx={{
              ...primaryButtonStyle,
              textTransform: 'none'
            }}
          />
        )}
      </Box>
    </Card>
  )
}

CardEmployment.propTypes = {
  data: PropTypes.object,
  path: PropTypes.string,
  cardStyle: PropTypes.object
}

export default CardEmployment
