import { primaryButtonStyle } from '@/utils/theme'
import { Grid } from '@mui/material'
import React from 'react'
import { Button, Input } from '../shared'
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
    <Grid
      item
      xl={9}
      lg={9}
      md={12}
      sm={12}
      xs={12}
    >
      <h3>Data Diri</h3>
      <Grid
        container
        direction='column'
      >
        <Grid
          item
          sx={{
            marginBottom: '12px'
          }}
        >
          <Input
            label='NIP'
            disabled
            fullWidth
            value={parseProfile?.nip ?? '-'}
            sx={{
              backgroundColor: '#EDEDED !important'
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: '12px'
          }}
        >
          <Input
            label='Nama'
            disabled
            fullWidth
            value={parseProfile?.name ?? '-'}
            sx={{
              backgroundColor: '#EDEDED !important'
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: '12px'
          }}
        >
          <Input
            label='Jabatan'
            placeholder='Pilih Jabatan'
            disabled
            fullWidth
            sx={{
              backgroundColor: '#EDEDED !important'
            }}
            value={parseProfile.position === null ? '-' : parseProfile.position.name}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: '12px'
          }}
        >
          <Input
            disabled
            fullWidth
            label='Unit Kerja/Satuan Organisasi'
            placeholder='Pilih Unit Kerja/Satuan Organisasi'
            sx={{
              backgroundColor: '#EDEDED !important'
            }}
            value={parseProfile.unit === null ? '-' : parseProfile.unit.name}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: '12px'
          }}
        >
          <Input
            label='Pangkat/Golongan'
            placeholder='Pilih Pangkat/Golongan'
            disabled
            fullWidth
            sx={{
              backgroundColor: '#EDEDED !important'
            }}
            value={parseProfile.level === null ? '-' : parseProfile.level.name}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '12px'
          }}
        >
          <Input
            label='Email'
            fullWidth
            name='email'
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: '20px'
          }}
        >
          <Button
            text='Submit'
            sx={{
              textTransform: 'none',
              ...primaryButtonStyle
            }}
            onClick={handleSubmit}
            isBusy={loadingState.isBusy}
            isLoading={loadingState.loadingProfile}
            color='warning'
          />
        </Grid>
      </Grid>
    </Grid>
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