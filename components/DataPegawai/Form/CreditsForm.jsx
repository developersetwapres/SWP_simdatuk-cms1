/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Input } from '@/components/shared'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const CreditsForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        position: '',
        period: null,
        year: '',
        point: '',
        month: {
          start: null,
          end: null
        }
      }

      const updateData = [...data, newData]
      setFieldValue('credits', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('credits', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.educations
    if (error) error.splice(idx, 1)
    handleData(values?.credits, 'educations', idx)
  }

  return (
    <CardAccordion
      footer
      title='Penetapan Angka Kredit Terakhir'
      textAdd='Tambah Penetapan Angka Kredit Terakhir Baru'
      handleAdd={() => handleData(values?.credits, 'add')}
    >
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.credits &&
          values?.credits.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Penetapan Angka Kredit Terakhir'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Position */}
              <Grid item xs={6}>
                <Input
                  label='Jabatan'
                  placeholder='Masukkan Jabatan'
                  name={`credits[${idx}].position`}
                  value={itm?.position}
                  error={errors?.credits && errors?.credits[idx]?.position}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`credits[${idx}].position`, val, false)
                  }}
                />
              </Grid>
              {/* Period */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.periodCredits}
                  placeholder='Pilih Periode'
                  label='Periode *'
                  name={`credits[${idx}].period`}
                  value={itm?.period}
                  error={errors?.credits && errors?.credits[idx]?.period}
                  onChange={(val) => {
                    setFieldValue(`credits[${idx}].period`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`credits[${idx}].period`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Year */}
              <Grid item xs={6}>
                <Input
                  label='Tahun *'
                  placeholder='Masukkan Tahun'
                  name={`credits[${idx}].year`}
                  value={itm?.year}
                  error={errors?.credits && errors?.credits[idx]?.year}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`credits[${idx}].year`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`credits[${idx}].year`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Month */}
              {itm?.period !== 'Tahunan' && itm?.period !== null && (
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px'
                    }}
                  >
                    Bulan
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <Autocomplete
                      options={options?.months}
                      placeholder='Pilih Bulan Awal'
                      name={`credits[${idx}].month.start`}
                      value={itm?.month.start}
                      error={
                        errors?.credits && errors?.credits[idx]?.month?.start
                      }
                      onChange={(val) => {
                        setFieldValue(`credits[${idx}].month.start`, val, false)
                      }}
                    />
                    <Typography sx={{ fontWeight: 600 }}>-</Typography>
                    <Autocomplete
                      options={options?.months}
                      placeholder='Pilih Bulan Awal'
                      name={`credits[${idx}].month.end`}
                      value={itm?.month.end}
                      error={
                        errors?.credits && errors?.credits[idx]?.month?.end
                      }
                      onChange={(val) => {
                        setFieldValue(`credits[${idx}].month.end`, val, false)
                      }}
                    />
                  </Box>
                </Grid>
              )}
              {/* Point */}
              <Grid item xs={6}>
                <Input
                  type='number'
                  inputProps={{ min: '0' }}
                  label='Angka Kredit Terakhir'
                  placeholder='Masukkan Angka Kredit Terakhir'
                  name={`credits[${idx}].point`}
                  value={itm?.point}
                  error={errors?.credits && errors?.credits[idx]?.point}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`credits[${idx}].point`, val, false)
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

CreditsForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any,
  options: PropTypes.object
}

export default CreditsForm
