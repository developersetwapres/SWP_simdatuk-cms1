/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Button, Icon, Input, Modal } from '../shared'
import PropTypes from 'prop-types'
import { CLOSE_ICON } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import { formatEmail } from '@/utils/'

const useStyles = (makeStyles({
  modal: {
    display: 'block',
    margin: '0 auto'
  },
  iconClose: {
    cursor: 'pointer',
    position: 'absolute',
    top: '40px',
    right: '30px'
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
            background: 'rgba(0, 0, 0, 0.1)'
          },
          margin: '0 25px'
        }}
        width='500px'
      >
        <div className={classes.modal}>
          <Icon
            path={CLOSE_ICON}
            maxWidth={20}
            classes={classes.iconClose}
            onClick={() => {
              setResetEmail(false)
              setErrors('')
              window.location.reload()
            }}
          />
          <div>
            <img
              src='/images/logo_setneg.svg'
              alt='logo'
              style={{
                width: '100%',
                maxWidth: '460px',
                margin: '0 auto',
                display: 'block'
              }}
            />
            <div style={{
              marginTop: '40px'
            }}>
              <h3>Lupa Password ?</h3>
              <p>Kami akan mengirim instruksi melalui email untuk mengganti password. Silakan masukkan password anda.</p>
            </div>
            <div style={{
              marginTop: '40px'
            }}>

              <Input
                label='Email'
                placeholder='Masukan Email Anda'
                fullWidth
                name='resetEmail'
                value={values.resetEmail}
                error={errors.resetEmail}
                onChange={handleInputChange}
              />
            </div>
            <div style={{
              marginTop: '40px'
            }}>
              <Button
                text='Reset Password'
                color='warning'
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
          <Icon
            path={CLOSE_ICON}
            maxWidth={20}
            classes={classes.iconClose}
            onClick={handleCloseModal}
          />
          <div>
            <img
              src='/images/logo_setneg.svg'
              alt='logo'
              style={{
                width: '100%',
                maxWidth: '460px',
                margin: '0 auto',
                display: 'block'
              }}
            />
            <div style={{
              marginTop: '40px'
            }}>
              <h3>Email sudah dikirim</h3>
              <p>Silahkan cek email anda untuk tahap proses pergantian password yang baru.</p>
            </div>
            <p style={{
              textAlign: 'center',
              fontSize: '17px'
            }}>Kembali ke <span style={{ color: '#FE9516', cursor: 'pointer' }} onClick={() => setEmailSentModal(false)}>Login</span></p>
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