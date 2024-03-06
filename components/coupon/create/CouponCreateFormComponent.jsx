import React from 'react'
import { Grid } from '@mui/material'
import {
  Input,
  RadioGroup,
  Autocomplete
} from '@/components/shared'
import PropTypes from 'prop-types'
import DateRangePicker from '@/components/shared/date/DateRangePicker'

function CouponCreateFormComponent({
  values,
  errors,
  command,
  customError,
  handleInputChange = () => { },
  pullData = () => { },
  setCustomError = () => { }
}) {
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  const handleDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    pullData(dates)
    setCustomError({
      dateError: ''
    })
  }

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
          value={values.nameCoupon}
          onChange={handleInputChange}
          error={errors.nameCoupon}
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
              value={values.codeUniq}
              error={errors.codeUniq}
              onChange={handleInputChange}
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
              value={values.valueCoupon}
              error={errors.valueCoupon}
              onChange={handleInputChange}
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

        <DateRangePicker
          label='Periode Kupon'
          name='date'
          withPortal
          placeholder='dd-mm-yyyy - dd-mm-yyyy'
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDate}
          dateFormat='yyyy-MM-dd'
        // timeCaption='time'
        />
        {
          customError?.dateError && (
            <p style={{
              color: '#D32F2F',
              fontSize: '14px',
              margin: 0
            }}>
              {customError?.dateError}
            </p>
          )
        }
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Autocomplete
          options={command?.organizer}
          placeholder='Pilih Penyelenggara'
          label='Penyelenggara'
          name='provider'
          value={values.provider.id}
          onChange={handleInputChange}
          error={errors?.provider}
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
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
          color='warning'
          name='status'
          value={parseInt(values.status)}
          onChange={handleInputChange}
          error={errors.status}
        />
        {
          errors?.status && (
            <p style={{
              color: '#D32F2F',
              fontSize: '14px',
              margin: 0
            }}>
              {errors?.status}
            </p>
          )
        }
      </Grid>
      {
        parseInt(values.status) === 1 && (
          <Grid
            item
          >
            <Autocomplete
              label='Course'
              options={command?.courseProvider}
              placeholder='Pilih Course'
              name='course'
              value={values.course}
              onChange={handleInputChange}
              error={errors.course}
            />
          </Grid>
        )
      }
    </Grid>
  )
}

CouponCreateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  command: PropTypes.object,
  course: PropTypes.object,
  handleInputChange: PropTypes.func,
  pullData: PropTypes.func,
  customError: PropTypes.object,
  setCustomError: PropTypes.func
}

export default CouponCreateFormComponent