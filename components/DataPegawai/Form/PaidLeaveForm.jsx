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
  leaves: []
}

const FormSchema = Yup.object().shape({
  leaves: Yup.lazy((leaves) => {
    if (Array.isArray(leaves) && leaves.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          // period: Yup.object()
          //   .shape({
          //     from: Yup.string().required('Pilih tanggal awal'),
          //     to: Yup.string().required('Pilih tanggal akhir')
          //   })
          //   .required('Periode tidak boleh kosong'),
          // type: Yup.string().required('Jenis Cuti tidak boleh kosong'),
          // number: Yup.string().required('No Cuti tidak boleh kosong'),
          // description: Yup.string().required('Keterangan tidak boleh kosong'),
          leaveLetter: Yup.mixed()
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

const PaidLeaveForm = forwardRef((props, ref) => {
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
        period: null,
        type: null,
        number: '',
        description: '',
        leaveLetter: null
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('leaves', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('leaves', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.leaves
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.leaves, 'delete', idx)
  }

  const handleGetError = (value) => {
    if (value?.to) {
      return value?.to
    } else {
      return value
    }
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Cuti'
        textAdd='Tambah Cuti Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.leaves, 'add')}
      >
        <Grid container spacing={3}>
          {formik?.values?.leaves &&
            formik?.values?.leaves.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Cuti'
                    handleDelete={() => handleDeleteData(idx)}
                  />
                </Grid>
                {/* Period */}
                <Grid item xs={6}>
                  <DatePickerDay
                    mode='range'
                    name={`leaves[${idx}].period`}
                    label='Periode'
                    placeholder='dd-mm-yyyy'
                    value={itm?.period}
                    error={
                      formik?.errors?.leaves &&
                      formik?.errors?.leaves[idx]?.period
                        ? handleGetError(formik?.errors?.leaves[idx]?.period)
                        : null
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(`leaves[${idx}].period`, val, false)
                      // setTimeout(() => {
                      //   formik?.validateField(`leaves[${idx}].period`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Leave Type */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.leaves}
                    label='Jenis Cuti'
                    placeholder='Pilih Jenis Cuti'
                    name={`leaves[${idx}].type`}
                    value={itm?.type}
                    error={
                      formik?.errors?.leaves &&
                      formik?.errors?.leaves[idx]?.type
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(`leaves[${idx}].type`, val, false)
                      // setTimeout(() => {
                      //   formik?.validateField(`leaves[${idx}].type`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Number */}
                <Grid item xs={6}>
                  <Input
                    label='No. Cuti'
                    placeholder='Masukkan No. Cuti'
                    name={`leaves[${idx}].number`}
                    value={itm?.number}
                    error={
                      formik?.errors?.leaves &&
                      formik?.errors?.leaves[idx]?.number
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(`leaves[${idx}].number`, val, false)
                      // setTimeout(() => {
                      //   formik?.validateField(`leaves[${idx}].number`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Description */}
                <Grid item xs={6}>
                  <Input
                    label='Keterangan'
                    placeholder='Masukkan Keterangan'
                    name={`leaves[${idx}].description`}
                    value={itm?.description}
                    error={
                      formik?.errors?.leaves &&
                      formik?.errors?.leaves[idx]?.description
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `leaves[${idx}].description`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`leaves[${idx}].description`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Leave Letter */}
                <Grid item xs={12}>
                  <UploadFile
                    label='Surat Cuti'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`leaves[${idx}].leaveLetter`}
                    value={itm?.leaveLetter}
                    error={
                      formik?.errors?.leaves &&
                      formik?.errors?.leaves[idx]?.leaveLetter
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `leaves[${idx}].leaveLetter`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`leaves[${idx}].leaveLetter`)
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `leaves[${idx}].leaveLetter`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(`leaves[${idx}].leaveLetter`)
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

PaidLeaveForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default PaidLeaveForm
