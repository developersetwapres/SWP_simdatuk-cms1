import { Autocomplete, Input, RadioGroup } from '@/components/shared'
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from '@/components/shared/date/DateRangePicker'

function CouponUpdateFormComponent({
  values,
  errors,
  command,
  coupon,
  provider,
  handleInputChange = () => { },
  pullData = () => { },
  filterCourseByProvider = () => { },
  handleProvider = () => { }
}) {
  const [startDate, setStartDate] = React.useState(new Date(coupon?.detail?.start_date))
  const [endDate, setEndDate] = React.useState(new Date(coupon?.detail?.end_date))

  const handleDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    pullData(dates)
  }

  // * Track value change and set to filterCourseByProvider
  useEffect(() => {
    if (provider !== '') {
      filterCourseByProvider(provider.id)
    }
  }, [provider, filterCourseByProvider])

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
          name='name'
          value={values.name}
          error={errors.name}
          onChange={handleInputChange}
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
              name='code'
              value={values.code}
              error={errors.code}
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
              name='amount'
              value={values.amount}
              error={errors.amount}
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
      </Grid>
      <Grid
        item
        sx={{
          marginBottom: '20px'
        }}
      >
        <Autocomplete
          options={command?.organizer}
          name='provider'
          value={provider}
          onChange={(e) => { handleProvider(e) }}
          placeholder='Pilih Penyelenggara'
          label='Penyelenggara'
        // error={customError.provider}
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
          name='type'
          value={parseInt(values.type)}
          error={errors.type}
          onChange={handleInputChange}
        />
      </Grid>
      {
        parseInt(values.type) === 1 && (
          <Grid
            item
          >
            <Autocomplete
              options={command?.courseProvider}
              placeholder='Pilih Course'
              name='course'
              value={values.course}
              onChange={handleInputChange}
              error={errors.course}
              label='Course'
            />
          </Grid>
        )
      }
    </Grid>
  )
}

CouponUpdateFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  command: PropTypes.object,
  coupon: PropTypes.object,
  provider: PropTypes.object,
  handleInputChange: PropTypes.func,
  pullData: PropTypes.func,
  filterCourseByProvider: PropTypes.func,
  handleProvider: PropTypes.func
}

export default CouponUpdateFormComponent