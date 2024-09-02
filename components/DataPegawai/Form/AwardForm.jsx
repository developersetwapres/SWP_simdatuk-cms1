/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const AwardForm = ({
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
    const error = errors?.recognitions
    if (error) error.splice(idx, 1)

    const newData = values?.recognitions.filter((item, index) => index !== idx)
    setFieldValue('recognitions', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Penghargaan'>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.recognitions &&
          values?.recognitions.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Jabatan'
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
                      name={`recognitions[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.recognitions && errors?.recognitions[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(`recognitions[${idx}].month`, val, false)
                      }}
                    />
                  </Grid>
                  {/* Tahun */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`recognitions[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.recognitions && errors?.recognitions[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(`recognitions[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Name */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Nama Penghargaan *'
                  placeholder='Masukkan Nama Penghargaan'
                  name={`recognitions[${idx}].name`}
                  value={itm?.name}
                  error={
                    errors?.recognitions && errors?.recognitions[idx]?.name
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`recognitions[${idx}].name`, val, false)
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Keterangan Penghargaan'
                  placeholder='Masukkan Keterangan Penghargaan'
                  name={`recognitions[${idx}].description`}
                  value={itm?.description}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.description
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `recognitions[${idx}].description`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Decree Type */}
              <Grid item xs={6}>
                <Autocomplete
                  disabled
                  options={options?.decreeType}
                  placeholder='Pilih Jenis SK'
                  label='Jenis SK *'
                  name={`recognitions[${idx}].decreeType`}
                  value={itm?.decreeType}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.decreeType
                  }
                  onChange={(val) => {
                    setFieldValue(`recognitions[${idx}].decreeType`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  disabled
                  label='Tanggal SK *'
                  placeholder='dd-mm-yyyy'
                  name={`recognitions[${idx}].decreeDate`}
                  value={itm?.decreeDate}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.decreeDate
                  }
                  onChange={(val) => {
                    setFieldValue(`recognitions[${idx}].decreeDate`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Number */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='No. SK Penghargaan *'
                  placeholder='Masukkan No. SK Penghargaan'
                  name={`recognitions[${idx}].decreeNumber`}
                  value={itm?.decreeNumber}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.decreeNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `recognitions[${idx}].decreeNumber`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Decree Year */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Tahun SK'
                  placeholder='Masukkan Tahun SK'
                  name={`recognitions[${idx}].decreeYear`}
                  value={itm?.decreeYear}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.decreeYear
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`recognitions[${idx}].decreeYear`, val, false)
                  }}
                />
              </Grid>
              {/* Institutions */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Instansi Pemberi Penghargaan'
                  placeholder='Masukkan Instansi Pemberi Penghargaan'
                  name={`recognitions[${idx}].institution`}
                  value={itm?.institution}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.institution
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `recognitions[${idx}].institution`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Receipt Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  disabled
                  label='Tanggal Terima'
                  placeholder='dd-mm-yyyy'
                  name={`recognitions[${idx}].receiptDate`}
                  value={itm?.receiptDate}
                  error={
                    errors?.recognitions &&
                    errors?.recognitions[idx]?.receiptDate
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `recognitions[${idx}].receiptDate`,
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

AwardForm.propTypes = {
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

export default AwardForm
