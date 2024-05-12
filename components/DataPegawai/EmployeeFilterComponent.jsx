/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
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

const filterOptions = [
  {
    name: 'Jabatan',
    key: 'jabatan',
    placeholder: 'Pilih Jabatan',
    options: [
      { title: 'Jabatan I' },
      { title: 'Jabatan II' },
      { title: 'Jabatan III' },
      { title: 'Jabatan IV' }
    ]
  },
  {
    name: 'Eselon',
    key: 'eselon',
    placeholder: 'Pilih Eselon',
    options: [
      { title: 'Eselon I' },
      { title: 'Eselon II' },
      { title: 'Eselon III' },
      { title: 'Eselon IV' }
    ]
  },
  {
    name: 'Golongan',
    key: 'golongan',
    placeholder: 'Pilih Golongan',
    options: [
      { title: 'I' },
      { title: 'II' },
      { title: 'III' },
      { title: 'IV' },
      { title: 'V' }
    ]
  },
  {
    name: 'Jenis Perbantuan',
    key: 'perbantuan',
    placeholder: 'Pilih Jenis Perbantuan',
    options: [
      { title: 'Jenis Perbantuan I' },
      { title: 'Jenis Perbantuan II' },
      { title: 'Jenis Perbantuan III' },
      { title: 'Jenis Perbantuan IV' }
    ]
  },
  {
    name: 'Jenis Outsourcing',
    key: 'outsourcing',
    placeholder: 'Pilih Jenis Outsourcing',
    options: [
      { title: 'Jenis Outsourcing I' },
      { title: 'Jenis Outsourcing II' },
      { title: 'Jenis Outsourcing III' },
      { title: 'Jenis Outsourcing IV' }
    ]
  },
  {
    name: 'Tingkat Pendidikan',
    key: 'pendidikan',
    placeholder: 'Pilih Tingkat Pendidikan',
    options: [
      { title: 'SD' },
      { title: 'SLTP' },
      { title: 'SLTA' },
      { title: 'S1/Sarjana' },
      { title: 'S2/Sarjana' }
    ]
  },
  {
    name: 'Agama',
    key: 'agama',
    placeholder: 'Pilih Agama',
    options: [
      { title: 'Islam' },
      { title: 'Kristen' },
      { title: 'Konghucu' },
      { title: 'Katolik' },
      { title: 'Budha' }
    ]
  },
  {
    name: 'Umur',
    key: 'umur',
    placeholder: 'Pilih Umur',
    options: [
      { title: '1' },
      { title: '2' },
      { title: '3' },
      { title: '4' },
      { title: '5' }
    ]
  },
  {
    name: 'Bulan Lahir',
    key: 'month',
    placeholder: 'Pilih Bulan Lahir',
    options: [
      { title: 'Januari' },
      { title: 'Februari' },
      { title: 'Maret' },
      { title: 'April' },
      { title: 'Mei' },
      { title: 'Juni' },
      { title: 'Juli' },
      { title: 'Agustus' },
      { title: 'September' },
      { title: 'Oktober' },
      { title: 'November' },
      { title: 'Desember' }
    ]
  },
  {
    name: 'Status',
    key: 'status',
    placeholder: 'Pilih Status',
    options: [{ title: 'Aktif' }, { title: 'Non Aktif' }]
  }
]

const EmployeeFilterComponent = () => {
  const router = useRouter()
  const classes = useStyles()

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

      console.log('listFilter', listFilter)

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
                label={item?.name}
                options={item?.options}
                name={item?.key}
                placeholder={item?.placeholder}
                value={filterType[item?.name]}
                multiple={true}
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
                onClick={() => handleAction('add')}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default EmployeeFilterComponent
