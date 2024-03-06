/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Input, Modal } from '../shared'
import { makeStyles } from '@mui/styles'
import { CLOSE_ICON } from '@/utils/iconConstant'
import { Alert, Box } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { primaryButtonStyle } from '@/utils/theme'
import { useForm } from '@/hooks/index'

const useStyles = makeStyles({
  modal: {
    display: 'block',
    margin: '0 auto'
  },
  iconClose: {
    cursor: 'pointer',
    position: 'absolute',
    top: '40px',
    right: '30px'
  },
  tutorialContent: {
    color: '#444444',
    fontWeight: '400'
    // fontSize: '14px'
  }
})

function Login2FAModal({
  qrCode,
  modal,
  value,
  errorState,
  setModal = () => { },
  authentication = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    codeVerif: ''
  })

  const [type, setType] = useState({
    verif: true,
    tutorial: false
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('codeVerif' in fieldOfValues)
      temp.codeVerif = fieldOfValues.codeVerif
        ? ''
        : 'Kode Verifikasi tidak boleh kosong'

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

  const handleSubmit = () => {
    const payload = {
      nip: value.nip,
      password: value.password,
      two_factor_auth_code: values.codeVerif
    }
    authentication(payload)
  }

  const classes = useStyles()
  return (

    <Modal
      open={qrCode?.status === 200 ? modal : false}
      onClose={() => {
        setModal(false)
        window.location.reload()
      }}
      padding='2.5rem 2rem'
    >
      <div className={classes.modal}>
        <Icon
          path={CLOSE_ICON}
          maxWidth={20}
          classes={classes.iconClose}
          onClick={() => {
            setModal(false)
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
          {
            type.verif === true && (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Alert
                    severity='warning'
                    icon={<PersonIcon sx={{ color: '#A9630F' }} />}
                    sx={{
                      marginTop: '20px',
                      marginBottom: '20px',
                      width: '307px',
                      color: '#A9630F'
                    }}
                  >
                    {qrCode?.nip}
                  </Alert>
                </div>
                <div>
                  <h2 style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '500',
                    margin: 0
                  }}>Masukan kode verifikasi</h2>
                  <p style={{
                    margin: 0
                  }}>
                    Masukkan 6 digit kode verifikasi yang ada pada layar Aplikasi Google Authenticator.
                  </p>
                  <Input
                    fullWidth
                    placeholder='Masukan Kode Verifikasi'
                    name='codeVerif'
                    value={values.codeVerif}
                    error={errors.codeVerif || errorState?.error?.message}
                    onChange={handleInputChange}
                  />
                  <Button
                    color='warning'
                    text='Verifikasi'
                    sx={{
                      ...primaryButtonStyle,
                      textTransform: 'none',
                      width: '400px',
                      display: 'block',
                      margin: '24px auto'
                    }}
                    onClick={handleSubmit}
                    isBusy={errorState?.isBusy}
                    isLoading={errorState?.loading}
                  />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  <p>
                    Belum menautkan akun Google Authenticator?
                    <span
                      style={{
                        color: '#FE9516',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginLeft: '5px'
                      }}
                      onClick={() => {
                        setType({ verif: false, tutorial: true })
                      }}
                    >
                      Klik Disini
                    </span>
                  </p>
                </div>
              </>
            )
          }
          {
            type.tutorial === true && (
              <>
                <h2 style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '500'
                  // margin: 0
                }}>Tautkan Google Authenticator</h2>
                <Box
                  component='div'
                  className={classes.tutorialContent}
                >
                  <p>Cara menautkan Google Authenticator</p>
                  <ol style={{
                    margin: 0,
                    padding: '0 20px'
                  }}>
                    <li>Download aplikasi Google Authenticator di Handphone anda.</li>
                    <li>Scan QR Code dibawah ini</li>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={qrCode?.image}
                        alt='qrCode'
                        style={{
                          width: '100px'
                        }}
                      />
                    </div>
                    <li>Masukkan 6 digit kode verifikasi yang ada pada layar Aplikasi Google Authenticator.</li>
                  </ol>
                </Box>
                <Button
                  color='warning'
                  text='Masukkan Kode Verifikasi Sekarang'
                  sx={{
                    ...primaryButtonStyle,
                    textTransform: 'none',
                    width: '400px',
                    display: 'block',
                    margin: '24px auto'
                  }}
                  onClick={() => {
                    setType({
                      verif: true,
                      tutorial: false
                    })
                  }}
                />
              </>
            )
          }
        </div>
      </div>
    </Modal>
  )
}

Login2FAModal.propTypes = {
  qrCode: PropTypes.object,
  modal: PropTypes.bool,
  value: PropTypes.object,
  errorState: PropTypes.object,
  setModal: PropTypes.func,
  authentication: PropTypes.func
}

export default Login2FAModal