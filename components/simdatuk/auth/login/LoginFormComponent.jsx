/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Form } from '@/components/shared/index'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ResetPasswordModal from './ResetPasswordModal'
import MyButton from '../../button/Button'
import InputComponent from '../InputComponent/InputComponent'
import AlertModal from '../../alert/AlertModal'

const validationSchema = Yup.object({
  username: Yup.string().required('Username tidak boleh kosong'),
  password: Yup.string().required('Password tidak boleh kosong').min(8, 'Minimal 8 Karakter')
})

function LoginFormComponent() {
  const [open, setOpen] = React.useState(false) // Persiapan buat open Modal
  const [emailData, setEmailData] = React.useState(false) // Ambil data dari forgot password component

  const handleForgot = (value) => {
    setEmailData(value) // Set email data ke state
  }

  const handleLogin = (values) => {
    console.log(values)
  }

  console.log(emailData)

  return (
    <Box
      borderRadius='12px'
      p='20px'
      sx={{
        height: '100%',
        backgroundColor: '#fff',
        width: {
          xs: '100%',
          md: '80%',
          lg: '60%'
        }
      }}
    >
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              direction='column'
              spacing={3}
              px={1}
            >
              <Grid item>
                <Typography
                  variant='h5'
                  component='h6'
                  fontWeight='700'
                  pb='8px'
                  sx={{
                    color: '#895700'
                  }}
                >
                  Login
                </Typography>
              </Grid>

              {/* Input Username Component */}
              <Grid item>
                <InputComponent
                  blur={handleBlur}
                  change={handleChange}
                  values={values.username}
                  textLabel='Username'
                  name='username'
                  errors={errors.username}
                  placeholder='Masukkan Username'
                  type='text'
                />
                {/* Input Username Component */}


              </Grid>
              {/* Input Password Component */}
              <Grid item>
                <InputComponent
                  blur={handleBlur}
                  change={handleChange}
                  values={values.password}
                  textLabel='Password'
                  name='password'
                  type='password'
                  errors={errors.password}
                  placeholder='Masukkan Password'
                />
              </Grid>
              {/* End Input Password Component */}

              {/* Reset Password Modal */}
              <ResetPasswordModal userEmail={handleForgot} />
              {/* End Reset Password Modal */}

              {/* Alert Modal */}
              <AlertModal openModal={open} buttonTeks='Tutup'>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
                    Email sudah dikirim
                  </Typography>
                  <Typography
                    id='keep-mounted-modal-description'
                    sx={{
                      mb: 2,
                      fontSize: '12px'
                    }}>
                    Silahkan cek email anda untuk tahap proses pergantian password yang baru.
                  </Typography>
                </Box>
              </AlertModal>
              {/* End Alert Modal */}
              <Grid item>
                <MyButton text='Login' />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

LoginFormComponent.propTypes = {
  handleLogin: PropTypes.func
}


export default LoginFormComponent
