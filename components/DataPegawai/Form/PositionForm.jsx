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
  positions: []
}

const FormSchema = Yup.object().shape({
  positions: Yup.lazy((positions) => {
    if (Array.isArray(positions) && positions.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          // position: Yup.string().required('Jabatan tidak boleh kosong'),
          // group: Yup.string().required('Rumpun tidak boleh kosong'),
          // effectiveDate: Yup.string().required(
          //   'TMT Menjabat tidak boleh kosong'
          // ),
          // status: Yup.string().required('Status tidak boleh kosong'),
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

const PositionForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.positions
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.positions.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('positions', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Jabatan' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.positions &&
            formik?.values?.positions.map((itm, idx) => (
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
                        error={
                          formik?.errors?.positions &&
                          formik?.errors?.positions[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `positions[${idx}].month`,
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
                        name={`positions[${idx}].year`}
                        value={itm?.year}
                        error={
                          formik?.errors?.positions &&
                          formik?.errors?.positions[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `positions[${idx}].year`,
                            val,
                            false
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Position */}
                <Grid item xs={6}>
                  <Input
                    label='Jabatan'
                    placeholder='Masukkan Jabatan'
                    name={`positions[${idx}].position`}
                    value={itm?.position}
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.position
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `positions[${idx}].position`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`positions[${idx}].position`)
                      // }, 1)
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
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.group
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].group`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`positions[${idx}].group`)
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
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.level
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].level`,
                        val,
                        false
                      )
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.description
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].description`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Effective Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='TMT Menjabat'
                    placeholder='dd-mm-yyyy'
                    name={`positions[${idx}].effectiveDate`}
                    value={itm?.effectiveDate}
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.effectiveDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].effectiveDate`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`positions[${idx}].effectiveDate`)
                      // }, 1)
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
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.decree
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `positions[${idx}].decree`,
                        val,
                        false
                      )
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.decreeDocument
                    }
                    onDelete={() => {
                      formik.setFieldValue(
                        `positions[${idx}].decreeDocument`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(`positions[${idx}].decreeDocument`)
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].decreeDocument`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(`positions[${idx}].decreeDocument`)
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.decreeType
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].decreeType`,
                        val,
                        false
                      )
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.decreeNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `positions[${idx}].decreeNumber`,
                        val,
                        false
                      )
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.decreeDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].decreeDate`,
                        val,
                        false
                      )
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.terminationDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.terminationDecree
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.terminationDecreeType
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.terminationDecreeNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
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
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.terminationDecreeDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
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
                    label='Status Jabatan'
                    name={`positions[${idx}].status`}
                    value={itm?.status}
                    error={
                      formik?.errors?.positions &&
                      formik?.errors?.positions[idx]?.status
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `positions[${idx}].status`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`positions[${idx}].status`)
                      // }, 1)
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

PositionForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default PositionForm
