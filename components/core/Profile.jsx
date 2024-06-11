/* eslint-disable @next/next/no-img-element */
import { Paper, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from '@/hooks/'
import { getFileExtension } from '@/utils/'
import PropTypes from 'prop-types'
import ProfileForm from './ProfileForm'
import { formatEmail } from '@/utils/index'
import { decryptItem } from '@/utils/crypt'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  profile: {
    marginTop: '12px'
  }
})

function Profile({
  // eslint-disable-next-line no-unused-vars
  command,
  authentication,
  updateProfile = () => { }
}) {
  const classes = useStyles()
  const parseProfile = decryptItem('_setneg_user', 'my-info') !== null ? decryptItem('_setneg_user', 'my-info') : ''

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
    if (authentication.loadingProfile === false) {
      setFinishModal(true)
    } else if (authentication.loadingProfile === true) {
      setFinishModal(false)
    }
  }, [authentication])

  return (
    <>
      <Typography fontWeight={700}>Edit Profil</Typography>
      <Paper sx={{ marginTop: 1, padding: '20px 24px' }}>
        <Typography fontWeight={700} fontSize={20}>Data Profil</Typography>
        <Typography fontWeight={500} fontSize={14} sx={{ margin: '12px 0 8px 0' }}>Foto Profil</Typography>
        <Image
          src='/simdatuk/imagePegawai.png'
          width={110}
          height={150}
          alt='Pegawai'
          className={classes.profile}
        />
        <ProfileForm />
      </Paper>
    </>
  )
}

Profile.propTypes = {
  command: PropTypes.object,
  updateProfile: PropTypes.func,
  authentication: PropTypes.object
}

export default Profile