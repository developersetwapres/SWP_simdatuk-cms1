/* eslint-disable @next/next/no-img-element */
import { Box, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { makeStyles } from '@mui/styles'
import { PENCIL_WHITE_ICON } from '@/utils/iconConstant'
import { Button, Icon, Modal } from '../shared'
import { useForm } from '@/hooks/'
import { getFileExtension } from '@/utils/'
import PropTypes from 'prop-types'
import ProfileForm from './ProfileForm'
// import { getStorage } from '@/utils/storage'
import { primaryButtonStyle } from '@/utils/theme'
import { formatEmail } from '@/utils/index'
import { decryptItem } from '@/utils/crypt'

const useStyles = makeStyles({
  image: {
    width: '100%',
    maxWidth: '160px',
    height: '160px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  fileUpload: {
    display: 'none'
  },
  fileUploadBackground: {
    background: 'linear-gradient(0deg, rgba(47, 47, 47, 0.5), rgba(47, 47, 47, 0.5))',
    height: '160px',
    width: '100%',
    maxWidth: '160px',
    position: 'absolute',
    top: '0',
    borderRadius: '50%'
  },
  fileUploadText: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: '500',
    position: 'absolute',
    top: '30%',
    left: '25%'
  },
  iconUpload: {
    marginRight: '3px'
  }
})

function Profile({
  // eslint-disable-next-line no-unused-vars
  command,
  authentication,
  updateProfile = () => { }
}) {
  const classes = useStyles()
  // const profile = getStorage('_setneg_user')
  const parseProfile = decryptItem('_setneg_user', 'my-info') !== null ? decryptItem('_setneg_user', 'my-info') : ''
  const [finishModal, setFinishModal] = useState(false)


  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    email: parseProfile?.email === null ? '' : parseProfile?.email,
    image: []
  })


  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('email' in fieldOfValues)
      temp.email = fieldOfValues.email === ''
        ? ''
        : (
          formatEmail(fieldOfValues.email) === false
            ? 'Format Email yang Anda Masukan Tidak Sesuai'
            : ''
        )

    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? ''
        : (
          extImage !== 'png' && extImage !== 'jpg'
            ? 'Gambar harus berupa file gambar dengan format .png atau .jpg'
            : (
              fieldOfValues.image.size > 2097152
                ? 'Gambar tidak boleh lebih dari 2 MB'
                : ''
            )
        )
    }

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    setErrors,
    errors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const convertParams = (name, value) => {
    const reader = new FileReader()
    reader.readAsDataURL(value || '')

    const obj = {
      target: {
        name, value
      }
    }

    return obj
  }

  const handleSubmit = () => {
    if (validate()) {
      const payload = new FormData()
      payload.append('email', values.email)
      payload.append('photo', values.image)
      updateProfile(payload)
    }
  }

  useEffect(() => {
    setFinishModal(false)
    if (authentication.loadingProfile === false) {
      setFinishModal(true)
    } else if (authentication.loadingProfile === true) {
      setFinishModal(false)
    }
  }, [authentication])

  useEffect(() => {
    setFinishModal(false)
  }, [])

  return (
    <Layout>
      <Grid
        container
        direction='row'
      >
        <Grid
          item
          xl={3}
          lg={3}
          md={12}
          sm={12}
          xs={12}
        >
          <Box sx={{
            position: 'relative',
            display: {
              xs: '-webkit-box',
              sm: '-webkit-box',
              md: '-webkit-box',
              lg: '-webkit-box',
              xl: '-webkit-box'
            },
            WebkitBoxAlign: {
              xs: 'center',
              sm: 'center',
              md: 'unset',
              lg: 'unset',
              xl: 'unset'
            },
            WebkitBoxPack: {
              xs: 'center',
              sm: 'center',
              md: 'unset',
              lg: 'unset',
              xl: 'unset'
            }
          }} >
            <img
              src={parseProfile.photo}
              alt='profile'
              className={classes.image}
            />
            <div className={classes.fileUploadBackground} >
              <input
                id='input-file'
                type='file'
                className={classes.fileUpload}
                onChange={(e) => handleInputChange(
                  convertParams('image', e.target.files[0])
                )}
                name='image'
                accept='image/*'
              />
              <label htmlFor='input-file' className={classes.fileUploadText}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Icon
                    path={PENCIL_WHITE_ICON}
                    maxWidth={20}
                    classes={classes.iconUpload}
                  />
                  <p>Edit</p>
                </div>
              </label>
            </div>
          </Box>
          <Box
            sx={{
              color: '#444444',
              fontWeight: '400',
              fontSize: '14px',
              textAlign: {
                xs: 'center',
                sm: 'center',
                md: 'left',
                lg: 'left',
                xl: 'left'
              }
            }}
          >
            <p style={{ marginBottom: '-10px' }}>Format File : .png, .jpg</p>
            <p style={{ marginBottom: '-10px' }}>Maksimum Size : 2 MB</p>
            <p style={{ marginBottom: '-10px' }}>Dimensi 240 px x 240 px</p>
            {
              errors?.image && (
                <p style={{
                  color: '#D32F2F',
                  marginTop: '20px'
                  // fontSize: '16px'
                }}>{errors?.image}</p>
              )
            }
          </Box>
        </Grid>
        <ProfileForm
          values={values}
          errors={errors}
          handleInputChange={handleInputChange}
          parseProfile={parseProfile}
          loadingState={authentication}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Modal
        open={finishModal}
        padding='3rem 0'
        onClose={() => {
          setFinishModal(false)
          window.location.reload()
        }}
        width='600px'
      >
        <img
          src={authentication.icon}
          alt='success'
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '128px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          {authentication.message}
        </h2>
        <p style={{ textAlign: 'center' }}>{authentication.error}</p>
        <div style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
          textAlign: 'center'
        }}>
          <Button
            text='Tutup'
            type='button'
            color='warning'
            sx={{
              padding: '12px',
              width: '540px',
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            isLoading={authentication.loadingProfile}
            isBusy={authentication.loadingProfile}
            onClick={() => {
              setFinishModal(false)
              window.location.reload()
            }}
          />
        </div>
      </Modal>
    </Layout>
  )
}

Profile.propTypes = {
  command: PropTypes.object,
  updateProfile: PropTypes.func,
  authentication: PropTypes.object
}

export default Profile