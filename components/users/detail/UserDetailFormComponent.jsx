/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Chip, Icon, Input, Autocomplete } from '@/components/shared'
import { Divider, Grid } from '@mui/material'
import { EYE_CLOSE_ICON, CLOCK_ICON, BOOK_OPEN_ICON } from '@/utils/iconConstant'
import UserDetailHistoryCourse from './UserDetailHistoryCourse'
import UserDetailCourseList from './UserDetailCourseList'
import PropTypes from 'prop-types'

function UserDetailFormComponent({
  detail,
  command,
  userCourse
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
        <p style={{
          fontWeight: '500'
        }}>Foto Profil</p>
        <img
          src={detail?.photo || '/images/default-image.png'}
          alt='preview'
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%'
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
          label='NIP'
          disabled
          value={detail?.nip ?? '-'}
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
        />
      </Grid>
      <Grid
        item
      >
        <Input
          fullWidth
          label='Nama'
          disabled
          value={detail?.name ?? '-'}
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
        />
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          spacing={3}
          direction='row'
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
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
            md={6}
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
        sx={{
          marginBottom: '20px'
        }}
      >
        <Grid
          container
          spacing={3}
          direction='row'
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
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
            md={6}
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
          spacing={2}
          direction='row'
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
              fullWidth
              label='Email'
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={detail.email === null ? '-' : detail?.email}
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
                value='lorem ipsum'
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
        detail?.user_categories?.map((val, index) => (
          <Grid
            item
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
                padding: '10px 12px',
                gap: '20px 0'
              }}
              disabled
            />
          </Grid>
        ))
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
          margin: '30px 0'
        }}
      >
        <Divider
          sx={{
            backgroundColor: '#000'
          }}
        />
      </Grid>
      {
        userCourse?.length !== 0 && (
          <>
            <Grid
              item
            >
              <h3>Riwayat Course</h3>
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: '28px'
              }}
            >
              <Grid
                container
                spacing={2}
                direction='row'
              >
                <Grid
                  item
                >
                  <UserDetailHistoryCourse
                    icon={BOOK_OPEN_ICON}
                    heading='Jumlah Course'
                    value={userCourse?.length || '-'}
                  />
                </Grid>
                <Grid
                  item
                >
                  <UserDetailHistoryCourse
                    icon={CLOCK_ICON}
                    heading='Jam Pelajaran (JP)'
                    value={detail?.lesson_hour === null ? '-' : detail?.lesson_hour}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )
      }
      {
        userCourse?.length > 0 && (
          userCourse?.map((val, index) => (
            <Grid
              item
              key={index}
              sx={{
                marginBottom: '30px'
              }}
            >
              <UserDetailCourseList
                path={val?.photo}
                progress={val?.progress}
                title={val?.name}
                author={val?.coach}
                category={val?.provider?.name}
                totalRating={val?.rating.value}
                rating={val?.rating?.count}
                footer={val}
              />
            </Grid>
          ))
        )
      }
    </Grid>
  )
}

UserDetailFormComponent.propTypes = {
  detail: PropTypes.object,
  selected: PropTypes.any,
  command: PropTypes.object,
  setSelected: PropTypes.func,
  userCourse: PropTypes.array
}

export default UserDetailFormComponent