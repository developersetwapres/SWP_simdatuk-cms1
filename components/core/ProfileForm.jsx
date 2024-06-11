import { Grid, Box, Typography } from '@mui/material'
import React from 'react'
import { Input, Button } from '../shared'
import InputPassword from '../shared/form/InputPassword'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function ProfileForm({
  values,
  errors,
  parseProfile,
  loadingState,
  handleInputChange = () => { },
  handleSubmit = () => { }
}) {
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <Input
            label='Nama'
            placeholder='Masukkan Nama'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='NIP/NRP'
            placeholder='Masukkan NIP/NRP'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Role Pengguna'
            placeholder='Masukkan Role Pengguna'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Email'
            placeholder='Masukkan Email'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Username *'
            placeholder='Masukkan Username'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
      </Grid>

      <Typography fontWeight={700} fontSize={20} sx={{ marginTop: 3 }}>Data Profil</Typography>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={6}>
          <InputPassword
            label='Password Lama'
            placeholder='Masukkan Password Lama'
            name='name'
            value={'AAA'}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <InputPassword
            label='Password Baru'
            placeholder='Masukkan Password Baru'
            name='name'
            value={'AAA'}
            onChange={(val) => console.log(val)}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <InputPassword
            label='Konfirmasi Password'
            placeholder='Masukkan Konfirmasi Password'
            name='name'
            value={'AAA'}
            onChange={(val) => console.log(val)}
            disabled
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
          onClick={() => { }}
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
  parseProfile: PropTypes.object,
  loadingState: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default ProfileForm