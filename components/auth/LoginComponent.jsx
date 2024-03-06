/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Alert, Box, Container, Grid } from '@mui/material'
import LoginFormComponent from './LoginFormComponent'
import { useForm } from '@/hooks/index'
import Footer from '../core/Footer'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import { notAllowedCharAndWord } from '@/utils/regex'
import { setStorages, getStorage } from '@/utils/storage'
import Login2FAModal from './Login2FAModal'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto hidden',
    backgroundColor: '#2F2F2F',
    color: '#fff',
    height: '100vh'
  },
  child: {
    marginTop: '100px',
    // marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '50px'
      // marginBottom: '35px'
    }
  }
}))

function LoginComponent({
  authentication = () => { },
  forgetPassword = () => { },
  qrCode = () => { }
}) {
  const errorState = useSelector(state => state.authentication)
  const rememberMeState = getStorage('remember_setneg') ? JSON.parse(getStorage('remember_setneg')) : null
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    nip: rememberMeState?.nip === '' ? '' : rememberMeState?.nip,
    password: rememberMeState?.password === '' ? '' : rememberMeState?.password
  })

  const [rememberMe, setRememberMe] = useState(rememberMeState?.isRemember || false)

  const [modalResetEmail, setModalResetEmail] = useState(false)
  const [modalResetEmailFinish, setResetEmailFinish] = useState(false)
  const [modal2FA, setModal2FA] = useState(false)


  const classes = useStyles()

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('nip' in fieldOfValues) {
      temp.nip = fieldOfValues.nip
        ? (
          notAllowedCharAndWord(fieldOfValues.nip)
            ? (
              fieldOfValues.nip.length <= 18
                ? ''
                : 'SSO tidak boleh lebih dari 18'
            )
            : 'SSO tidak boleh mengandung simbol atau huruf'
        )
        : 'SSO tidak boleh kosong'
    }


    if ('password' in fieldOfValues)
      temp.password = fieldOfValues.password ? '' : 'Password tidak boleh kosong'


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
    // resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleLogin = (e) => {
    e.preventDefault()
    if (validate()) {
      const payload = {
        nip: values.nip,
        password: values.password
      }
      if (rememberMe === true) {
        setStorages([
          {
            name: 'remember_setneg',
            value: JSON.stringify({
              nip: values.nip,
              password: values.password,
              isRemember: true
            })
          }
        ])
      } else {
        localStorage.removeItem('remember_setneg')
      }
      // authentication(payload)
      qrCode(payload)

      if (errorState?.statusCode === 200) {
        setModal2FA(true)
      } else {
        setModal2FA(false)
      }

    }
  }

  const handleResetEmail = () => {
    setModalResetEmail(true)
  }

  const handleCloseModal = () => {
    setResetEmailFinish(false)
    setModalResetEmail(false)
  }


  useEffect(() => {
    if (errorState?.forgetStatus === 'SUCCESS') {
      setResetEmailFinish(true)
      setModalResetEmail(false)
    } else if (errorState?.forgetStatus === 'FAILED') {
      setResetEmailFinish(false)
      setModalResetEmail(true)
    }
  }, [errorState])

  return (
    <Box
      component='div'
      className={classes.root}
    >
      <Container
        maxWidth='sm'
        className={classes.child}
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
            sx={{
              marginTop: '-70px'
            }}
          >
            <img
              src='/images/Logo_Setneg_White.svg'
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
            {
              errorState?.error?.code > 400 && (
                <Alert
                  severity='error'
                  sx={{
                    marginBottom: '20px'
                  }}
                >
                  {errorState?.error?.message}
                </Alert>
              )
            }
          </Grid>
          <Grid
            item
            sx={{
              marginTop: {
                xs: '10px',
                sm: '10px'
              }
            }}
          >
            <LoginFormComponent
              values={values}
              errors={errors}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              handleResetEmail={handleResetEmail}
              stateLoading={errorState}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
            />
          </Grid>
          <Grid
            item
            sx={{
              marginTop: {
                xl: errorState?.error ? '130px' : '140px',
                lg: errorState?.error ? '130px' : '140px',
                md: errorState?.error ? '100px' : '140px',
                sm: errorState?.erorr ? '100px' : '200px',
                xs: errorState?.error ? '60px' : '140px'
              }
            }}
          >
            <Footer
              sx={{
                color: '#fff'
              }}
            />
          </Grid>
        </Grid>
        {/* Modal Reset email */}
        <LoginModal
          openModal={modalResetEmail}
          finishModal={modalResetEmailFinish}
          setResetEmail={setModalResetEmail}
          forgetPassword={forgetPassword}
          handleCloseModal={handleCloseModal}
        />
        {/* End Modal Reset Email */}
        {/* Start Modal OTP */}
        <Login2FAModal
          qrCode={errorState?.qrCode}
          authentication={authentication}
          value={values}
          modal={modal2FA}
          setModal={setModal2FA}
          errorState={errorState}
        />
        {/* End Modal OTP */}
      </Container>
    </Box >
  )
}

LoginComponent.propTypes = {
  authentication: PropTypes.func,
  forgetPassword: PropTypes.func,
  qrCode: PropTypes.func
}

export default LoginComponent