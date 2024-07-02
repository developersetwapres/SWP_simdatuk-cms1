import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const FunctionalTrainingForm = ({
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
  return (
    <CardAccordion title='Riwayat Pelatihan Fungsional'>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.trainingFungsionals &&
          values?.trainingFungsionals.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Pelatihan Fungsional'
                  handleDelete={() => {}}
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
                      name={`trainingFungsionals[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.trainingFungsionals &&
                        errors?.trainingFungsionals[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingFungsionals[${idx}].month`,
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
                      name={`trainingFungsionals[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.trainingFungsionals &&
                        errors?.trainingFungsionals[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingFungsionals[${idx}].year`,
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
                  name={`trainingFungsionals[${idx}].trainingName`}
                  value={itm?.trainingName}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.trainingName
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].trainingName`,
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
                  name={`trainingFungsionals[${idx}].number`}
                  value={itm?.number}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.number
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].number`,
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
                  name={`trainingFungsionals[${idx}].level`}
                  value={itm?.level}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.level
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].level`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  disabled
                  label='Tanggal Pelaksanaan *'
                  placeholder='dd-mm-yyyy'
                  name={`trainingFungsionals[${idx}].date`}
                  value={itm?.date}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.date
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `trainingFungsionals[${idx}].date`,
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
                  name={`trainingFungsionals[${idx}].duration`}
                  value={itm?.duration}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.duration
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].duration`,
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
                  name={`trainingFungsionals[${idx}].organizer`}
                  value={itm?.organizer}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.organizer
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].organizer`,
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
                  name={`trainingFungsionals[${idx}].link`}
                  value={itm?.link}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.link
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingFungsionals[${idx}].link`,
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
                  name={`trainingFungsionals[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.trainingFungsionals &&
                    errors?.trainingFungsionals[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `trainingFungsionals[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingFungsionals[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `trainingFungsionals[${idx}].certificate`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingFungsionals[${idx}].certificate`
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

FunctionalTrainingForm.propTypes = {
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

export default FunctionalTrainingForm
