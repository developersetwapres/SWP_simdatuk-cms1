import { Grid, Box, Typography } from '@mui/material'
import React from 'react'
import { Input, Button } from '../shared'
import InputPassword from '../shared/form/InputPassword'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function ProfileForm({
  values,
  errors,
  setFieldValue,
  handleSubmit,
  formikRef
}) {
  const handleInputChange = e => {
    setFieldValue([e?.target?.name], e?.target?.value, false)
    setTimeout(() => {
      formikRef.current.validateField(e?.target?.name)
    }, 1)
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <Input
            label='Nama'
            placeholder='Masukkan Nama'
            name='name'
            value={values?.name}
            error={errors?.name}
            onChange={handleInputChange}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='NIP/NRP'
            placeholder='Masukkan NIP/NRP'
            name='registration_number'
            value={values?.registration_number}
            error={errors?.registration_number}
            onChange={handleInputChange}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Role Pengguna'
            placeholder='Masukkan Role Pengguna'
            name='role_name'
            value={values?.role_name}
            error={errors?.role_name}
            onChange={handleInputChange}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Email'
            placeholder='Masukkan Email'
            name='email'
            value={values?.email}
            error={errors?.email}
            onChange={handleInputChange}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Username *'
            placeholder='Masukkan Username'
            name='username'
            value={values?.username}
            error={errors?.username}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Typography fontWeight={700} fontSize={20} sx={{ marginTop: 3 }}>Data Profil</Typography>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <InputPassword
            label='Password Lama'
            placeholder='Masukkan Password Lama'
            name='old_password'
            value={values?.old_password}
            error={errors?.old_password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputPassword
            label='Password Baru'
            placeholder='Masukkan Password Baru'
            name='password'
            value={values?.password}
            error={errors?.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <InputPassword
            label='Konfirmasi Password'
            placeholder='Masukkan Konfirmasi Password'
            name='confirm_password'
            value={values?.confirm_password}
            error={errors?.confirm_password}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'right' }}>
        <Button
          color='primary'
          text='Simpan'
          sx={{
            ...primaryButtonStyle,
            textTransform: 'none',
            marginTop: '36px'
          }}
          onClick={handleSubmit}
          isBusy={false}
          isLoading={false}
        />
      </Box>
    </>
  )
}

ProfileForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  formikRef: PropTypes.any
}

export default ProfileForm