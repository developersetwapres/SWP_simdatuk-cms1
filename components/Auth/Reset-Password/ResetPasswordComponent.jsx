/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/core/Footer'
import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import ResetPasswordForm from './ResetPasswordForm'
import { useDispatch, useSelector } from 'react-redux'
import { GET_HASH_URL_PASSWORD_REQUESTED, RESET_PASSWORD_REQUESTED } from '@/store/constants'
import PropTypes from 'prop-types'
import logo from '/public/simdatuk/Logo.png'


// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    height: '100%',
    minHeight: '100vh',
    // padding: '10px',
    color: '#fff',
    overflow: 'auto hidden'
  }
}))

function ResetPasswordComponent({
  router
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.authentication)

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    newPassword: '',
    confirmNewPassword: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('newPassword' in fieldOfValues)
      temp.newPassword = fieldOfValues.newPassword ? '' : 'Password baru tidak boleh kosong'

    if ('confirmNewPassword' in fieldOfValues)
      temp.confirmNewPassword = fieldOfValues.confirmNewPassword
        ? (
          values.newPassword.toLowerCase() === fieldOfValues.confirmNewPassword.toLowerCase()
            ? ''
            : 'Password harus sama dengan Password Baru'
        )
        : 'Konfirmasi password baru tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleSubmitReset = () => {
    if (validate()) {
      dispatch({
        type: RESET_PASSWORD_REQUESTED, payload: {
          password: values.newPassword,
          hash: router.query.hash
        }
      })
    }
  }

  //* Dispatch Action GET_HASH
  useEffect(() => {
    if (!router.isReady) return
    dispatch({ type: GET_HASH_URL_PASSWORD_REQUESTED, payload: router.query.hash })
  }, [router, dispatch])


  return (
    <Box
      className={classes.root}
    >
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
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
            >
              <Image
                src={logo}
                alt='Logo'
                width={60}
                height={60}
              />
              <Typography
                variant='h4'
                fontWeight='500'
                component='h4'
                color='primary'
                sx={{

                }}
              >
                SIMDATUK
              </Typography>
            </Stack>
          </Grid>
          <Box
            contnainer
            alignItems='center'
            width='50%'
            maxWidth='md'
            color='sidatukDraweBase.main'
          >
            <Grid
              item
              textAlign='center'
            >
              <h2>Reset Password</h2>
              <p style={{
                marginTop: '-10px'
              }}>Reset Password akun: {selector?.resetPassword.email ?? '-'}</p>
            </Grid>
            <Grid
              item
            >
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
  router: PropTypes.object
}

export default ResetPasswordComponent