/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Button, Input, Modal } from '../shared'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { primaryButtonStyle } from '@/utils/theme'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import { formatEmail } from '@/utils/'

const useStyles = (makeStyles({
  modal: {
    display: 'block',
    padding: '0'
  },
  iconClose: {
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  fontBold: {
    fontWeight: '600',
    padding: '0',
    margin: '0'
  }
}))

function LoginModal({
  openModal,
  finishModal,
  setResetEmail = () => { },
  forgetPassword = () => { },
  handleCloseModal = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    resetEmail: ''
  })

  const classes = useStyles()

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('resetEmail' in fieldOfValues)
      temp.resetEmail = fieldOfValues.resetEmail
        ? (
          formatEmail(fieldOfValues.resetEmail)
            ? ''
            : 'Email tidak sesuai'
        )
        : 'Email tidak boleh kosong'

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

  const handleSuccessReset = () => {
    if (validate()) {
      // setEmailSentModal(true)
      // setResetEmail(false)
      const payload = {
        email: values.resetEmail
      }
      forgetPassword(payload)
    }
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          setResetEmail(false)
          window.location.reload()
        }}
        sx={{
          '.MuiBackdrop-root': {
            background: 'rgba(0, 0, 0, 0.5)'
          }
          // margin: '0 25px'
        }}
        width='500px'
      >
        <div className={classes.modal}>
          <CloseIcon
            onClick={() => {
              setResetEmail(false)
              setErrors('')
              window.location.reload()
            }}
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
          <div>
            {/* <img
              src='/images/logo_setneg.svg'
              alt='logo'
              style={{
                width: '100%',
                maxWidth: '460px',
                margin: '0 auto',
                display: 'block'
              }}
            /> */}
            <div style={{
              textAlign: 'center'
            }}>
              <h3>Lupa Password ?</h3>
              <p>Kami akan mengirim instruksi melalui email untuk mengganti password. Silakan masukkan password anda.</p>
            </div>
            <div style={{
              marginTop: '40px'
            }}>

              <Input
                label='Email'
                classesLabel={classes.fontBold}
                placeholder='Masukan Email Anda'
                fullWidth
                name='resetEmail'
                value={values.resetEmail}
                error={errors.resetEmail}
                onChange={handleInputChange}
              />
            </div>
            <div style={{
              marginTop: '30px'
            }}>
              <Button
                text='Kirim'
                color='primary'
                fullWidth
                type='submit'
                sx={{
                  ...primaryButtonStyle,
                  textTransform: 'none'
                }}
                onClick={handleSuccessReset}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/* Show Modal email sent */}
      <Modal
        open={finishModal}
        onClose={handleCloseModal}
        sx={{
          '.MuiBackdrop-root': {
            background: 'rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <div className={classes.modal}>
          <CloseIcon
            onClick={handleCloseModal}
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
          <div>
            <div style={{
              marginTop: '40px',
              textAlign: 'center'
            }}>
              <h3>Email sudah dikirim</h3>
              <p>Silahkan cek email anda untuk tahap proses pergantian password yang baru.</p>
            </div>
            <Button
              text='Tutup'
              color='primary'
              fullWidth
              type='submit'
              sx={{
                ...primaryButtonStyle,
                textTransform: 'none'
              }}
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

LoginModal.propTypes = {
  openModal: PropTypes.bool,
  finishModal: PropTypes.bool,
  setResetEmail: PropTypes.func,
  forgetPassword: PropTypes.func,
  handleCloseModal: PropTypes.func
}

export default LoginModal