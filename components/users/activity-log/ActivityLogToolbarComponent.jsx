/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Autocomplete from '@/components/shared/form/Autocomplete'
import DateRangePicker from '@/components/shared/date/DateRangePicker'

const useStyles = makeStyles({
  input: {
    cursor: 'text',
    borderRadius: '6px',
    border: '1px solid #BABABA',
    width: '100%',
    padding: '10px 14px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      border: '1px solid #000'
    },
    '&::placeholder': {
      color: '#878787'
    }
  }
})

function ActivityLogToolbarComponent({
  command,
  queries,
  onClearFilter = () => { },
  onSearch = () => { },
  onRole = () => { },
  onDate = () => { }
}) {
  const classes = useStyles()
  const [role, setRole] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [search, setSearch] = useState('')

  const handleChangeRole = (e) => {
    setRole(e?.target?.value)
    onRole(e?.target.value?.id)
  }

  const handleClearFilter = () => {
    onClearFilter()
    setStartDate('')
    setEndDate('')
    setRole('')
    setSearch('')
  }

  const handleDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onDate(dates)
  }

  return (
    <>
      <Grid
        container
        direction='column'
      >
        <Grid
          item
          sx={{
            marginBottom: '`0px'
          }}
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
            placeholder='Masukan Pencarian : Nama, Aktivitas, IP Address'
            value={search}
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
              <DateRangePicker
                label='Tanggal'
                placeholder='dd-mm-yyyy - dd-mm-yyyy'
                name='couponFilter'
                onChange={handleDate}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                dateFormat='yyyy-MM-dd'
                value={startDate}
                withPortal
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
                placeholder='Pilih Peran Pengguna'
                onChange={(e) => { handleChangeRole(e) }}
                value={role}
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
            onClick={handleClearFilter}
          />
        </Grid>
      </Grid>
    </>
  )
}

ActivityLogToolbarComponent.propTypes = {
  command: PropTypes.object,
  queries: PropTypes.object,
  onClearFilter: PropTypes.func,
  onSearch: PropTypes.func,
  onRole: PropTypes.func,
  onDate: PropTypes.func
}

export default ActivityLogToolbarComponent