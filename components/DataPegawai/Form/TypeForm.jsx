/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const TypeForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options,
  isExpand
}) => {
  const handleDeleteData = (idx) => {
    const error = errors?.grades
    if (error) error.splice(idx, 1)

    const newData = values?.grades.filter((item, index) => index !== idx)
    setFieldValue('grades', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Golongan' isExpand={isExpand}>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.grades &&
          values?.grades.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Golongan'
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
                <Grid container spacing={2}>
                  {/* Month */}
                  <Grid item xs={6}>
                    <Autocomplete
                      disabled
                      options={options?.months}
                      placeholder='Pilih Bulan'
                      name={`grades[${idx}].month`}
                      value={itm?.month}
                      error={errors?.grades && errors?.grades[idx]?.month}
                      onChange={(val) => {
                        setFieldValue(`grades[${idx}].month`, val, false)
                      }}
                    />
                  </Grid>
                  {/* Year */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`grades[${idx}].year`}
                      value={itm?.year}
                      error={errors?.grades && errors?.grades[idx]?.year}
                      onChange={(val) => {
                        setFieldValue(`grades[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Grade */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.grade}
                  placeholder='Pilih Golongan'
                  label='Golongan / Pangkat *'
                  name={`grades[${idx}].grade`}
                  value={itm?.grade}
                  error={errors?.grades && errors?.grades[idx]?.grade}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].grade`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`grades[${idx}].grade`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Effective Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='TMT Golongan *'
                  placeholder='dd-mm-yyyy'
                  name={`grades[${idx}].effectiveDate`}
                  value={itm?.effectiveDate}
                  error={errors?.grades && errors?.grades[idx]?.effectiveDate}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].effectiveDate`, val, false)
                  }}
                />
              </Grid>
              {/* Decree */}
              <Grid item xs={6}>
                <Input
                  label='SK Golongan'
                  placeholder='Masukkan SK Golongan'
                  name={`grades[${idx}].decree`}
                  value={itm?.decree}
                  error={errors?.grades && errors?.grades[idx]?.decree}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`grades[${idx}].decree`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Document */}
              <Grid item xs={6}>
                <UploadFile
                  label='SK Golongan'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  onDelete={() => {
                    setFieldValue(`grades[${idx}].decreeDocument`, null, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `grades[${idx}].decreeDocument`
                      )
                    }, 1)
                  }}
                  name={`grades[${idx}].decreeDocument`}
                  value={itm?.decreeDocument}
                  error={errors?.grades && errors?.grades[idx]?.decreeDocument}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].decreeDocument`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `grades[${idx}].decreeDocument`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree Type */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.decreeType}
                  placeholder='Pilih Jenis SK Golongan'
                  label='Jenis SK Golongan *'
                  name={`grades[${idx}].decreeType`}
                  value={itm?.decreeType}
                  error={errors?.grades && errors?.grades[idx]?.decreeType}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].decreeType`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `grades[${idx}].decreeType`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree Number */}
              <Grid item xs={6}>
                <Input
                  label='No. SK Golongan *'
                  placeholder='Masukkan No. SK Golongan'
                  name={`grades[${idx}].decreeNumber`}
                  value={itm?.decreeNumber}
                  error={errors?.grades && errors?.grades[idx]?.decreeNumber}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`grades[${idx}].decreeNumber`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `grades[${idx}].decreeNumber`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal SK Golongan'
                  placeholder='dd-mm-yyyy'
                  name={`grades[${idx}].decreeDate`}
                  value={itm?.decreeDate}
                  error={errors?.grades && errors?.grades[idx]?.decreeDate}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].decreeDate`, val, false)
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Input
                  label='Keterangan Golongan'
                  placeholder='Masukkan Keterangan Golongan'
                  name={`grades[${idx}].description`}
                  value={itm?.description}
                  error={errors?.grades && errors?.grades[idx]?.description}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`grades[${idx}].description`, val, false)
                  }}
                />
              </Grid>
              {/* Status */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.status}
                  placeholder='Pilih Status Golongan'
                  label='Status Golongan *'
                  name={`grades[${idx}].status`}
                  value={itm?.status}
                  error={errors?.grades && errors?.grades[idx]?.status}
                  onChange={(val) => {
                    setFieldValue(`grades[${idx}].status`, val, false)
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

TypeForm.propTypes = {
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
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default TypeForm
