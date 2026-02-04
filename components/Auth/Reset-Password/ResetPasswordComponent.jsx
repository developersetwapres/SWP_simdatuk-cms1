/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/core/Footer'
import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import ResetPasswordForm from './ResetPasswordForm'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import logo from '/public/simdatuk/Logo.png'
import Router from 'next/router'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    height: '100%',
    minHeight: '100vh',
    color: '#fff',
    overflow: 'auto hidden'
  }
}))

function ResetPasswordComponent({
  router,
  resetPassword = () => {},
  newPassword = () => {},
  isNewPassword = false
}) {
  const classes = useStyles()
  const selector = useSelector((state) => state.authentication)

  // Check if reset_token exists, if not redirect to login
  useEffect(() => {
    const resetToken = localStorage.getItem('reset_token')
    const resetEmail = localStorage.getItem('reset_email')
    
    if (!resetToken && !resetEmail && !isNewPassword) {
      Router.push('/auth/login')
    }
  }, [isNewPassword])

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    newPassword: '',
    confirmNewPassword: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('newPassword' in fieldOfValues) {
      if (!fieldOfValues.newPassword) {
        temp.newPassword = 'Password baru tidak boleh kosong'
      } else if (fieldOfValues.newPassword.length < 8) {
        temp.newPassword = 'Password baru minimal 8 karakter'
      } else if (!/[A-Z]/.test(fieldOfValues.newPassword)) {
        temp.newPassword = 'Password baru harus mengandung minimal 1 huruf besar'
      } else if (!/[a-z]/.test(fieldOfValues.newPassword)) {
        temp.newPassword = 'Password baru harus mengandung minimal 1 huruf kecil'
      } else if (!/\d/.test(fieldOfValues.newPassword)) {
        temp.newPassword = 'Password baru harus mengandung minimal 1 angka'
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fieldOfValues.newPassword)) {
        temp.newPassword = 'Password baru harus mengandung minimal 1 karakter spesial'
      } else {
        temp.newPassword = ''
      }
    }

    if ('confirmNewPassword' in fieldOfValues) {
      if (!fieldOfValues.confirmNewPassword) {
        temp.confirmNewPassword = 'Konfirmasi password baru tidak boleh kosong'
      } else if (fieldOfValues.confirmNewPassword.length < 8) {
        temp.confirmNewPassword = 'Konfirmasi password minimal 8 karakter'
      } else if (!/[A-Z]/.test(fieldOfValues.confirmNewPassword)) {
        temp.confirmNewPassword = 'Konfirmasi password harus mengandung minimal 1 huruf besar'
      } else if (!/[a-z]/.test(fieldOfValues.confirmNewPassword)) {
        temp.confirmNewPassword = 'Konfirmasi password harus mengandung minimal 1 huruf kecil'
      } else if (!/\d/.test(fieldOfValues.confirmNewPassword)) {
        temp.confirmNewPassword = 'Konfirmasi password harus mengandung minimal 1 angka'
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fieldOfValues.confirmNewPassword)) {
        temp.confirmNewPassword = 'Konfirmasi password harus mengandung minimal 1 karakter spesial'
      } else if (values.newPassword !== fieldOfValues.confirmNewPassword) {
        temp.confirmNewPassword = 'Password harus sama dengan Password Baru'
      } else {
        temp.confirmNewPassword = ''
      }
    }

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  )

  const handleSubmitReset = () => {
    if (validate()) {
      const resetToken = localStorage.getItem('reset_token')
      const payload = {
        reset_token: resetToken,
        password: values?.newPassword,
        new_password: values?.confirmNewPassword
      }

      router?.pathname.includes('new-password')
        ? newPassword(payload)
        : resetPassword(payload)
    }
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
            width='50%'
            maxWidth='md'
            color='sidatukDraweBase.main'
          >
            <Grid item textAlign='center'>
              <h2>{isNewPassword ? 'Password Baru' : 'Reset Password'}</h2>

              {/* {isNewPassword ? (
                <>
                  <p style={{ marginTop: '' }}>
                    Anda telah berhasil terverifikasi
                  </p>
                  <p style={{ marginTop: '-8px' }}>
                    Silakan masukkan password baru
                  </p>
                </>
              ) : (
                <p style={{ marginTop: '-10px' }}>
                  Reset Password akun: {router?.query?.email ?? '-'}
                </p>
              )} */}
            </Grid>
            <Grid item>
              <ResetPasswordForm
                values={values}
                handleInputChange={handleInputChange}
                handleSubmitReset={handleSubmitReset}
                errors={errors}
                stateLoading={selector}
              />
            </Grid>
          </Box>
          <Grid
            item
            sx={{
              marginTop: '80px'
            }}
          >
            <Footer
              sx={{
                color: '#fff'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

ResetPasswordComponent.propTypes = {
  router: PropTypes.object,
  resetPassword: PropTypes.func,
  newPassword: PropTypes.func,
  isNewPassword: PropTypes.bool
}

export default ResetPasswordComponent
