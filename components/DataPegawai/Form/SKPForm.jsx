/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const SKPForm = ({
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
    const error = errors?.targets
    if (error) error.splice(idx, 1)

    const newData = values?.targets.filter((item, index) => index !== idx)
    setFieldValue('targets', newData, false)
  }

  return (
    <CardAccordion title='Riwayat SKP' isExpand={isExpand}>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.targets &&
          values?.targets.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat SKP'
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
                      name={`targets[${idx}].month`}
                      value={itm?.month}
                      error={errors?.targets && errors?.targets[idx]?.month}
                      onChange={(val) => {
                        setFieldValue(`targets[${idx}].month`, val, false)
                      }}
                    />
                  </Grid>
                  {/* Tahun */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`targets[${idx}].year`}
                      value={itm?.year}
                      error={errors?.targets && errors?.targets[idx]?.year}
                      onChange={(val) => {
                        setFieldValue(`targets[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Appraisal */}
              <Grid item xs={6}>
                <Autocomplete
                  disabled
                  options={options?.period}
                  placeholder='Pilih Periode Penilaian'
                  label='Periode Penilaian *'
                  name={`targets[${idx}].appraisal`}
                  value={itm?.appraisal}
                  error={errors?.targets && errors?.targets[idx]?.appraisal}
                  onChange={(val) => {
                    setFieldValue(`targets[${idx}].appraisal`, val, false)
                  }}
                />
              </Grid>
              {/* Assessment Year */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Tahun'
                  placeholder='Masukkan Tahun'
                  name={`targets[${idx}].assessmentYear`}
                  value={itm?.assessmentYear}
                  error={
                    errors?.targets && errors?.targets[idx]?.assessmentYear
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`targets[${idx}].assessmentYear`, val, false)
                  }}
                />
              </Grid>
              {/* Work Behavior */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.workBehavior}
                  placeholder='Pilih Rating Perilaku Kerja'
                  label='Rating Perilaku Kerja *'
                  name={`targets[${idx}].workBehavior`}
                  value={itm?.workBehavior}
                  error={errors?.targets && errors?.targets[idx]?.workBehavior}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`targets[${idx}].workBehavior`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `targets[${idx}].workBehavior`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Performance */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.performance}
                  placeholder='Pilih Predikat Kinerja Pegawai'
                  label='Predikat Kinerja Pegawai *'
                  name={`targets[${idx}].performance`}
                  value={itm?.performance}
                  error={errors?.targets && errors?.targets[idx]?.performance}
                  onChange={(val) => {
                    setFieldValue(`targets[${idx}].performance`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `targets[${idx}].performance`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Performance Achievement */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.performanceAchievement}
                  placeholder='Pilih Capaian Kinerja Organisasi'
                  label='Capaian Kinerja Organisasi *'
                  name={`targets[${idx}].performanceAchievement`}
                  value={itm?.performanceAchievement}
                  error={
                    errors?.targets &&
                    errors?.targets[idx]?.performanceAchievement
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `targets[${idx}].performanceAchievement`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `targets[${idx}].performanceAchievement`
                      )
                    }, 1)
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

SKPForm.propTypes = {
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

export default SKPForm
