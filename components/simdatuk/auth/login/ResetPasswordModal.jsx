/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, Modal, Grid, Typography, Stack } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'
import InputComponent from '../InputComponent/InputComponent'
import { Form } from '@/components/shared/index'
import Button from '../../button/Button'

// Validasi Input
const validationSchema = Yup.object({
  email: Yup.string().required('Email tidak boleh kosong').email('Email tidak valid')
})
// End Validasi Input


const style = {
  openButton: {
    alignSelf: 'flex-end',
    marginTop: '15px',
    color: '#895700',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modalParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  boxContainer: {
    position: 'relative',
    width: {
      xs: '70%',
      sm: '50%',
      md: '35%'
    },
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: 0,
    px: 5,
    py: 4
  }
}

export default function ResetPasswordModal({
  userEmail
}) {
  const [emailValue, setEmailValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setEmailValue('')
  }

  // Send email to parent component
  const sendEmail = (values) => {
    if (values) {
      userEmail(values)
    }
  }
  // End Send email to parent component



  return (
    <>
      <div
        onClick={handleOpen}
        style={style.openButton}
      >
        Lupa Password
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        sx={style.modalParent}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Box container sx={style.boxContainer} spacing={5}>
          <CloseIcon
            onClick={handleClose}
            widht={5}
            color='simdatukPrimary'
            sx={{
              position: 'absolute',
              p: '2px',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '50%'
              }
            }}
          />
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
              Lupa Password?
            </Typography>
            <Typography
              id='keep-mounted-modal-description'
              sx={{
                mb: 2,
                fontSize: '14px'
              }}>
              Kami akan mengirim instruksi melalui email untuk mengganti password. Silakan masukkan email anda.
            </Typography>
          </Box>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={validationSchema}
            onSubmit={sendEmail}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Grid
                    container
                    direction='column'
                    spacing={3}
                    px={1}
                  >
                    <Grid item>
                      <InputComponent
                        blur={handleBlur}
                        change={(e) => {
                          setEmailValue(e.target.value)
                          handleChange(e)
                        }}
                        values={emailValue}
                        textLabel='Email'
                        name='email'
                        errors={errors.email}
                        placeholder='Masukkan Email'
                        type='text'
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        text='Kirim'
                      />
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </Modal >
    </>
  )
}


ResetPasswordModal.propTypes = {
  userEmail: PropTypes.func.isRequired
}