/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/core/Footer'
import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import ResetPasswordForm from './ResetPasswordForm'
import { useDispatch, useSelector } from 'react-redux'
import { GET_HASH_URL_PASSWORD_REQUESTED, RESET_PASSWORD_REQUESTED } from '@/store/constants'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2F2F2F',
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
        maxWidth='sm'
      >
        <Grid
          container
          direction='column'
        >
          <Grid
            item
            lg={12}
            xl={12}
            md={12}
            sm={12}
            xs={12}
          >
            <img
              src='/images/logo_setneg.svg'
              alt='logo'
              style={{
                width: '100%',
                maxWidth: '460px',
                height: '98px',
                display: 'block',
                margin: '40px auto'
              }}
            />
          </Grid>
          <Grid
            item
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