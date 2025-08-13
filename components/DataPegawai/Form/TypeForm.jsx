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
  grades: []
}

const FormSchema = Yup.object().shape({
  grades: Yup.lazy((grades) => {
    if (Array.isArray(grades) && grades.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          decreeDocument: Yup.mixed()
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

const TypeForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.grades
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.grades.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('grades', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Pangkat / Golongan' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.grades &&
            formik?.values?.grades.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Pangkat / Golongan'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_GRADE,
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
                  <Grid container spacing={2}>
                    {/* Month */}
                    <Grid item xs={6}>
                      <Autocomplete
                        disabled
                        options={options?.months}
                        placeholder='Pilih Bulan'
                        name={`grades[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.grades &&
                          formik?.errors?.grades[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `grades[${idx}].month`,
                            val,
                            false
                          )
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
                        error={
                          formik?.errors?.grades &&
                          formik?.errors?.grades[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `grades[${idx}].year`,
                            val,
                            false
                          )
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
                    label='Pangkat / Golongan'
                    name={`grades[${idx}].grade`}
                    value={itm?.grade}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.grade
                    }
                    onChange={(val) => {
                      formik.setFieldValue(`grades[${idx}].grade`, val, false)
                      // setTimeout(() => {
                      //   formik.validateField(`grades[${idx}].grade`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Effective Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='TMT Golongan'
                    placeholder='dd-mm-yyyy'
                    name={`grades[${idx}].effectiveDate`}
                    value={itm?.effectiveDate}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.effectiveDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `grades[${idx}].effectiveDate`,
                        val,
                        false
                      )
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
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.decree
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(`grades[${idx}].decree`, val, false)
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
                      formik.setFieldValue(
                        `grades[${idx}].decreeDocument`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(`grades[${idx}].decreeDocument`)
                      }, 1)
                    }}
                    name={`grades[${idx}].decreeDocument`}
                    value={itm?.decreeDocument}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.decreeDocument
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `grades[${idx}].decreeDocument`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(`grades[${idx}].decreeDocument`)
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Decree Type */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.decreeType}
                    placeholder='Pilih Jenis SK Golongan'
                    label='Jenis SK Golongan'
                    name={`grades[${idx}].decreeType`}
                    value={itm?.decreeType}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.decreeType
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `grades[${idx}].decreeType`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`grades[${idx}].decreeType`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Decree Number */}
                <Grid item xs={6}>
                  <Input
                    label='No. SK Golongan'
                    placeholder='Masukkan No. SK Golongan'
                    name={`grades[${idx}].decreeNumber`}
                    value={itm?.decreeNumber}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.decreeNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `grades[${idx}].decreeNumber`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`grades[${idx}].decreeNumber`)
                      // }, 1)
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
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.decreeDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `grades[${idx}].decreeDate`,
                        val,
                        false
                      )
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
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.description
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `grades[${idx}].description`,
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
                    placeholder='Pilih Status Golongan'
                    label='Status Golongan'
                    name={`grades[${idx}].status`}
                    value={itm?.status}
                    error={
                      formik?.errors?.grades &&
                      formik?.errors?.grades[idx]?.status
                    }
                    onChange={(val) => {
                      formik.setFieldValue(`grades[${idx}].status`, val, false)
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

TypeForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default TypeForm
