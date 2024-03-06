import React from 'react'
import { Autocomplete, Icon, Input, RadioGroup, Select } from '@/components/shared'
import { Grid } from '@mui/material'
import { CALENDAR_ICON } from '@/utils/iconConstant'
import PropTypes from 'prop-types'
import { dateTimeFormat } from '@/utils/'

function CouponDetailFormComponent({
  detail,
  command
}) {
  return (
    <Grid
      container
      direction='column'
      sx={{
        marginBottom: '40px'
      }}
    >
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Input
          label='Nama Kupon'
          fullWidth
          placeholder='Masukan Nama Kupon'
          name='nameCoupon'
          value={detail?.name}
          disabled
          sx={{
            backgroundColor: '#EDEDED !important'
          }}
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
            md={6}
            sm={12}
            xs={12}
          >
            <Input
              label='Kode Unik'
              placeholder='Pilih Kode Unik'
              fullWidth
              name='codeUniq'
              value={detail?.code}
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
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
            <Input
              label='Nilai Kupon'
              placeholder='0'
              fullWidth
              name='valueCoupon'
              value={detail?.amount}
              disabled
              sx={{
                backgroundColor: '#EDEDED !important'
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
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
            value={`${dateTimeFormat(detail?.start_date)} - ${dateTimeFormat(detail?.end_date)}`}
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
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Select
          label='Penyelenggara'
          options={command?.organizer}
          value={detail?.provider?.id}
          disabled
        />
      </Grid>
      <Grid
        item
      >
        <RadioGroup
          label='Tipe'
          items={[
            { id: 0, text: 'Umum' },
            { id: 1, text: 'Khusus' }
          ]}
          disabled
          sx={{
            display: 'flex',
            flexDirection: 'row',
            '.MuiRadio-root': {
              color: 'gray'
            },
            '.MuiFormControlLabel-label': {
              color: '#444444'
            }
          }}
          color='warning'
          value={detail?.type}
        />
        {
          detail?.type === 1 && (
            <Grid
              item
              sx={{
                marginBottom: '20px'
              }}
            >
              <Autocomplete
                label='Course'
                placeholder='Pilih Course'
                options={command?.courseProvider}
                value={detail?.course}
                disabled
              />
            </Grid>
          )
        }
      </Grid>
    </Grid>
  )
}

CouponDetailFormComponent.propTypes = {
  detail: PropTypes.object,
  command: PropTypes.object
}

export default CouponDetailFormComponent