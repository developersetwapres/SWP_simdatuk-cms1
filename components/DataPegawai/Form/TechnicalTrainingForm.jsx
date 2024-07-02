import React from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const TechnicalTrainingForm = ({
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
    <CardAccordion title='Riwayat Pelatihan Teknis'>
      <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
        {values?.trainingTechnicals &&
          values?.trainingTechnicals.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Riwayat Pelatihan Teknis'
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
                      name={`trainingTechnicals[${idx}].month`}
                      value={itm?.month}
                      error={
                        errors?.trainingTechnicals &&
                        errors?.trainingTechnicals[idx]?.month
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingTechnicals[${idx}].month`,
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
                      name={`trainingTechnicals[${idx}].year`}
                      value={itm?.year}
                      error={
                        errors?.trainingTechnicals &&
                        errors?.trainingTechnicals[idx]?.year
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `trainingTechnicals[${idx}].year`,
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
                  name={`trainingTechnicals[${idx}].trainingName`}
                  value={itm?.trainingName}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.trainingName
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingTechnicals[${idx}].trainingName`,
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
                  name={`trainingTechnicals[${idx}].number`}
                  value={itm?.number}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.number
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingTechnicals[${idx}].number`,
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
                  name={`trainingTechnicals[${idx}].date`}
                  value={itm?.date}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.date
                  }
                  onChange={(val) => {
                    setFieldValue(`trainingTechnicals[${idx}].date`, val, false)
                  }}
                />
              </Grid>
              {/* Duration */}
              <Grid item xs={6}>
                <Input
                  disabled
                  label='Durasi Pelatihan(Hari)'
                  placeholder='Masukkan Durasi Pelatihan(Hari)'
                  name={`trainingTechnicals[${idx}].duration`}
                  value={itm?.duration}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.duration
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `trainingTechnicals[${idx}].duration`,
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
                  name={`trainingTechnicals[${idx}].link`}
                  value={itm?.link}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.link
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`trainingTechnicals[${idx}].link`, val, false)
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
                  name={`trainingTechnicals[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.trainingTechnicals &&
                    errors?.trainingTechnicals[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `trainingTechnicals[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingTechnicals[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `trainingTechnicals[${idx}].certificate`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `trainingTechnicals[${idx}].certificate`
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

TechnicalTrainingForm.propTypes = {
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

export default TechnicalTrainingForm
