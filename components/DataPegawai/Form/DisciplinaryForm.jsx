/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'
import {
  Access,
  PermissionsIDs,
  accessGranted
} from '@/utils/permissionManager'

const DisciplinaryForm = ({
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
  const handleGetError = (value) => {
    if (value?.to) {
      return value?.to
    } else {
      return value
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.disciplinaries
    if (error) error.splice(idx, 1)

    const newData = values?.disciplinaries.filter(
      (item, index) => index !== idx
    )
    setFieldValue('disciplinaries', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Hukuman Disiplin' isExpand={isExpand}>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.disciplinaries &&
          values?.disciplinaries.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Hukuman Disiplin'
                  isDelete={accessGranted(
                    PermissionsIDs.HISTORY_DISCIPLINARY,
                    Access.DELETE
                  )}
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
                      name={`disciplinaries[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.disciplinaries &&
                        errors?.disciplinaries[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `disciplinaries[${idx}].month`,
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                  {/* Tahun */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`disciplinaries[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.disciplinaries &&
                        errors?.disciplinaries[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(`disciplinaries[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Grade */}
              <Grid item xs={6}>
                <Input
                  label='Pangkat / Golongan'
                  placeholder='Masukkan Pangkat / Golongan'
                  name={`disciplinaries[${idx}].grade`}
                  value={itm?.grade}
                  error={
                    errors?.disciplinaries && errors?.disciplinaries[idx]?.grade
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`disciplinaries[${idx}].grade`, val, false)
                  }}
                />
              </Grid>
              {/* Position */}
              <Grid item xs={6}>
                <Input
                  label='Jabatan'
                  placeholder='Masukkan Jabatan'
                  name={`disciplinaries[${idx}].position`}
                  value={itm?.position}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.position
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`disciplinaries[${idx}].position`, val, false)
                  }}
                />
              </Grid>
              {/* Type of Disciple */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.discipleType}
                  placeholder='Pilih Jenis Hukuman'
                  label='Jenis Hukuman *'
                  name={`disciplinaries[${idx}].discipleType`}
                  value={itm?.discipleType}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.discipleType
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `disciplinaries[${idx}].discipleType`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `disciplinaries[${idx}].discipleType`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Level of Disciple */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Tingkat Hukuman'
                  placeholder='Masukkan Tingkat Hukuman'
                  name={`disciplinaries[${idx}].discipleLevel`}
                  value={itm?.discipleLevel}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.discipleLevel
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].discipleLevel`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Allowance Deducation */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Pemotongan Tunjangan Kinerja(Persentase)'
                  placeholder='Masukkan Pemotongan Tunjangan Kinerja'
                  name={`disciplinaries[${idx}].allowanceDeducation`}
                  value={itm?.allowanceDeducation}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.allowanceDeducation
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].allowanceDeducation`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Allowance Duration */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Jangka Waktu Pemotongan'
                  placeholder='Masukkan Jangka Waktu Pemotongan'
                  name={`disciplinaries[${idx}].allowanceDuration`}
                  value={itm?.allowanceDuration}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.allowanceDuration
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].allowanceDuration`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `disciplinaries[${idx}].allowanceDuration`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree Number */}
              <Grid item xs={6}>
                <Input
                  label='No. SK Hukuman Disiplin'
                  placeholder='Masukkan No. SK Hukuman Disiplin'
                  name={`disciplinaries[${idx}].decreeNumber`}
                  value={itm?.decreeNumber}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.decreeNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].decreeNumber`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Decree Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal SK Hukuman Disiplin'
                  placeholder='dd-mm-yy'
                  name={`disciplinaries[${idx}].decreeDate`}
                  value={itm?.decreeDate}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.decreeDate
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `disciplinaries[${idx}].decreeDate`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Disciple Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  mode='range'
                  label='Tanggal Hukuman Disiplin *'
                  placeholder='dd-mm-yy - dd-mm-yy'
                  name={`disciplinaries[${idx}].discipleDate`}
                  value={itm?.discipleDate}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.discipleDate
                      ? handleGetError(
                          errors?.disciplinaries[idx]?.discipleDate
                        )
                      : null
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `disciplinaries[${idx}].discipleDate`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `disciplinaries[${idx}].discipleDate`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Status */}
              {itm?.status && (
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Status'
                    placeholder='Masukkan Status'
                    name={`disciplinaries[${idx}].status`}
                    value={itm?.status}
                    error={
                      errors?.disciplinaries &&
                      errors?.disciplinaries[idx]?.status
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(`disciplinaries[${idx}].status`, val, false)
                    }}
                  />
                </Grid>
              )}
              {/* Validity */}
              {itm?.validity && (
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Masa Berlaku'
                    placeholder='Masukkan Masa Berlaku'
                    name={`disciplinaries[${idx}].validity`}
                    value={itm?.validity}
                    error={
                      errors?.disciplinaries &&
                      errors?.disciplinaries[idx]?.validity
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        `disciplinaries[${idx}].validity`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
              )}
              {/* Authorized Official */}
              <Grid item xs={6}>
                <Input
                  label='Pejabat Berwenang'
                  placeholder='Masukkan Pejabat Berwenang'
                  name={`disciplinaries[${idx}].authorizedOfficial`}
                  value={itm?.authorizedOfficial}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.authorizedOfficial
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].authorizedOfficial`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Name Authorized Official */}
              <Grid item xs={6}>
                <Input
                  label='Nama Pejabat Berwenang'
                  placeholder='Masukkan Nama Pejabat Berwenang'
                  name={`disciplinaries[${idx}].authorizedOfficialName`}
                  value={itm?.authorizedOfficialName}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.authorizedOfficialName
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].authorizedOfficialName`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Input
                  label='Keterangan'
                  placeholder='Masukkan Keterangan'
                  name={`disciplinaries[${idx}].description`}
                  value={itm?.description}
                  error={
                    errors?.disciplinaries &&
                    errors?.disciplinaries[idx]?.description
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `disciplinaries[${idx}].description`,
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

DisciplinaryForm.propTypes = {
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

export default DisciplinaryForm
