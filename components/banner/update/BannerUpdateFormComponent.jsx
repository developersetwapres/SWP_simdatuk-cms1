/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Box, Grid } from '@mui/material'
import { Input, ButtonUpload, Checkbox, Select, Autocomplete } from '@/components/shared'
import EditorForm from '@/components/shared/form/editor/EditorForm'
import PropTypes from 'prop-types'

function BannerUpdateFormComponent({
  values,
  errors,
  status,
  editor,
  imageBanner,
  commandCourse,
  customError,
  setEditor = () => { },
  handleInputChange = () => { },
  handleStatus = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          label='Nama Banner'
          fullWidth
          value={values.nameBanner}
          error={errors?.nameBanner}
          onChange={handleInputChange}
          name='nameBanner'
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '-10px'
        }}
      >
        <p style={{
          marginBottom: imageBanner ? '16px' : '0px'
        }}>Image</p>
        <img
          src={imageBanner || '/images/default-image.png'}
          alt='image'
          style={{
            width: '600px',
            height: '150px',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ButtonUpload
            text='Choose File'
            name='image'
            onChange={handleInputChange}
            value={values.image}
            error={values.image}
          />
          <p style={{
            paddingLeft: '20px'
          }}>{values.image.name || 'No File Choosen'}</p>
        </Box>
        <div
          style={{
            color: '#444444',
            fontWeight: '400',
            fontSize: '14px'
          }}
        >
          <p style={{ marginBottom: '-10px' }}>Format File : .png, .jpg</p>
          <p style={{ marginBottom: '-10px' }}>Maksimum Size : 2 MB</p>
          <p style={{ marginBottom: '-10px' }}>Dimensi 1216 px x 304 px</p>
        </div>
      </Grid>
      {
        errors?.image && (
          <p style={{
            fontSize: '14px',
            color: '#D32F2F',
            fontWeight: '400'
          }}>{errors?.image}</p>
        )
      }
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <p style={{
          marginBottom: '-25px'
        }}>Tipe</p>
        <Select
          options={[
            {
              id: 1, text: 'Pembelajaran'
            },
            {
              id: 2, text: 'Pengumuman'
            },
            {
              id: 3, text: 'Link'
            }
          ]}
          value={values.type}
          onChange={handleInputChange}
          error={errors.type}
          placeholder='Pilih Tipe'
          name='type'
        />
      </Grid>
      {
        values.type === 1 && (
          <>
            <Grid
              item
              sx={{
                marginTop: '20px'
              }}
            >
              <Autocomplete
                label='Pembelajaran'
                placeholder='Pilih Pembelajaran'
                options={commandCourse}
                value={values.course}
                name='course'
                onChange={handleInputChange}
              />
            </Grid>
          </>

        )
      }
      {
        values.type === 2 && (
          <Grid
            item
            sx={{
              marginTop: '20px'
            }}
          >
            <EditorForm
              label='Deskripsi'
              placeholder='Masukan Deskripsi'
              setValue={setEditor}
              value={editor}
            />
            {
              customError?.editorError && (
                <p style={{ color: '#D32F2F', fontSize: '14px' }}>{customError?.editorError}</p>
              )
            }
          </Grid>
        )
      }
      {
        values.type === 3 && (
          <Grid
            item
            sx={{
              marginTop: '20px'
            }}
          >
            <Input
              placeholder='Masukan Link'
              fullWidth
              label='Link'
              name='link'
              error={errors.link}
              value={values.link}
              onChange={handleInputChange}
            />
          </Grid>
        )
      }

      <Grid
        item
        sx={{
          marginTop: '10px'
        }}
      >
        <Checkbox
          label='Publikasi'
          text='Status'
          onChange={handleStatus}
          value={status ? true : false}
          color='warning'
        />
      </Grid>
    </Grid>
  )
}

BannerUpdateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  commandCourse: PropTypes.array,
  editor: PropTypes.any,
  setEditor: PropTypes.func,
  customError: PropTypes.object,
  imageBanner: PropTypes.string,
  status: PropTypes.bool,
  handleInputChange: PropTypes.func,
  handleStatus: PropTypes.func
}

export default BannerUpdateFormComponent