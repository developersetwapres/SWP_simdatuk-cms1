/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import EmployeeLayout from '../Employee/EmployeeLayout'
import Search from '../core/Search'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import BandingPegawaiForm from './BandingPegawaiForm'
import ListPegawai from './ListPegawai'

const useStyles = makeStyles((theme) => ({
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '1rem',
    borderRadius: '4px',
    width: '30%',
    alignSelf: 'flex-end',
    padding: '0 10px'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '15px 15px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  }
}))

const styles = {
  iconStyle: {
    fontSize: '20px'
  }
}
const BandingkanPegawaiComponent = () => {
  const classes = useStyles()

  const [expandFilter, setExpandFilter] = useState(false)


  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  return (
    <EmployeeLayout
      summary='Bandingkan Pegawai'
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          onClick={handleFilterClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '5px',
            width: '7rem',
            height: '3rem',
            borderRadius: '10px',
            border: '2px solid #895700',
            cursor: 'pointer'
          }}
        >
          <FilterAltIcon
            color='primary'
            sx={{
              fontSize: '20px',
              cursor: 'pointer'
            }}
          />
          <Typography
            color='primary'
            sx={{
              fontWeight: '500'
            }}
          >
            Filter
          </Typography>
        </Box>
        <Search
          inputParentClasses={classes.inputParent}
          inputClass={classes.input}
          iconStyle={styles.iconStyle}
          placeholder='Cari Nama/Nip Pegawai'
        />
      </Box>
      <BandingPegawaiForm
        expand={expandFilter}
      />
      <Box
      >
        <ListPegawai />
      </Box>
    </EmployeeLayout>
  )
}

export default BandingkanPegawaiComponent
