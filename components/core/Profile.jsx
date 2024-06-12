/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Paper, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import ProfileForm from './ProfileForm'
import { makeStyles } from '@mui/styles'
import * as Yup from 'yup'

const useStyles = makeStyles({
  profile: {
    marginTop: '12px'
  }
})

const initialValues = {
  name: '',
  registration_number: 0,
  role_name: '',
  email: '',
  username: '',
  old_password: '',
  password: '',
  confirm_password: ''
}

const FormSchema = Yup.object().shape({
  name: Yup.string().notRequired().nullable(),
  registration_number: Yup.number().notRequired().nullable(),
  role_name: Yup.string().notRequired().nullable(),
  email: Yup.string().notRequired().nullable().email('Email tidak valid'),
  username: Yup.string().notRequired().nullable(),
  // Password
  old_password: Yup.string().notRequired().nullable(),
  password: Yup.string().notRequired().nullable(),
  confirm_password: Yup.string().notRequired().nullable()
    .oneOf([Yup.ref('password'), null], 'Konfirmasi Password harus sama dengan Password Baru')
})

function Profile({
  authentication,
  setLoading = () => { },
  updateProfile = () => { }
}) {
  const classes = useStyles()
  const formikRef = useRef(null)
  const [profile, setProfile] = useState(null)

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        name: values?.name,
        registration_number: values?.registration_number,
        role_name: values?.role_name,
        email: values?.email || 'email@email.idaa',
        username: values?.username,
        old_password: values?.old_password,
        password: values?.password,
        confirm_password: values?.confirm_password
      }

      updateProfile(payload)
    } catch (error) {
      if (!error.inner || error.inner.length === 0) return

      const newErrors = {}
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message
        formikRef.current.setFieldError(err.path, err.message)
      })

      const firstErrorField = error.inner[0].path
      const firstErrorEl = document.querySelector(`[name="${firstErrorField}"]`)
      firstErrorEl &&
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  useEffect(() => {
    const userInfo = authentication.userInformation

    formikRef.current?.setFieldValue('name', userInfo?.name, false)
    formikRef.current?.setFieldValue('registration_number', userInfo?.registration_number, false)
    formikRef.current?.setFieldValue('role_name', userInfo?.role_name, false)
    formikRef.current?.setFieldValue('email', userInfo?.email, false)
    formikRef.current?.setFieldValue('username', userInfo?.username, false)
    setProfile(userInfo)
  }, [authentication])

  useEffect(() => {
    const state = authentication?.loading
    setLoading(!state)
  }, [authentication])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <>
          <Typography fontWeight={700}>Edit Profil</Typography>
          <Paper sx={{ marginTop: 1, padding: '20px 24px' }}>
            <Typography fontWeight={700} fontSize={20}>Data Profil</Typography>
            {!!profile?.photo_profile &&
              <>
                <Typography fontWeight={500} fontSize={14} sx={{ margin: '12px 0 8px 0' }}>Foto Profil</Typography>
                <img
                  src={profile?.photo_profile}
                  width={110}
                  height={150}
                  alt='Pegawai'
                  className={classes.profile}
                />
              </>
            }
            <ProfileForm
              {...profile}
              {...formikProps}
              handleSubmit={() => handleSubmit(formikProps?.values)}
              formikRef={formikRef}
            />
          </Paper>
        </>
      )}
    </Formik>
  )
}

Profile.propTypes = {
  updateProfile: PropTypes.func,
  setLoading: PropTypes.func,
  authentication: PropTypes.object
}

export default Profile