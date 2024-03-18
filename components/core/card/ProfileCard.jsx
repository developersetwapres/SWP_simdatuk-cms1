import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button } from '../../shared'
import PropTypes from 'prop-types'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'

const style = {
  cardParent: {
    width: {
      lg: '16vw',
      md: '18vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '40rem'

  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: '.5rem'
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

const ProfileCard = ({
  rootStyle,
  summary,
  name,
  eselon,
  imageSource,
  golongan,
  nip,
  lihatDetail,
  lihatProfile
}) => {


  const handleButtonClick = () => {
    console.log('ok')
  }
  return (
    <Card sx={rootStyle || style.cardParent}>
      <CardContent
        sx={style.cardContent}
      >
        <Box
          height='60px'
        >
          <Typography
            sx={{ fontSize: 14 }}
            fontWeight='bold'
            gutterBottom
            textAlign='center'

          >
            {summary}
          </Typography>
        </Box>
        <Box
          sx={style.imageBox}
        >
          {imageSource?.length > 0 && (
            <Image
              src={imageSource}
              alt='profile'
              height={200}
              width={150}
            />
          )}
          <Typography
            color='primary'
            fontWeight='600'
            textAlign='center'
          >
            {name}
          </Typography>
        </Box>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
          >
            <Typography fontSize={14}>
              Eselon
            </Typography>
            <Typography
              variant='p'
              component='div'
              fontSize={14}
              fontWeight='600'
            >
              {eselon}
            </Typography>
          </Grid>
          <Grid
            item
          >
            <Typography fontSize={14}>
              Golongan
            </Typography>
            <Typography
              variant='p'
              component='div'
              fontSize={14}
              fontWeight='600'
            >
              {golongan}
            </Typography>
          </Grid>
          <Grid
            item
          >
            <Typography
              fontSize={14}
            >
              NIP/NRP
            </Typography>
            <Typography
              variant='p'
              component='div'
              fontSize={14}
              fontWeight='600'
            >
              {nip}
            </Typography>
          </Grid>
        </Grid>
        {
          lihatProfile && (
            <Button
              onClick={handleButtonClick}
              text='Lihat Profile'
              color='sidatukDraweBase'
              fullWidth
              type='submit'
              sx={{
                color: '#fff',
                textTransform: 'none'
              }}
            />
          )
        }
        {
          lihatDetail && (
            <Button
              onClick={handleButtonClick}
              text={lihatDetail}
              color='sidatukDraweBase'
              fullWidth
              type='submit'
              sx={{
                color: '#fff',
                textTransform: 'none'
              }}
            />
          )
        }
      </CardContent>
    </Card>
  )
}

ProfileCard.propTypes = {
  summary: PropTypes.string.isRequired,
  name: PropTypes.string,
  imageSource: PropTypes.string,
  eselon: PropTypes.string,
  golongan: PropTypes.string,
  nip: PropTypes.string,
  rootStyle: PropTypes.object,
  lihatProfile: PropTypes.string,
  lihatDetail: PropTypes.string
}

export default ProfileCard
