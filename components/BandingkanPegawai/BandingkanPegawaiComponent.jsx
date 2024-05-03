/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Search from '../core/Search'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import BandingPegawaiForm from './BandingPegawaiForm'
import { Button } from '../shared'
import { FilterAlt } from '@mui/icons-material'
import CardProfile from '../shared/Card/CardProfile'
import { CardTypes } from 'libs/types/CardTypes'
import { useRouter } from 'next/router'
import LayoutPages from '../core/LayoutPages'

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

const BandingkanPegawaiComponent = ({ data }) => {
  const router = useRouter()
  const classes = useStyles()

  const [expandFilter, setExpandFilter] = useState(false)
  const [collectData, setCollectData] = useState([])

  const isSelectAll = useMemo(() => {
    return collectData.length == 3
  }, [collectData])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  const handleSelectedAll = (e) => {
    if (e && collectData.length < 3) {
      const newData = data
        .map((item) => {
          return item?.children[0]
        })
        .slice(0, 3)
      let newCollectData = []

      newData.map((item) => {
        const checkItem = collectData.some((itm) => {
          return item?.name === itm?.name
        })

        if (!checkItem) {
          newCollectData = [...newCollectData, item]
        }
      })

      setCollectData([
        ...collectData,
        ...newData.slice(0, 3 - collectData.length)
      ])
    } else {
      setCollectData([])
    }
  }

  const handleGetCheckBox = (value) => {
    return collectData.some((item) => {
      return item?.name === value?.name
    })
  }

  const handleCheckBox = (e, value) => {
    const checkValue = collectData.some((item) => {
      return item?.name === value?.name
    })

    if (collectData.length == 3 && !checkValue) {
      const collectDataSlice = collectData.slice(1)
      setCollectData([...collectDataSlice, value])
    } else if (!checkValue) {
      setCollectData([...collectData, value])
    } else {
      const filterData = collectData.filter((item) => {
        return item?.name !== value?.name
      })
      setCollectData(filterData)
    }
  }

  const handleRedirectCompare = () => {
    if (collectData.length > 0) {
      localStorage.setItem('dataPegawai', JSON.stringify(collectData))
      router.push(`${router.asPath}/data-pegawai`)
    }
  }

  const action = useMemo(() => {
    return (
      <Box>
        <Button
          color='primary'
          text={`Bandingkan Pegawai (${collectData.length})`}
          onClick={handleRedirectCompare}
          sx={{
            width: '220px',
            textTransform: 'none',
            fontSize: '14px'
          }}
        />
      </Box>
    )
  }, [collectData])

  return (
    <LayoutPages summary={'Bandingkan Pegawai'} action={action}>
      <Box>
        {/* Filter */}
        <Box sx={{ marginBottom: '20px' }}>
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
        </Box>
        {/* Employees Card */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <FormControlLabel
                label={'Pilih Semua'}
                control={
                  <Checkbox
                    checked={isSelectAll}
                    onClick={(e) => handleSelectedAll(e.target.checked)}
                  />
                }
              />
            </Box>
          </Grid>
          {data.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <CardProfile
                data={item}
                key={index}
                isCheck={handleGetCheckBox(item?.children[0])}
                handleCheck={handleCheckBox}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </LayoutPages>
  )
}

BandingkanPegawaiComponent.propTypes = {
  data: PropTypes.array
}

export default BandingkanPegawaiComponent
