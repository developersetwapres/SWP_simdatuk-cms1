import React from 'react'
import { Grid } from '@mui/material'
import { ButtonUpload, Input } from '@/components/shared'
import PropTypes from 'prop-types'

function OrganizerCreateFormComponent({
  values,
  errors,
  handleInputChange = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        sx={{
          marginBottom: '10px'
        }}
      >
        <p style={{
          marginBottom: '8px'
        }}>Image</p>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <ButtonUpload
            text='Choose File'
            name='image'
            error={errors.image}
            value={values.image}
            onChange={handleInputChange}
          />
          <p style={{
            paddingLeft: '20px',
            fontWeight: '400',
            fontSize: '14px'
          }}>{values.image.name || 'No File Choosen'}</p>
        </div>
        <div style={{
          fontSize: '14px',
          color: '#444444'
        }}>
          <p>Format File : .png, .jpg</p>
          <p style={{ marginTop: '-15px' }}>Maksimum Size : 2 MB</p>
          <p style={{ marginTop: '-15px' }}>Dimensi : 200 px x 80 px</p>
        </div>
        {
          errors?.image && (
            <p style={{
              fontSize: '14px',
              color: '#D32F2F',
              fontWeight: '400'
            }}>{errors?.image}</p>
          )
        }
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          fullWidth
          label='Nama Penyelenggara'
          name='nameOrganizer'
          error={errors.nameOrganizer}
          value={values.nameOrganizer}
          onChange={handleInputChange}
          placeholder='Masukan Nama Penyelenggara'
        />
      </Grid>
      <Grid
        item
      >
        <Input
          fullWidth
          label='Link Register'
          placeholder='Masukan Link Register'
          name='url'
          value={values.url}
          onChange={handleInputChange}
          error={errors?.url}
        />
      </Grid>
    </Grid>
  )
}

OrganizerCreateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleInputChange: PropTypes.func
}

export default OrganizerCreateFormComponent