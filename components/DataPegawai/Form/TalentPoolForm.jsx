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
  talentPools: []
}

const FormSchema = Yup.object().shape({
  talentPools: Yup.lazy((talentPools) => {
    if (Array.isArray(talentPools) && talentPools.length > 0) {
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

const TalentPoolForm = forwardRef((props, ref) => {
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
        type: 3
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('talentPools', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('talentPools', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.talentPools
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.talentPools, 'delete', idx)
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Hasil Talent Pool'
        textAdd='Tambah Hasil Talent Pool Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.talentPools, 'add')}
      >
        <Grid container spacing={3}>
          {formik?.values?.talentPools &&
            formik?.values?.talentPools.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Hasil Talent Pool'
                    handleDelete={() => handleDeleteData(idx)}
                  />
                </Grid>
                {/* Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='Tanggal'
                    placeholder='dd-mm-yyyy'
                    name={`talentPools[${idx}].date`}
                    value={itm?.date}
                    error={
                      formik?.errors?.talentPools &&
                      formik?.errors?.talentPools[idx]?.date
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `talentPools[${idx}].date`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`talentPools[${idx}].date`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Point */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.talentPools}
                    label='Hasil'
                    placeholder='Pilih Hasil'
                    name={`talentPools[${idx}].point`}
                    value={itm?.point}
                    error={
                      formik?.errors?.talentPools &&
                      formik?.errors?.talentPools[idx]?.point
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `talentPools[${idx}].point`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`talentPools[${idx}].point`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Organizer */}
                <Grid item xs={6}>
                  <Input
                    label='Penyelenggara'
                    placeholder='Masukkan Penyelenggara'
                    name={`talentPools[${idx}].organizer`}
                    value={itm?.organizer}
                    error={
                      formik?.errors?.talentPools &&
                      formik?.errors?.talentPools[idx]?.organizer
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `talentPools[${idx}].organizer`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/*  */}
                <Grid item xs={6}>
                  <UploadFile
                    label='File Pendukung'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`talentPools[${idx}].certificate`}
                    value={itm?.certificate}
                    error={
                      formik?.errors?.talentPools &&
                      formik?.errors?.talentPools[idx]?.certificate
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `talentPools[${idx}].certificate`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`talentPools[${idx}].certificate`)
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `talentPools[${idx}].certificate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`talentPools[${idx}].certificate`)
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

TalentPoolForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default TalentPoolForm
