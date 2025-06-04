/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Search from '@/components/core/Search'
import { Autocomplete, Button, Input } from '@/components/shared'
import { FilterAlt } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { Formik } from 'formik'

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

const InitValue = {
  position: null,
  grade: null,
  employmentType: null,
  educationLevel: null,
  religion: null,
  months: null,
  status: null,
  age: { min: '', max: '' }
}

const EmployeeFilterComponent = ({
  options,
  onSearch = () => {},
  onFilter = () => {}
}) => {
  const router = useRouter()
  const classes = useStyles()
  const formikRef = useRef()

  const [isFilter, setIsFilter] = useState(false)

  const path = useMemo(() => {
    const pathname = {
      ASN: router.pathname.split('/')[2].toUpperCase() == 'ASN',
      NONASN: router.pathname.split('/')[2].toUpperCase() == 'NON-ASN',
      OUTSOURCING: router.pathname.split('/')[2].toUpperCase() == 'OUTSOURCING'
    }

    return pathname
  }, [router])

  const filterOptions = useMemo(() => {
    const newOptions = [
      {
        name: 'Jabatan',
        key: 'position',
        placeholder: 'Pilih Jabatan',
        options: options?.positions
      },
      {
        name: 'Golongan',
        key: 'grade',
        placeholder: 'Pilih Golongan',
        options: options?.grades
      },
      {
        name: `Jenis ${path?.NONASN ? 'Perbantuan' : 'Outsourcing'}`,
        key: 'employmentType',
        placeholder: `Pilih Jenis ${
          path?.NONASN ? 'Perbantuan' : 'Outsourcing'
        }`,
        options: options?.employmentType
      },
      {
        name: 'Tingkat Pendidikan',
        key: 'educationLevel',
        placeholder: 'Pilih Tingkat Pendidikan',
        options: options?.educationLevel
      },
      {
        name: 'Agama',
        key: 'religion',
        placeholder: 'Pilih Agama',
        options: options?.religion
      },
      {
        name: 'Umur',
        key: 'age',
        placeholder: 'Pilih Umur',
        options: []
      },
      {
        name: 'Bulan Lahir',
        key: 'months',
        placeholder: 'Pilih Bulan Lahir',
        options: options?.months
      },
      {
        name: 'Status',
        key: 'status',
        placeholder: 'Pilih Status',
        options: options?.status
      }
    ]

    return newOptions
  }, [options])

  const filter = useMemo(() => {
    const filtersDefault = [
      'position',
      'grade',
      'educationLevel',
      'religion',
      'age',
      'months',
      'status'
    ]

    if (path?.ASN) {
      const listFilter = filtersDefault

      return filterOptions.filter((itm) => {
        return listFilter.includes(itm?.key)
      })
    } else {
      const listFilter = filtersDefault
      listFilter.splice(2, 0, 'employmentType')

      return filterOptions.filter((itm) => {
        return listFilter.includes(itm?.key)
      })
    }
  }, [router, filterOptions])

  const handleFilter = (type, values) => {
    if (type == 'reset') {
      formikRef.current.resetForm()
      onFilter(InitValue)
    } else {
      onFilter(values)
    }
  }

  return (
    <Formik innerRef={formikRef} initialValues={InitValue} onSubmit={() => {}}>
      {({ values, setFieldValue = () => {} }) => (
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
                  {item?.key !== 'age' ? (
                    <Autocomplete
                      options={item?.options}
                      name={item?.key}
                      placeholder={item?.placeholder}
                      value={values[item?.key]}
                      // multiple={true}
                      label={item?.name}
                      onChange={(val) => {
                        setFieldValue(`${item?.key}`, val, false)
                      }}
                    />
                  ) : (
                    <Box>
                      <Typography
                        sx={{
                          marginBottom: '8px',
                          fontSize: '14px',
                          fontWeight: 500
                        }}
                      >
                        {item?.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          gap: '8px'
                        }}
                      >
                        <Input
                          type='number'
                          inputProps={{ min: 0, maxLength: 2 }}
                          placeholder='Min.'
                          name={`${item?.key}.min`}
                          value={values[item?.key]?.min}
                          onChange={(e) => {
                            const val = e?.target?.value
                            setFieldValue(`${item?.key}.min`, val, false)
                          }}
                        />
                        <Typography>-</Typography>
                        <Input
                          type='number'
                          inputProps={{ min: 0, maxLength: 2 }}
                          placeholder='Max.'
                          name={`${item?.key}.max`}
                          value={values[item?.key]?.max}
                          onChange={(e) => {
                            const val = e?.target?.value
                            setFieldValue(`${item?.key}.max`, val, false)
                          }}
                        />
                      </Box>
                    </Box>
                  )}
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
                    onClick={() => handleFilter('reset', {})}
                  />
                  <Button
                    text='Selesai'
                    color='primary'
                    onClick={() => handleFilter('filter', values)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Formik>
  )
}

EmployeeFilterComponent.propTypes = {
  options: PropTypes.object,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func
}

export default EmployeeFilterComponent
