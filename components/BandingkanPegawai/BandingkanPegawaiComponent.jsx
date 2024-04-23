/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import EmployeeLayout from '../Employment/EmploymentLayout'
import Search from '../core/Search'
import { Box, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import BandingPegawaiForm from './BandingPegawaiForm'
import ListPegawai from './ListPegawai'
import { Button } from '../shared'
import { FilterAlt, Menu } from '@mui/icons-material'

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
  const [amountData, setAmountData] = useState([])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  const getAmount = (amount) => {
    setAmountData(amount)
  }

  return (
    <EmployeeLayout>
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h6' sx={{ fontSize: '14px', fontWeight: 800 }}>
            {`Bandingkan Pegawai`}
          </Typography>
          <Button
            // onClick={onCLick}
            text={`Bandingkan Pegawai (${amountData.length})`}
            color='primary'
            fullWidth
            type='submit'
            sx={{
              width: '220px',
              color: '#fff',
              textTransform: 'none',
              fontSize: '14px'
            }}
          />
        </Box>
        {/* Filter */}
        <Box
          sx={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={handleFilterClick}
            variant='outlined'
            text='Filter'
            icon={<FilterAlt sx={{ marginRight: '6px', fontSize: '20px' }} />}
            sx={{
              fontSize: '14px',
              textTransform: 'none',
              borderWidth: '2px'
            }}
          />
          <Search
            inputParentClasses={classes.inputParent}
            inputClass={classes.input}
            iconStyle={styles.iconStyle}
            placeholder='Cari Nama/Nip Pegawai'
          />
        </Box>
        <BandingPegawaiForm expand={expandFilter} />
        <ListPegawai checkAmount={getAmount} />
      </Box>
    </EmployeeLayout>
  )
}

export default BandingkanPegawaiComponent
