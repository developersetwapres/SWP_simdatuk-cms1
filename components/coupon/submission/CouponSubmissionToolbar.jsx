import React from 'react'
import { Grid } from '@mui/material'
import { Autocomplete } from '@/components/shared'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import DateSinglePicker from '@/components/shared/date/DatePicker'

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


function CouponSubmissionToolbar({
  command,
  onSearch = () => { },
  onBlacklist = () => { },
  onLevel = () => { },
  onStatus = () => { },
  onDateRange = () => { }
}) {
  const classes = useStyles()
  const [startDate, setStartDate] = React.useState(null)
  const handleDate = (dates) => {
    // const [start] = dates
    // setStartDate(start)
    // onDateRange(dates)
    setStartDate(dates)
    onDateRange(dates)
  }
  return (
    <Grid
      container
      direction='column'
    >
      <Grid
        item
      >
        <p style={{
          marginBottom: '8px'
        }}>Pencarian</p>
        <input
          type='text'
          onChange={(e) => { onSearch(e.target.value) }}
          name='search'
          className={classes.input}
          placeholder='Masukan Pencarian: Nip, Nama'
        />
      </Grid>
      <Grid
        item
      >
        <DateSinglePicker
          label='Periode Kupon'
          placeholder='dd-mm-yyyy hh:mm:ss'
          name='couponFilter'
          onChange={handleDate}
          selected={startDate}
          dateFormat='yyyy-MM-dd'
          value={startDate}
          withPortal
        />
      </Grid>
      <Grid
        item
      >
        <Grid
          container
          spacing={2}
          direction='row'
        >
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Jabatan'
              placeholder='Pilih Jabatan'
              options={[
                { id: 1, text: 'Jabatan' }
              ]}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Level'
              placeholder='Pilih Level'
              options={command?.courseLevel}
              name='level'
              onChange={(e) => { onLevel(e.target.value) }}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Blacklist'
              placeholder='Pilih Blacklist'
              options={[
                { id: 1, text: 'Ya', value: true },
                { id: 2, text: 'Tidak', value: false }
              ]}
              name='blacklist'
              onChange={(e) => { onBlacklist(e.target.value) }}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            xs={12}
          >
            <Autocomplete
              label='Status'
              placeholder='Pilih Status'
              options={[
                { id: 1, text: 'Pengajuan', value: 0 },
                { id: 2, text: 'Disetujui', value: 1 },
                { id: 3, text: 'Ditolak', value: 2 }
              ]}
              name='status'
              onChange={(e) => { onStatus(e.target.value) }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

CouponSubmissionToolbar.propTypes = {
  command: PropTypes.object,
  onSearch: PropTypes.func,
  onBlacklist: PropTypes.func,
  onLevel: PropTypes.func,
  onStatus: PropTypes.func,
  onDateRange: PropTypes.func
}

export default CouponSubmissionToolbar