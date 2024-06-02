/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Search from '@/components/core/Search'
import { Autocomplete, Button } from '@/components/shared'
import { FilterAlt } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
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

const EmployeeFilterComponent = ({ options, onSearch = () => {} }) => {
  const router = useRouter()
  const classes = useStyles()

  const filterOptions = useMemo(() => {
    const newOptions = [
      {
        name: 'Jabatan',
        key: 'jabatan',
        placeholder: 'Pilih Jabatan',
        options: ['Jabatan I', 'Jabatan II', 'Jabatan III', 'Jabatan IV']
      },
      {
        name: 'Eselon',
        key: 'eselon',
        placeholder: 'Pilih Eselon',
        options: options?.echelon
      },
      {
        name: 'Golongan',
        key: 'golongan',
        placeholder: 'Pilih Golongan',
        options: ['I', 'II', 'III', 'IV', 'V']
      },
      {
        name: 'Jenis Perbantuan',
        key: 'perbantuan',
        placeholder: 'Pilih Jenis Perbantuan',
        options: [
          'Jenis Perbantuan I',
          'Jenis Perbantuan II',
          'Jenis Perbantuan III',
          'Jenis Perbantuan IV'
        ]
      },
      {
        name: 'Jenis Outsourcing',
        key: 'outsourcing',
        placeholder: 'Pilih Jenis Outsourcing',
        options: [
          'Jenis Outsourcing I',
          'Jenis Outsourcing II',
          'Jenis Outsourcing III',
          'Jenis Outsourcing IV'
        ]
      },
      {
        name: 'Tingkat Pendidikan',
        key: 'pendidikan',
        placeholder: 'Pilih Tingkat Pendidikan',
        options: ['SD', 'SLTP', 'SLTA', 'S1/Sarjana', 'S2/Sarjana']
      },
      {
        name: 'Agama',
        key: 'agama',
        placeholder: 'Pilih Agama',
        options: ['Islam', 'Kristen', 'Konghucu', 'Katolik', 'Budha']
      },
      {
        name: 'Umur',
        key: 'umur',
        placeholder: 'Pilih Umur',
        options: ['1', '2', '3', '4', '5']
      },
      {
        name: 'Bulan Lahir',
        key: 'month',
        placeholder: 'Pilih Bulan Lahir',
        options: [
          'Januari',
          'Februari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember'
        ]
      },
      {
        name: 'Status',
        key: 'status',
        placeholder: 'Pilih Status',
        options: ['Aktif', 'Non Aktif']
      }
    ]

    return newOptions
  }, [options])

  const filter = useMemo(() => {
    const filtersDefault = [
      'golongan',
      'pendidikan',
      'agama',
      'umur',
      'month',
      'status'
    ]
    const path = {
      ASN: router.pathname.split('/')[2].toUpperCase() == 'ASN',
      NONASN: router.pathname.split('/')[2].toUpperCase() == 'NON-ASN',
      OUTSOURCING: router.pathname.split('/')[2].toUpperCase() == 'OUTSOURCING'
    }

    if (path?.ASN) {
      const listFilter = filtersDefault
      listFilter.unshift('eselon')

      return filterOptions.filter((itm) => {
        return listFilter.includes(itm?.key)
      })
    } else if (path?.NONASN) {
      const listFilter = filtersDefault
      listFilter.splice(0, 0, 'jabatan')
      listFilter.splice(2, 0, 'perbantuan')

      return filterOptions.filter((itm) => {
        return listFilter.includes(itm?.key)
      })
    } else {
      const listFilter = filtersDefault
      listFilter.splice(0, 0, 'jabatan')
      listFilter.splice(1, 0, 'outsourcing')

      return filterOptions.filter((itm) => {
        return listFilter.includes(itm?.key)
      })
    }
  }, [router, filterOptions])

  const [isFilter, setIsFilter] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [filterType, setFilterType] = useState('')

  return (
    <Box>
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
          onClick={() => setIsFilter((isFilter) => !isFilter)}
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
          iconStyle={classes.iconStyle}
          placeholder='Cari Nama/Nip Pegawai'
          onSearch={onSearch}
        />
      </Box>
      <Box
        sx={{
          height: isFilter ? '400px' : 0,
          transition: 'all 0.6s ease',
          overflow: 'hidden'
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            opacity: isFilter ? 1 : 0,
            transition: 'all 0.3s ease'
          }}
        >
          {filter.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Autocomplete
                options={item?.options}
                name={item?.key}
                placeholder={item?.placeholder}
                value={filterType[item?.name]}
                multiple={true}
                label={item?.name}
                onChange={(val) => {
                  console.log('val', val)
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'flex-end',
                gap: 1
              }}
            >
              <Button
                text='Reset Filter'
                color='danger'
                onClick={() => handleAction('sync')}
              />
              <Button
                text='Selesai'
                color='primary'
                onClick={() => console.log('filterType', filterType)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

EmployeeFilterComponent.propTypes = {
  options: PropTypes.object,
  onSearch: PropTypes.func
}

export default EmployeeFilterComponent
