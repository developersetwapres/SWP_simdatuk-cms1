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

const StructuralTrainingForm = ({
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
    const error = errors?.trainingStructurals
    if (error) error.splice(idx, 1)

    const newData = values?.trainingStructurals.filter(
      (item, index) => index !== idx
    )
    setFieldValue('trainingStructurals', newData, false)
  }

  return (
    <CardAccordion title='Riwayat Pelatihan Struktural' isExpand={isExpand}>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.trainingStructurals &&
          values?.trainingStructurals.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Pelatihan Struktural'
                  isDelete={accessGranted(
                    PermissionsIDs.HISTORY_STRUCTURAL,
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
                      name={`trainingStructurals[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.trainingStructurals &&
                        errors?.trainingStructurals[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingStructurals[${idx}].month`,
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
                      name={`trainingStructurals[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.trainingStructurals &&
                        errors?.trainingStructurals[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingStructurals[${idx}].year`,
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Training Name */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Nama Diklat *'
                  placeholder='Masukkan Nama Diklat'
                  name={`trainingStructurals[${idx}].trainingName`}
                  value={itm?.trainingName}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.trainingName
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].trainingName`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Number */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='No. Surat Perintah *'
                  placeholder='Masukkan No. Surat Perintah'
                  name={`trainingStructurals[${idx}].number`}
                  value={itm?.number}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.number
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].number`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Level */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Jenjang'
                  placeholder='Masukkan Jenjang'
                  name={`trainingStructurals[${idx}].level`}
                  value={itm?.level}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.level
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].level`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingStructurals[${idx}].level`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  disabled
                  label='Tanggal Pelaksanaan *'
                  placeholder='dd-mm-yyyy'
                  name={`trainingStructurals[${idx}].date`}
                  value={itm?.date}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.date
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `trainingStructurals[${idx}].date`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Duration */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Durasi Pelatihan(Hari)'
                  placeholder='Masukkan Durasi Pelatihan(Hari)'
                  name={`trainingStructurals[${idx}].duration`}
                  value={itm?.duration}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.duration
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].duration`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Organizer */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Penyelenggara'
                  placeholder='Masukkan Penyelenggara'
                  name={`trainingStructurals[${idx}].organizer`}
                  value={itm?.organizer}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.organizer
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].organizer`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Link */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Link Materi Pelatihan'
                  placeholder='Masukkan Link Materi Pelatihan'
                  name={`trainingStructurals[${idx}].link`}
                  value={itm?.link}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.link
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingStructurals[${idx}].link`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Certificate */}
              <Grid item xs={6}>
                <UploadFile
                  label='Sertifikat'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  name={`trainingStructurals[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.trainingStructurals &&
                    errors?.trainingStructurals[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `trainingStructurals[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingStructurals[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `trainingStructurals[${idx}].certificate`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingStructurals[${idx}].certificate`
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

StructuralTrainingForm.propTypes = {
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

export default StructuralTrainingForm
