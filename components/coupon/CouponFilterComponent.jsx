import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Autocomplete, Button } from '@/components/shared/'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import DateRangePicker from '@/components/shared/date/DateRangePicker'

const useStyles = makeStyles({
  input: {
    cursor: 'text',
    borderRadius: '4px',
    border: '1px solid #BABABA',
    width: '100%',
    padding: '10px 14px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      border: '1px solid #000'
    }
  }
})
function CouponFilterComponent({
  // eslint-disable-next-line no-unused-vars
  queries,
  command,
  onSearch = () => { },
  onProvider = () => { },
  onDateRange = () => { },
  onClearState = () => { },
  onStatus = () => { }
}) {
  const classes = useStyles()

  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [filterProvider, setFilterProvider] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState('')
  const [search, setSearch] = useState('')

  const handleDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onDateRange(dates)
  }

  const handleChangeProvider = (e) => {
    setFilterProvider(e.target.value)
    onProvider(e.target?.value?.id)
  }

  const handleChangeStatus = (e) => {
    setFilterStatus(e.target.value)
    onStatus(e?.target?.value?.value)
  }

  const handleClearState = () => {
    onClearState()
    setFilterProvider('')
    setStartDate('')
    setEndDate('')
    setSearch('')
    setFilterStatus('')
  }



  return (
    <>
      <Grid
        container
        direction='column'
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid
          item
        >
          <p style={{
            marginBottom: '8px'
          }}>Pencarian</p>
          <input
            type='text'
            onChange={(e) => { setSearch(e.target.value) }}
            name='search'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(search)
              }
            }}
            className={classes.input}
            placeholder='Masukan Pencarian : Nama Kupon, Kode Unik, Nilai Kupon'
            value={search}
          />
        </Grid>
        <Grid
          item
        >
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            spacing={2}
          >
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <DateRangePicker
                label='Periode Kupon'
                placeholder='dd-mm-yyyy hh:mm:ss - dd-mm-yyyy hh:mm:ss'
                name='couponFilter'
                onChange={handleDate}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                dateFormat='yyyy-MM-dd'
                withPortal
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                placeholder='Pilih Penyelenggara'
                label='Penyelenggara'
                options={command?.organizer}
                name='providerId'
                onChange={(e) => { handleChangeProvider(e) }}
                value={filterProvider}
              />
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Autocomplete
                placeholder='Pilih Status'
                label='Status'
                options={[
                  { id: 1, text: 'Tersedia', value: 0 },
                  { id: 2, text: 'Sudah Dipakai', value: 1 },
                  { id: 3, text: 'Tidak Aktif', value: 2 },
                  { id: 4, text: 'Kadaluarsa', value: 3 }
                ]}
                name='status'
                onChange={(e) => { handleChangeStatus(e) }}
                value={filterStatus}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid
          item
        >
          <Button
            variant='outline'
            text='Reset Filter'
            sx={{
              textTransform: 'none',
              border: '2px solid #FE9516',
              color: '#FE9516',
              padding: '10px 10px',
              fontWeight: 'bold'
            }}
            onClick={handleClearState}
          />
        </Grid>
      </Grid>
    </>
  )
}

CouponFilterComponent.propTypes = {
  queries: PropTypes.object,
  command: PropTypes.object,
  onSearch: PropTypes.func,
  onProvider: PropTypes.func,
  onDateRange: PropTypes.func,
  onClearState: PropTypes.func,
  onStatus: PropTypes.func
}

export default CouponFilterComponent