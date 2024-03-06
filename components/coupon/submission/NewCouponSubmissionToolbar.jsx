/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Autocomplete, Button } from '@/components/shared'
import DateRangePicker from '@/components/shared/date/DateRangePicker'
import { successButtonStyle } from '@/utils/theme'
import { formatDate } from '@/utils/index'
import ReactTooltip from 'react-tooltip'

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
  },
  tooltip: {
    maxWidth: 250
  },
  informationStyle: {
    maxWidth: 20,
    width: '100%',
    cursor: 'pointer'
  }
})

function NewCouponSubmissionToolbar({
  // eslint-disable-next-line no-unused-vars
  queries,
  command,
  exportExcel,
  onSearch = () => { },
  onDate = () => { },
  onPosition = () => { },
  onLevel = () => { },
  onBlacklist = () => { },
  onStatus = () => { },
  onClearState = () => { },
  exportReportCoupon = () => { }
}) {
  const classes = useStyles()
  const [position, setPosition] = useState('')
  const [level, setLevel] = useState('')
  const [blacklist, setBlacklist] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [search, setSearch] = useState('')

  const handleOnPosition = (e) => {
    onPosition(e.target.value)
    setPosition(e.target.value)
  }

  const handleOnLevel = (e) => {
    onLevel(e.target.value)
    setLevel(e.target.value)
  }

  const handleOnBlacklist = (e) => {
    setBlacklist(e.target.value)
    onBlacklist(e.target.value)
  }

  const handleOnStatus = (e) => {
    setStatus(e.target.value)
    onStatus(e.target.value)
  }

  const handleDates = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onDate(dates)
  }


  const handleOnClearState = () => {
    onClearState()
    setPosition('')
    setLevel('')
    setBlacklist('')
    setStatus('')
    setStartDate('')
    setEndDate('')
    setSearch('')
  }

  const handleDownloadReport = () => {
    const payload = {
      start_date: startDate === null ? null : formatDate(startDate),
      end_date: endDate === null ? null : formatDate(endDate)
    }
    if (startDate !== null && endDate !== null) {
      exportReportCoupon(payload)
    } else {
      exportReportCoupon(payload)
    }
  }

  return (
    <>
      <Grid
        container
        direction='column'
      >
        <Grid
          item
        >
          <Button
            text='Unduh Laporan'
            color='success'
            sx={{
              ...successButtonStyle,
              textTransform: 'none'
            }}
            onClick={handleDownloadReport}
            isBusy={exportExcel.downloadTemplate.couponSubmission}
            isLoading={exportExcel.loading}
          />
        </Grid>
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
            className={classes.input}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch(search)
              }
            }}
            placeholder='Masukan Pencarian : Nip, Nama'
            value={search}
          />
        </Grid>
        <Grid
          item
        >
          <div style={{
            marginBottom: '-30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <p>
              Periode Kupon
            </p>
            <a
              data-tip data-for='information'
              style={{
                color: '#000',
                marginBottom: '-5px'
              }}>
              <img
                src='/images/information-circle.png'
                alt='logo'
                className={classes.informationStyle}
              />
            </a>
            <ReactTooltip
              id='information'
              place='right'
              effect='float'
              className={classes.tooltip}
            >
              Pilih tanggal periode kupon untuk melakukan filter tabel atau filter unduh laporan.
            </ReactTooltip>
          </div>
          <DateRangePicker
            // label='Periode Kupon'
            placeholder='dd-mm-yyyy hh:mm:ss - dd-mm-yyyy hh:mm:ss'
            name='rangekupon'
            onChange={(dates) => { handleDates(dates) }}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            dateFormat='yyyy-MM-dd'
            withPortal
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
              xl={3}
              lg={3}
              md={3}
              sm={12}
              xs={12}
            >
              <Autocomplete
                label='Jabatan'
                placeholder='Pilih Jabatan'
                options={command?.userPosition}
                onChange={(e) => { handleOnPosition(e) }}
                name='position'
                value={position}
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
                name='level'
                onChange={(e) => { handleOnLevel(e) }}
                value={level}
                options={[
                  { id: 0, text: '0' },
                  { id: 1, text: '1' },
                  { id: 2, text: '2' },
                  { id: 3, text: '3' },
                  { id: 4, text: '4' },
                  { id: 5, text: '5' }
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
                label='Blacklist'
                placeholder='Pilih Blacklist'
                options={[
                  { id: 1, text: 'Ya', value: true },
                  { id: 2, text: 'Tidak', value: false }
                ]}
                name='blacklist'
                onChange={(e) => { handleOnBlacklist(e) }}
                value={blacklist}
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
                onChange={(e) => { handleOnStatus(e) }}
                value={status}
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
            onClick={handleOnClearState}
          />
        </Grid>
      </Grid>
    </>
  )
}

NewCouponSubmissionToolbar.propTypes = {
  queries: PropTypes.object,
  command: PropTypes.object,
  exportExcel: PropTypes.object,
  onSearch: PropTypes.func,
  onDate: PropTypes.func,
  onPosition: PropTypes.func,
  onLevel: PropTypes.func,
  onBlacklist: PropTypes.func,
  onStatus: PropTypes.func,
  onClearState: PropTypes.func,
  exportReportCoupon: PropTypes.func
}

export default NewCouponSubmissionToolbar