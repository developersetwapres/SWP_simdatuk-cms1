/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Grid } from '@mui/material'
import { Input, Icon, Autocomplete, Chip, Checkbox } from '@/components/shared'
import { CALENDAR_ICON } from '@/utils/iconConstant'

function CouponSubmissionDetailForm({
  detailCoupon,
  command
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
          label='Tanggal Pengajuan'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          fullWidth
          value={detailCoupon?.created_at}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          label='Harga'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          fullWidth
          value={detailCoupon.price ?? ''}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
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
              label='Mengajukan Kupon'
              fullWidth
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={detailCoupon?.total_submission ?? ''}
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
            <Input
              label='Menerima Kupon'
              fullWidth
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
              value={detailCoupon?.total_submission_approved ?? '-'}
            />
          </Grid>
        </Grid>
      </Grid>
      {
        detailCoupon.status === 1 && (
          <>
            <Grid
              item
              sx={{
                marginTop: '10px'
              }}
            >
              <Divider
                sx={{
                  backgroundColor: '#000'
                }}
              />
            </Grid>
            <Grid
              item
            >
              <h3>Detail Kupon</h3>
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: '20px'
              }}
            >
              <Input
                value={detailCoupon.coupon.name ?? ''}
                label='Nama Kupon'
                disabled
                sx={{
                  backgroundColor: '#EDEDED !important'
                }}
                fullWidth
              />
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: '20px'
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
                    disabled
                    fullWidth
                    sx={{
                      backgroundColor: '#EDEDED !important'
                    }}
                    label='Kode Unik'
                    value={detailCoupon.coupon.code ?? '-'}
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
                  <Input
                    disabled
                    fullWidth
                    sx={{
                      backgroundColor: '#EDEDED !important'
                    }}
                    label='Nilai Kupon'
                    value={detailCoupon?.coupon.amount ?? ''}
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
              <div style={{
                position: 'relative'
              }}>
                <Input
                  label='Periode Kupon'
                  fullWidth
                  disabled
                  sx={{
                    backgroundColor: '#EDEDED !important'
                  }}
                  value={`${detailCoupon?.coupon.start_date ?? ''} - ${detailCoupon?.coupon.end_date ?? ''}`}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '43px',
                    right: '10px'
                  }}
                >
                  <Icon
                    path={CALENDAR_ICON}
                    maxWidth={20}
                  />
                </div>
              </div>
            </Grid>
          </>
        )
      }

      {/* <Grid
        item
        sx={{
          marginTop: '-20px'
        }}
      >
        <Select
          label='Penyelenggara'
          value={detailCoupon?.organizer.id}
          options={[
            { id: 1, text: 'Udemy' }
          ]}
          disabled
        />
      </Grid> */}
      {/* <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <RadioGroup
          label='Tipe'
          items={[
            { id: 1, text: 'Umum' },
            { id: 2, text: 'Khusus' }
          ]}
          disabled
          sx={{
            display: 'flex',
            flexDirection: 'row',
            '.MuiRadio-root': {
              color: '#878787'
            },
            '.MuiFormControlLabel-label': {
              color: '#444444'
            }
          }}
          color='warning'
          value={detailCoupon?.type?.value}
        />
      </Grid> */}
      {/* <Grid
        item
      >
        <Select
          label='Course'
          value={detailCoupon?.course.id}
          options={[
            { id: 1, text: 'Typescript from scartch' }
          ]}
          disabled
        />
      </Grid> */}
      <Grid
        item
        sx={{
          marginTop: '30px'
        }}
      >
        <Divider
          sx={{
            backgroundColor: '#000'
          }}
        />
      </Grid>
      <Grid
        item
      >
        <h3>Detail Pengguna</h3>
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <p>Foto Profil</p>
        {
          detailCoupon?.user?.photo && (
            <img
              src={detailCoupon?.user?.photo ?? ''}
              alt='profile'
              style={{
                width: '100%',
                borderRadius: '500px',
                height: '160px',
                maxWidth: '160px'
              }}
            />
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
          label='NIP'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          fullWidth
          value={detailCoupon.user.nip ?? ''}
        />
      </Grid>
      <Grid
        item
      >
        <Input
          label='Nama'
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
          fullWidth
          value={detailCoupon.user.name ?? ''}
        />
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
              label='Jabatan'
              options={command?.userPosition}
              disabled
              value={detailCoupon?.user?.position}
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
              options={command?.userUnit}
              disabled
              value={detailCoupon?.user?.unit}
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
              options={command?.userLevel}
              disabled
              value={detailCoupon?.user?.level}
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
              options={command?.roles}
              disabled
              value={detailCoupon?.user?.role}
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
            xl={12}
            lg={12}
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
              value={detailCoupon.user.email ?? ''}
            />
          </Grid>
        </Grid>
      </Grid>
      {
        detailCoupon?.user?.categories.length > 0 && (
          detailCoupon?.user?.categories.map((value, index) => (
            <Grid
              item
              sx={{
                marginTop: '20px'
              }}
              key={index}
            >
              <Chip
                items={value?.topics.map(val => {
                  return {
                    id: val.topic_id,
                    text: val.topic_name
                  }
                })}
                label={value.category_name ?? ''}
                size='medium'
                sx={{
                  marginRight: '8px',
                  color: '#fff',
                  marginTop: {
                    md: '5px',
                    sm: '5px',
                    xs: '5px'
                  },
                  backgroundColor: '#878787'
                }}
              />
            </Grid>
          ))
        )
      }
      {/* {ChildChip()} */}
      {/* <Grid
        item
      >
        <Select
          fullWidth
          disabled
          label='Level'
          value={detailCoupon?.level.id}
          options={[
            { id: 1, text: '0' }
          ]}
        />
      </Grid> */}
      <Grid
        item
        sx={{
          marginTop: '20px'
        }}
      >
        <Checkbox
          text='Blacklist'
          label='Ya'
          value={detailCoupon.user.blacklist === true ? true : false}
          disabled
        />
      </Grid>
    </Grid>
  )
}

CouponSubmissionDetailForm.propTypes = {
  detailCoupon: PropTypes.object,
  command: PropTypes.object
}

export default CouponSubmissionDetailForm