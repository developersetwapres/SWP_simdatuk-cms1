/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { Autocomplete, Checkbox, Chip, Icon, Input } from '@/components/shared'
import { EYE_CLOSE_ICON } from '@/utils/iconConstant'

function UserBlacklistDetailForm({
  detail,
  command
}) {
  const level = [
    {
      id: detail?.user_level,
      name: detail?.user_level?.toString()
    }
  ]
  const objLevel = Object.assign({}, ...level)
  const objRoles = Object.assign({}, ...detail?.roles || [])
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
        <p>Foto Profil</p>
        <img
          src={detail?.photo || '/images/default-image.png'}
          alt='poto'
          style={{
            width: '100%',
            borderRadius: '500px',
            height: '160px',
            maxWidth: '160px'
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          fullWidth
          value={detail?.nip}
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          label='NIP'
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          fullWidth
          value={detail?.name}
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          label='Nama'
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '-20px'
        }}
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Jabatan'
              placeholder='Pilih Jabatan'
              options={command?.userPosition}
              name='position'
              disabled
              value={detail?.position === null ? '-' : detail?.position}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Unit Kerja/Satuan Organisasi'
              placeholder='Pilih Unit Kerja/Satuan Organisasi'
              options={command?.userUnit}
              name='unit'
              disabled
              value={command?.unit === null ? '-' : detail?.unit}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Pangkat/Golongan'
              placeholder='Pilih Pangkat/Golongan'
              options={command?.userLevel}
              name='level'
              disabled
              value={detail?.level === null ? '-' : detail?.level}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Peran Pengguna'
              placeholder='Pilih Peran Pengguna'
              options={command?.roles}
              name='roles'
              disabled
              value={detail?.roles?.length === 0 ? { id: 0, name: '-' } : objRoles}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <Input
              label='Email'
              fullWidth
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={detail?.email}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Password'
                disabled
                sx={{
                  backgroundColor: '#EDEDED !important'
                }}
                fullWidth
                type='password'
                value='loremloremlorem'
              />
              <div style={{
                position: 'absolute',
                top: '42px',
                right: '10px'
              }}>
                <Icon
                  path={EYE_CLOSE_ICON}
                  maxWidth={20}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {
        detail?.user_categories?.length > 0 && (
          detail?.user_categories.map((val, index) => (
            <Grid
              key={index}
            >
              <Chip
                items={val.topics.map(val => {
                  return {
                    id: val.topic_id,
                    text: val.topic_name
                  }
                })}
                label={val.category_name === null ? '-' : val.category_name}
                sx={{
                  backgroundColor: '#878787',
                  color: '#fff',
                  border: '1px solid #000',
                  height: '35px',
                  margin: '0 8px',
                  padding: '10px 12px'
                }}
                disabled
              />
            </Grid>
          ))
        )
      }
      <Grid
        item
      >
        <Autocomplete
          label='Level'
          placeholder='Pilih Level'
          options={[
            { id: 0, text: '0' },
            { id: 1, text: '1' },
            { id: 2, text: '2' },
            { id: 3, text: '3' },
            { id: 4, text: '4' },
            { id: 5, text: '5' }
          ]}
          disabled
          name='progress'
          value={objLevel}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginTop: '10px'
        }}
      >
        <Checkbox
          text='Blacklist'
          label='Ya'
          value={detail?.blacklist === 0 ? false : true}
          disabled
        />
      </Grid>
    </Grid>
  )
}

UserBlacklistDetailForm.propTypes = {
  detail: PropTypes.object,
  command: PropTypes.object
}

export default UserBlacklistDetailForm