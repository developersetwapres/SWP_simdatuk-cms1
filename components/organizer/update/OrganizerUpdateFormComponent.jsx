/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { ButtonUpload, Input } from '@/components/shared'

function OrganizerUpdateFormComponent({
  values,
  errors,
  image,
  handleInputChange = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <p style={{
          marginBottom: '8px'
        }}>Image</p>
        {
          image && (
            <img
              src={image}
              alt='image'
              style={{
                width: '240px',
                objectFit: 'cover'
              }}
            />
          )
        }
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <ButtonUpload
            text='Choose File'
            name='image'
            value={values.image}
            onChange={handleInputChange}
          />
          <p style={{
            paddingLeft: '20px',
            fontWeight: '400',
            fontSize: '14px'
          }}>{values?.image?.name || 'No File Choosen'}</p>
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
          name='nameOrganizer'
          label='Nama Penyelenggara'
          value={values.nameOrganizer}
          onChange={handleInputChange}
          error={errors.nameOrganizer}
          placeholder='Masukan Nama Penyelenggara'
        />
      </Grid>
      <Grid
        item
      >
        <Input
          fullWidth
          name='url'
          label='Link Register'
          value={values.url}
          error={errors.url}
          onChange={handleInputChange}
          placeholder='Masukan Link Register'
        />
      </Grid>
    </Grid>
  )
}

OrganizerUpdateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  image: PropTypes.string,
  handleInputChange: PropTypes.func
}

export default OrganizerUpdateFormComponent