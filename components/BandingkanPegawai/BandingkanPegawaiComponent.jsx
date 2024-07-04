/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Search from '@/components/core/Search'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
  TablePagination
} from '@mui/material'
import { makeStyles } from '@mui/styles'
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

const BandingkanPegawaiComponent = ({
  promotions,
  echelon,
  disciplinary,
  grade,
  employee,
  dataFromStorage,
  onSearch = () => { },
  onLoading = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { },
  getBriefEmployees = () => { }
}) => {
  const router = useRouter()
  const classes = useStyles()
  const COLLECT_LIMIT = 5
  const [expandFilter, setExpandFilter] = useState(false)
  const [collectData, setCollectData] = useState([])

  const isSelectAll = useMemo(() => {
    return (promotions?.employees?.length >= COLLECT_LIMIT && collectData?.length == COLLECT_LIMIT) ||
      (promotions?.employees?.length < COLLECT_LIMIT && collectData?.length > 1)
  }, [collectData, promotions])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  const handleSelectedAll = (checked) => {
    if (checked) {
      const merged = [
        ...collectData,
        ...employees
          ?.slice(0, COLLECT_LIMIT - collectData?.length)
          ?.map(item => {
            const [data, itemObject] = getFlattenedObject(item)
            return itemObject
          })
      ]
      setCollectData(merged)
    } else {
      setCollectData([])
    }
  }

  const handleGetCheckBox = (value) => {
    return collectData.some((item) => {
      return item?.id === value?.id
    })
  }

  const handleCheckBox = (checked, item) => {
    if (collectData.length >= COLLECT_LIMIT) return

    if (checked) {
      const newCollectData = [...collectData, item]
      setCollectData(newCollectData)
    } else {
      const newCollectData = collectData?.filter(itm => itm?.id !== item?.id)
      setCollectData(newCollectData)

      if (!newCollectData?.length) {
        localStorage.removeItem('dataPegawai')
      }
    }
  }

  const handleRedirectCompare = () => {
    if (collectData.length > 1) {
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
          isBusy={collectData.length < 2}
        />
      </Box>
    )
  }, [collectData])

  const handleChangePage = (e, page) => {
    onPaginationChange(page + 1)
  }

  const handleChangeRowsPerPage = (e) => {
    const row = e?.target?.value
    onRowsPerPageChange(row)
  }

  const getFlattenedObject = (item) => {
    const itemObject = {
      ...item,
      eselon: `${item?.echelon_name || '-'}, ${item?.echelon_effective_date || '-'}`,
      golongan: `${item?.grade_name || '-'}, ${item?.grade_effective_date || '-'}`,
      image: [item?.photo_profile || '/simdatuk/userIcon.png'],
      name: `${item?.title_prefix || ''} ${item?.name} ${item?.title_suffix || ''}` || '-',
      nip: `${item?.employee_id_number || '-'}/${item?.employee_registration_number || '-'}`,
      isCheck: true
    }

    return [
      {
        type: CardTypes.PROFILE1,
        position: item?.position_name || '-',
        children: [itemObject]
      },
      itemObject
    ]
  }

  const employees = useMemo(() => {
    const data = promotions?.employees
    const newData = data?.filter((item) =>
      !collectData?.some(itm => item?.id == itm?.id)
    )
    return newData
  }, [promotions, collectData])

  const echelons = useMemo(() => {
    return echelon?.options || []
  }, [echelon])

  const disciplinaries = useMemo(() => {
    return disciplinary?.options || []
  }, [disciplinary])

  const grades = useMemo(() => {
    return grade?.options || []
  }, [grade])

  useEffect(() => {
    const state = !(promotions?.loading)
    onLoading(state)
  }, [promotions])

  useEffect(() => {
    if (dataFromStorage?.length) {
      setCollectData(dataFromStorage)
    }
  }, [dataFromStorage])

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
              onSearch={onSearch}
            />
          </Box>
          <BandingPegawaiForm
            expand={expandFilter}
            echelons={echelons}
            disciplinaries={disciplinaries}
            grades={grades}
            handleSubmit={(val) => console.log(val)}
          />
        </Box>
        {/* Selected Employees Card */}
        <Grid container spacing={3}>
          {collectData?.map((item, index) => {
            return (
              <Grid item xs={12} sm={3} key={index}>
                <CardProfile
                  data={{
                    type: CardTypes.PROFILE1,
                    position: item?.position_name,
                    children: [item]
                  }}
                  key={index}
                  isCheck={handleGetCheckBox(item)}
                  handleCheck={(checked) => handleCheckBox(checked, item)}
                />
              </Grid>
            )
          })}
        </Grid>
        {/* Employees Card */}
        <Grid
          container
          spacing={3}
          sx={{ marginTop: '12px' }}
        >
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
          {employees?.map((item, index) => {
            const [data, itemObject] = getFlattenedObject(item)
            return (
              <Grid item xs={12} sm={3} key={index}>
                <CardProfile
                  data={data}
                  key={index}
                  isCheck={handleGetCheckBox(itemObject)}
                  handleCheck={handleCheckBox}
                />
              </Grid>
            )
          })}
        </Grid>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={promotions?.pagination?.total || 0}
          rowsPerPage={promotions?.pagination?.per_page || 10}
          page={promotions?.pagination?.current_page - 1 || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: '12px' }}
        />
      </Box>
    </LayoutPages>
  )
}

BandingkanPegawaiComponent.propTypes = {
  promotions: PropTypes.object,
  echelon: PropTypes.object,
  disciplinary: PropTypes.object,
  grade: PropTypes.object,
  employee: PropTypes.object,
  dataFromStorage: PropTypes.array,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  getEmployee: PropTypes.func,
  getBriefEmployees: PropTypes.func
}

export default BandingkanPegawaiComponent
