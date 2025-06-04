/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const isFile = (value) => {
  return typeof value !== 'string'
}

const InitValue = {
  assessments: []
}

const FormSchema = Yup.object().shape({
  assessments: Yup.lazy((assesments) => {
    if (Array.isArray(assesments) && assesments.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          // date: Yup.string().required('Tanggal tidak boleh kosong'),
          // point: Yup.string().required('Hasil tidak boleh kosong'),
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

const AssessmentForm = forwardRef((props, ref) => {
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

  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        date: '',
        point: null,
        organizer: '',
        certificate: null,
        type: 1
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('assessments', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('assessments', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.assessments
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.assessments, 'delete', idx)
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Hasil Assesment'
        textAdd='Tambah Hasil Assesment Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.assessments, 'add')}
      >
        <Grid container spacing={3}>
          {formik?.values?.assessments &&
            formik?.values?.assessments.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Hasil Assesment'
                    handleDelete={() => handleDeleteData(idx)}
                  />
                </Grid>
                {/* Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='Tanggal'
                    placeholder='dd-mm-yyyy'
                    name={`assessments[${idx}].date`}
                    value={itm?.date}
                    error={
                      formik?.errors?.assessments &&
                      formik?.errors?.assessments[idx]?.date
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `assessments[${idx}].date`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`assessments[${idx}].date`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Point */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.assessments}
                    label='Hasil'
                    placeholder='Pilih Hasil'
                    name={`assessments[${idx}].point`}
                    value={itm?.point}
                    error={
                      formik?.errors?.assessments &&
                      formik?.errors?.assessments[idx]?.point
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `assessments[${idx}].point`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`assessments[${idx}].point`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Organizer */}
                <Grid item xs={6}>
                  <Input
                    label='Penyelenggara'
                    placeholder='Masukkan Penyelenggara'
                    name={`assessments[${idx}].organizer`}
                    value={itm?.organizer}
                    error={
                      formik?.errors?.assessments &&
                      formik?.errors?.assessments[idx]?.organizer
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `assessments[${idx}].organizer`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Certificate */}
                <Grid item xs={6}>
                  <UploadFile
                    label='File Pendukung'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`assessments[${idx}].certificate`}
                    value={itm?.certificate}
                    error={
                      formik?.errors?.assessments &&
                      formik?.errors?.assessments[idx]?.certificate
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `assessments[${idx}].certificate`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`assessments[${idx}].certificate`)
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `assessments[${idx}].certificate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`assessments[${idx}].certificate`)
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

AssessmentForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default AssessmentForm
