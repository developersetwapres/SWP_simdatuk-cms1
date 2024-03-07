/* eslint-disable no-unused-vars */
import React, { useState, useSelector } from 'react'
import {
  Grid, Box, Container
} from '@mui/material'
import PropTypes from 'prop-types'
import LoginContentText from '../simdatuk/auth/login/LoginContentText'
import LoginModal from './LoginModal'
import Image from 'next/image'
import authHero from '/public/simdatuk/authHero.png'
import LoginFormComponent from './LoginFormComponent'
import { useForm } from '@/hooks/index'
// import { setStorages, getStorage } from '@/utils/storage'

const LoginComponent = ({
  authentication = () => { },
  forgetPassword = () => { }
}) => {

  const errorState = ''
  // const rememberMeState = getStorage('remember_setneg') ? JSON.parse(getStorage('remember_setneg')) : null


  const [initialValues, setInitialValues] = useState({
    // username: rememberMeState?.username === '' ? '' : rememberMeState?.username,
    // password: rememberMeState?.password === '' ? '' : rememberMeState?.password
    username: '',
    password: ''
  })

  // const [rememberMe, setRememberMe] = useState(rememberMeState?.isRemember || false)

  const [modalResetEmail, setModalResetEmail] = useState(false)
  const [modalResetEmailFinish, setResetEmailFinish] = useState(false)
  const [modal2FA, setModal2FA] = useState(false)


  // const classes = useStyles()

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('username' in fieldOfValues) {
      temp.username = fieldOfValues.username
        ? ''
        : 'username tidak boleh kosong'
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


  console.log('values', values)
  const handleLogin = (e) => {
    e.preventDefault()
    if (validate()) {
      const payload = {
        username: values.username,
        password: values.password
      }
      // if (rememberMe === true) {
      //   setStorages([
      //     {
      //       name: 'remember_setneg',
      //       value: JSON.stringify({
      //         username: values.username,
      //         password: values.password,
      //         isRemember: true
      //       })
      //     }
      //   ])
      // }
      //    else {
      //   localStorage.removeItem('remember_setneg')
      // }
      authentication(payload)
      // qrCode(payload)

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
              <LoginFormComponent
                values={values}
                errors={errors}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
                handleResetEmail={handleResetEmail}
                stateLoading={errorState}
              // rememberMe={rememberMe}
              // setRememberMe={setRememberMe}
              />
              {/* End Form Component */}

              {/* Modal Reset email */}
              <LoginModal
                openModal={modalResetEmail}
                finishModal={modalResetEmailFinish}
                setResetEmail={setModalResetEmail}
                forgetPassword={forgetPassword}
                handleCloseModal={handleCloseModal}
              />
              {/* End Modal Reset Email */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box >
  )
}

LoginComponent.propTypes = {
  authentication: PropTypes.func,
  forgetPassword: PropTypes.func
}

export default LoginComponent


