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
  trainingFungsionals: []
}

const FormSchema = Yup.object().shape({
  trainingFungsionals: Yup.lazy((trainingFungsionals) => {
    if (Array.isArray(trainingFungsionals) && trainingFungsionals.length > 0) {
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

const FunctionalTrainingForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.trainingFungsionals
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.trainingFungsionals.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('trainingFungsionals', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Pelatihan Fungsional' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.trainingFungsionals &&
            formik?.values?.trainingFungsionals.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Pelatihan Fungsional'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_FUNCTIONAL,
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
                        name={`trainingFungsionals[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.trainingFungsionals &&
                          formik?.errors?.trainingFungsionals[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
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
                          formik?.errors?.trainingFungsionals &&
                          formik?.errors?.trainingFungsionals[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.trainingName
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.number
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.level
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.date
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
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
                    label='Jam Pelajaran'
                    placeholder='Masukkan Jam Pelajaran'
                    name={`trainingFungsionals[${idx}].duration`}
                    value={itm?.duration}
                    error={
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.duration
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.organizer
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.link
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.trainingFungsionals &&
                      formik?.errors?.trainingFungsionals[idx]?.certificate
                    }
                    onDelete={() => {
                      formik.setFieldValue(
                        `trainingFungsionals[${idx}].certificate`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(
                          `trainingFungsionals[${idx}].certificate`
                        )
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik.setFieldValue(
                        `trainingFungsionals[${idx}].certificate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(
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
    </form>
  )
})

FunctionalTrainingForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default FunctionalTrainingForm
