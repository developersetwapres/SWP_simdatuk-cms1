/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
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
import { useFormik } from 'formik'
import * as Yup from 'yup'

const isFile = (value) => {
  return typeof value !== 'string'
}

const InitValue = {
  trainingTechnicals: []
}

const FormSchema = Yup.object().shape({
  trainingTechnicals: Yup.lazy((trainingTechnicals) => {
    if (Array.isArray(trainingTechnicals) && trainingTechnicals.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          certificate: Yup.mixed()
            .nullable()
            .test(
              'fileType',
              'Format file harus PNG, JPG, atau PDF',
              (value) => {
                if (!value || !isFile(value)) return true
                const fileType = value && value.type
                return (
                  fileType === 'image/png' ||
                  fileType === 'image/jpeg' ||
                  fileType === 'application/pdf'
                )
              }
            )
            .test(
              'fileSize',
              'Ukuran file tidak boleh lebih dari 2MB',
              (value) => {
                const maxSize = 2 * 1024 * 1024
                if (!value || !isFile(value)) return true
                return value.size <= maxSize
              }
            )
        })
      )
    } else {
      return Yup.array()
    }
  })
})

const TechnicalTrainingForm = forwardRef((props, ref) => {
  const { options, isExpand } = props

  const formik = useFormik({
    initialValues: InitValue,
    validationSchema: FormSchema,
    onSubmit: () => {},
    innerRef: ref
  })

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        await FormSchema.validate(formik?.values, { abortEarly: false })

        formik.setErrors({})
        ref.current.setErrors({})

        return ref.current
      } catch (err) {
        if (!err.inner || err.inner.length === 0) {
          return
        }

        const newErrors = {}
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message

          formik.setFieldError(error.path, error.message)
          if (ref.current) {
            ref.current.setFieldError(error.path, error.message)
          }
        })

        formik.setErrors(newErrors)
        if (ref.current) ref.current.setErrors(newErrors)

        const firstErrorField = err.inner[0].path
        const firstErrorEl = document.querySelector(
          `[name="${firstErrorField}"]`
        )

        if (firstErrorEl) {
          setTimeout(() => {
            firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'end' })
          }, 5)
        }

        return ref.current
      }
    },
    ...Object.fromEntries(
      Object.entries(formik)
        .filter((form) => form[0] !== 'validateForm')
        .map((form) => form)
    )
  }))

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.trainingTechnicals
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.trainingTechnicals.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('trainingTechnicals', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Pelatihan Teknis' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.trainingTechnicals &&
            formik?.values?.trainingTechnicals.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Pelatihan Teknis'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_TECHNICAL,
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
                    Periode Input Riwayat
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
                          formik?.errors?.trainingTechnicals &&
                          formik?.errors?.trainingTechnicals[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
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
                          formik?.errors?.trainingTechnicals &&
                          formik?.errors?.trainingTechnicals[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
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
                    label='Nama Diklat'
                    placeholder='Masukkan Nama Diklat'
                    name={`trainingTechnicals[${idx}].trainingName`}
                    value={itm?.trainingName}
                    error={
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.trainingName
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                    label='No. Surat Perintah'
                    placeholder='Masukkan No. Surat Perintah'
                    name={`trainingTechnicals[${idx}].number`}
                    value={itm?.number}
                    error={
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.number
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                    label='Tanggal Pelaksanaan'
                    placeholder='dd-mm-yyyy'
                    name={`trainingTechnicals[${idx}].date`}
                    value={itm?.date}
                    error={
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.date
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `trainingTechnicals[${idx}].date`,
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
                    label='Jam Pelajaran'
                    placeholder='Masukkan Jam Pelajaran'
                    name={`trainingTechnicals[${idx}].duration`}
                    value={itm?.duration}
                    error={
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.duration
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.link
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `trainingTechnicals[${idx}].link`,
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
                    name={`trainingTechnicals[${idx}].certificate`}
                    value={itm?.certificate}
                    error={
                      formik?.errors?.trainingTechnicals &&
                      formik?.errors?.trainingTechnicals[idx]?.certificate
                    }
                    onDelete={() => {
                      formik.setFieldValue(
                        `trainingTechnicals[${idx}].certificate`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(
                          `trainingTechnicals[${idx}].certificate`
                        )
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik.setFieldValue(
                        `trainingTechnicals[${idx}].certificate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(
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
    </form>
  )
})

TechnicalTrainingForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default TechnicalTrainingForm
