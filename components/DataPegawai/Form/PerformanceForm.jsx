/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const PerformanceForm = ({
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
  const handleDeleteData = (idx) => {
    const error = errors?.performances
    if (error) error.splice(idx, 1)

    const newData = values?.performances.filter((item, index) => index !== idx)
    setFieldValue('performances', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Penilaian Prestasi Kerja'>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.performances &&
          values?.performances.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Penilaian Prestasi Kerja'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Period */}
              <Grid item xs={6}>
                <Typography
                  sx={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  Periode Input Riwayat *
                </Typography>
                <Grid container spacing={3}>
                  {/* Bulan */}
                  <Grid item xs={6}>
                    <Autocomplete
                      disabled
                      options={options?.months}
                      placeholder='Pilih Bulan'
                      multiple={false}
                      name={`performances[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.performances && errors?.performances[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(`performances[${idx}].month`, val, false)
                      }}
                    />
                  </Grid>
                  {/* Tahun */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`performances[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.performances && errors?.performances[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(`performances[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Appraisal */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Periode PPK *'
                  placeholder='Masukkan Periode PPK'
                  name={`performances[${idx}].appraisal`}
                  value={itm?.appraisal}
                  error={
                    errors?.performances && errors?.performances[idx]?.appraisal
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`performances[${idx}].appraisal`, val, false)
                  }}
                />
              </Grid>
              {/* Point */}
              <Grid item xs={6}>
                <Input
                  label='Nilai Prestasi Kerja *'
                  placeholder='Masukkan Nilai Prestasi Kerja'
                  name={`performances[${idx}].point`}
                  value={itm?.point}
                  error={
                    errors?.performances && errors?.performances[idx]?.point
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`performances[${idx}].point`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `performances[${idx}].point`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.performancesType}
                  placeholder='Pilih Keterangan'
                  label='Keterangan'
                  name={`performances[${idx}].description`}
                  value={itm?.description}
                  error={
                    errors?.performances &&
                    errors?.performances[idx]?.description
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `performances[${idx}].description`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

PerformanceForm.propTypes = {
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

export default PerformanceForm
