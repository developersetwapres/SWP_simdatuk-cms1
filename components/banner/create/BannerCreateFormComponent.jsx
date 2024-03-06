import React from 'react'
import { Grid } from '@mui/material'
import { Input, Checkbox, ButtonUpload, Select, Autocomplete } from '@/components/shared'
import PropTypes from 'prop-types'
import EditorForm from '@/components/shared/form/editor/EditorForm'


function BannerCreateFormComponent({
  values,
  errors,
  editor,
  active,
  customError,
  handleActive = () => { },
  commandCourses,
  setEditor = () => { },
  handleInputChange = () => { }
}) {
  return (
    <Grid
      container
      direction='column'
      sx={{
        marginTop: '20px'
      }}
    >
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          margin: '10px 0'
        }}
      >
        <Input
          label='Nama Banner'
          placeholder='Masukan Nama Banner'
          value={values.nameBanner}
          error={errors.nameBanner}
          onChange={handleInputChange}
          name='nameBanner'
          fullWidth
        />
      </Grid>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          marginTop: '-10px'
        }}
      >
        <p style={{
          marginBottom: '0px'
        }}>Image</p>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <ButtonUpload
            text='Choose File'
            name='image'
            onChange={handleInputChange}
            value={values.image}
            error={errors.image}
          />
          <p style={{
            paddingLeft: '20px',
            color: '#444444',
            fontWeight: '400',
            fontSize: '14px'
          }}>{values.image.name || 'No File Choosen'}</p>
        </div>
        <div style={{
          fontSize: '14px',
          color: '#444444'
        }}>
          <p>Format File: .png, .jpg</p>
          <p style={{ marginTop: '-15px' }}>Maksimum Size: 2 MB</p>
          <p style={{ marginTop: '-15px' }}>Dimensi: 1216 px x 304 px</p>
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
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          margin: '-15px 0'
        }}
      >
        <p>Tipe</p>
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
          sx={{
            marginTop: '-22px'
          }}
        />
      </Grid>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          marginTop: '30px'
        }}
      >
        {
          values.type === 1 ? (
            <Autocomplete
              placeholder='Pilih Pembelajaran'
              options={commandCourses}
              name='course_id'
              value={values.course_id}
              onChange={handleInputChange}
              label='Pembelajaran'
              error={errors.course_id}
            />
          ) : values.type === 2 ? (
            <>
              <EditorForm
                placeholder='Masukan Deskripsi'
                label='Deskripsi'
                setValue={setEditor}
                value={editor}
              />
              {
                customError?.editorError && (
                  <p style={{ color: '#D32F2F', fontSize: '14px' }}>{customError?.editorError}</p>
                )
              }
            </>
          ) : values.type === 3 ? (
            <Input
              placeholder='Masukan Link'
              fullWidth
              label='Link'
              name='link'
              error={errors.link}
              value={values.link}
              onChange={handleInputChange}
            />
          ) : ''
        }
      </Grid>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
      >
        <Checkbox
          text='Status'
          label='Publikasi'
          color='warning'
          name='status'
          value={active}
          onChange={handleActive}
        />
      </Grid>
    </Grid>
  )
}

BannerCreateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  editor: PropTypes.any,
  active: PropTypes.bool,
  customError: PropTypes.object,
  handleActive: PropTypes.func,
  commandCourses: PropTypes.array,
  setEditor: PropTypes.func,
  handleInputChange: PropTypes.func
}

export default BannerCreateFormComponent