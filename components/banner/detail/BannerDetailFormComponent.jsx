/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { Input, Select, Checkbox, Autocomplete } from '@/components/shared'
import EditorForm from '@/components/shared/form/editor/EditorForm'
function BannerDetailFormComponent({
  detail,
  commandCourse
}) {
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <Input
          fullWidth
          label='Nama Banner'
          disabled
          value={detail?.name}
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
        />
      </Grid>
      <Grid
        item
      >
        <p>Image</p>

        <img
          src={detail?.photo || '/images/default-image.png'}
          alt='preview'
          style={{
            width: '600px',
            height: '150px',
            objectFit: 'cover'
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
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
          disabled
          label='Tipe'
          value={detail?.type === 0 ? 1 : detail?.type === 1 ? 2 : 3}
        />
      </Grid>
      {
        detail?.type === 0 && (
          <Grid
            item
          >
            <Autocomplete
              options={commandCourse}
              label='Course'
              value={detail.course}
              disabled
            />
          </Grid>

        )
      }
      {
        detail?.type === 1 && (
          <Grid
            item
          >
            <EditorForm
              label='Deskripsi'
              value={detail?.content}
              disabled
            />
          </Grid>
        )
      }
      {
        detail?.type === 2 && (
          <Grid
            item
          >
            <Input
              fullWidth
              label='Link'
              disabled
              value={detail?.external_url}
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
            />
          </Grid>
        )
      }
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Checkbox
          label='Publikasi'
          color='secondary'
          disabled
          text='Status'
          value={detail?.status ? true : false}
        />
      </Grid>
    </Grid>
  )
}

BannerDetailFormComponent.propTypes = {
  detail: PropTypes.object,
  commandCourse: PropTypes.array
}


export default BannerDetailFormComponent