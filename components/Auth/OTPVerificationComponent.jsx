/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import logo from '/public/simdatuk/Logo.png'
import OTPVerificationForm from './OTPVerificationForm'
import { useRouter } from 'next/router'
import Router from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    height: '100%',
    minHeight: '100vh',
    color: '#fff',
    overflow: 'auto hidden'
  }
}))

function OTPVerificationComponent({
  verifyOTP = () => {},
  forgetPassword = () => {}
}) {
  const classes = useStyles()
  const router = useRouter()
  const [otpValue, setOtpValue] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(5)
  const [canResend, setCanResend] = useState(false)
  
  // Check if reset_email exists, if not redirect to login
  useEffect(() => {
    const resetEmail = router.query.email || localStorage.getItem('reset_email')
    
    if (!resetEmail) {
      Router.push('/auth/login')
    }
  }, [router.query.email])

  
  useEffect(() => {
    // Start countdown when component mounts
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOTPChange = (value) => {
    setOtpValue(value)
    setError('')
  }

  const handleSubmitOTP = () => {
    if (otpValue.length !== 6) {
      setError('OTP harus 6 digit')
      return
    }

    const email = router.query.email || localStorage.getItem('reset_email')
    const payload = {
      email: email,
      otp: otpValue
    }

    verifyOTP(payload)
  }

  const handleResendOTP = () => {
    if (!canResend) return
    
    const email = router.query.email || localStorage.getItem('reset_email')
    const payload = {
      email: email
    }
    forgetPassword(payload)
    
    // Reset countdown
    setCountdown(60)
    setCanResend(false)
  }

  return (
    <Box className={classes.root}>
      <Container
        maxWidth='lg'
        sx={{
          bgcolor: '#fff'
        }}
      >
        <Grid
          container
          direction='column'
          alignItems='center'
          sx={{
            bgcolor: '#fff'
          }}
        >
          <Grid
            item
            alignSelf='self-start'
            lg={12}
            xl={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              p: 2
            }}
          >
            <Stack direction='row' spacing={2} alignItems='center'>
              <Image src={logo} alt='Logo' width={60} height={60} />
              <Typography
                variant='h4'
                fontWeight='500'
                component='h4'
                color='primary'
                sx={{}}
              >
                SIMDATUK
              </Typography>
            </Stack>
          </Grid>
          <Box
            alignItems='center'
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '550px',
                borderRadius: '10px',
                padding: '48px 45px 40px 45px'
              }}
            >
              <Typography
                variant='h5'
                fontWeight='600'
                component='h5'
                color='primary'
                sx={{
                  textAlign: 'center',
                  marginBottom: '10px'
                }}
              >
                Verifikasi OTP
              </Typography>
              <Typography
                variant='body2'
                component='p'
                sx={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  color: '#666'
                }}
              >
                Masukkan kode OTP 6 digit yang telah dikirim ke email Anda.
              </Typography>
              <OTPVerificationForm
                otpValue={otpValue}
                error={error}
                countdown={countdown}
                canResend={canResend}
                handleOTPChange={handleOTPChange}
                handleSubmitOTP={handleSubmitOTP}
                handleResendOTP={handleResendOTP}
              />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

OTPVerificationComponent.propTypes = {
  verifyOTP: PropTypes.func,
  forgetPassword: PropTypes.func
}

export default OTPVerificationComponent
