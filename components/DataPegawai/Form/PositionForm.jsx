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
import {
  Access,
  PermissionsIDs,
  accessGranted
} from '@/utils/permissionManager'

const PositionForm = ({
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
    const error = errors?.positions
    if (error) error.splice(idx, 1)

    const newData = values?.positions.filter((item, index) => index !== idx)
    setFieldValue('positions', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Jabatan' isExpand={isExpand}>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.positions &&
          values?.positions.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Jabatan'
                  isDelete={accessGranted(
                    PermissionsIDs.HISTORY_POSITION,
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
                      name={`positions[${idx}].month`}
                      value={itm?.month}
                      error={errors?.positions && errors?.positions[idx]?.month}
                      onChange={(val) => {
                        setFieldValue(`positions[${idx}].month`, val, false)
                      }}
                    />
                  </Grid>
                  {/* Tahun */}
                  <Grid item xs={6}>
                    <DatepickerYear
                      isClear
                      disabled
                      placeholder='Pilih Tahun'
                      name={`positions[${idx}].year`}
                      value={itm?.year}
                      error={errors?.positions && errors?.positions[idx]?.year}
                      onChange={(val) => {
                        setFieldValue(`positions[${idx}].year`, val, false)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Position */}
              <Grid item xs={6}>
                <Input
                  label='Jabatan *'
                  placeholder='Masukkan Jabatan'
                  name={`positions[${idx}].position`}
                  value={itm?.position}
                  error={errors?.positions && errors?.positions[idx]?.position}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`positions[${idx}].position`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `positions[${idx}].position`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Group */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.group}
                  placeholder='Pilih Rumpun'
                  label='Rumpun'
                  name={`positions[${idx}].group`}
                  value={itm?.group}
                  error={errors?.positions && errors?.positions[idx]?.group}
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].group`, val, false)
                    // setTimeout(() => {
                    //   formikRef.current.validateField(`positions[${idx}].group`)
                    // }, 1)
                  }}
                />
              </Grid>
              {/* Level */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.echelon}
                  placeholder='Pilih Jenjang Jabatan'
                  label='Jenjang Jabatan'
                  name={`positions[${idx}].level`}
                  value={itm?.level}
                  error={errors?.positions && errors?.positions[idx]?.level}
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].level`, val, false)
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.positionDescription}
                  placeholder='Pilih Keterangan Jabatan'
                  label='Keterangan Jabatan'
                  name={`positions[${idx}].description`}
                  value={itm?.description}
                  error={
                    errors?.positions && errors?.positions[idx]?.description
                  }
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].description`, val, false)
                  }}
                />
              </Grid>
              {/* Effective Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='TMT Menjabat *'
                  placeholder='dd-mm-yyyy'
                  name={`positions[${idx}].effectiveDate`}
                  value={itm?.effectiveDate}
                  error={
                    errors?.positions && errors?.positions[idx]?.effectiveDate
                  }
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].effectiveDate`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `positions[${idx}].effectiveDate`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree */}
              <Grid item xs={6}>
                <Input
                  label='SK Menjabat'
                  placeholder='Masukkan SK Menjabat'
                  name={`positions[${idx}].decree`}
                  value={itm?.decree}
                  error={errors?.positions && errors?.positions[idx]?.decree}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`positions[${idx}].decree`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Document */}
              <Grid item xs={6}>
                <UploadFile
                  label='SK Jabatan'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  name={`positions[${idx}].decreeDocument`}
                  value={itm?.decreeDocument}
                  error={
                    errors?.positions && errors?.positions[idx]?.decreeDocument
                  }
                  onDelete={() => {
                    setFieldValue(
                      `positions[${idx}].decreeDocument`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `positions[${idx}].decreeDocument`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `positions[${idx}].decreeDocument`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `positions[${idx}].decreeDocument`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Decree Type */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.decreeType}
                  placeholder='Pilih Jenis SK Jabatan'
                  label='Jenis SK Jabatan'
                  name={`positions[${idx}].decreeType`}
                  value={itm?.decreeType}
                  error={
                    errors?.positions && errors?.positions[idx]?.decreeType
                  }
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].decreeType`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Number */}
              <Grid item xs={6}>
                <Input
                  label='No. SK Jabatan'
                  placeholder='Masukkan No. SK Jabatan'
                  name={`positions[${idx}].decreeNumber`}
                  value={itm?.decreeNumber}
                  error={
                    errors?.positions && errors?.positions[idx]?.decreeNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`positions[${idx}].decreeNumber`, val, false)
                  }}
                />
              </Grid>
              {/* Decree Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal SK Jabatan'
                  placeholder='dd-mm-yyyy'
                  name={`positions[${idx}].decreeDate`}
                  value={itm?.decreeDate}
                  error={
                    errors?.positions && errors?.positions[idx]?.decreeDate
                  }
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].decreeDate`, val, false)
                  }}
                />
              </Grid>
              {/* Termination Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='TMT Selesai'
                  placeholder='dd-mm-yyyy'
                  name={`positions[${idx}].terminationDate`}
                  value={itm?.terminationDate}
                  error={
                    errors?.positions && errors?.positions[idx]?.terminationDate
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `positions[${idx}].terminationDate`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Termination Decree */}
              <Grid item xs={6}>
                <Input
                  label='SK Selesai'
                  placeholder='Masukkan SK Selesai'
                  name={`positions[${idx}].terminationDecree`}
                  value={itm?.terminationDecree}
                  error={
                    errors?.positions &&
                    errors?.positions[idx]?.terminationDecree
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `positions[${idx}].terminationDecree`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Termintaion Decree Type */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.decreeType}
                  placeholder='Pilih Jenis SK Selesai'
                  label='Jenis SK Selesai'
                  name={`positions[${idx}].terminationDecreeType`}
                  value={itm?.terminationDecreeType}
                  error={
                    errors?.positions &&
                    errors?.positions[idx]?.terminationDecreeType
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `positions[${idx}].terminationDecreeType`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Termination Decree Number */}
              <Grid item xs={6}>
                <Input
                  label='No. SK Selesai'
                  placeholder='Masukkan No. SK Selesai'
                  name={`positions[${idx}].terminationDecreeNumber`}
                  value={itm?.terminationDecreeNumber}
                  error={
                    errors?.positions &&
                    errors?.positions[idx]?.terminationDecreeNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `positions[${idx}].terminationDecreeNumber`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Termination Decree Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal SK Selesai'
                  placeholder='dd-mm-yyyy'
                  name={`positions[${idx}].terminationDecreeDate`}
                  value={itm?.terminationDecreeDate}
                  error={
                    errors?.positions &&
                    errors?.positions[idx]?.terminationDecreeDate
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `positions[${idx}].terminationDecreeDate`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Status */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.status}
                  placeholder='Pilih Status Jabatan'
                  label='Status Jabatan *'
                  name={`positions[${idx}].status`}
                  value={itm?.status}
                  error={errors?.positions && errors?.positions[idx]?.status}
                  onChange={(val) => {
                    setFieldValue(`positions[${idx}].status`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `positions[${idx}].status`
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

PositionForm.propTypes = {
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

export default PositionForm
