import React from 'react'
import {
  Grid, Box, Container
} from '@mui/material'
import LoginContentText from './LoginContentText'
import Image from 'next/image'
import authHero from '/public/simdatuk/authHero.png'
import LoginFormComponent from './LoginFormComponent'



const LoginComponent = () => {


  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: {
        xs: 'start',
        sm: 'center',
        md: 'center',
        lg: 'center',
        xl: 'center'
      }
    }}>
      <Box>
        <Image
          src={authHero}
          layout='fill'
          alt='background'
        />
      </Box>
      <Container
        sx={{
          height: '60%',
          position: 'relative',
          zIndex: 100
        }}>
        <Grid
          container
          columnSpacing={5}
          sx={{
            height: '100%',
            alignItems: 'center'

          }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              paddingBottom: {
                xs: '20px',
                md: '40px'
              },
              paddingTop: {
                xs: '30px',
                md: '40px'
              }
            }}
          >
            {/* Text  Banner*/}
            <LoginContentText />
            {/* end Text Banner */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end'
              }}
            >
              {/* Form Component */}
              <LoginFormComponent />
              {/* End Form Component */}


            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box >
  )
}


export default LoginComponent


