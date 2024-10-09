/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
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

const InitValue = {
  recognitions: []
}

const FormSchema = Yup.object().shape({})

const AwardForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.recognitions
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.recognitions.filter(
      (item, index) => index !== idx
    )

    formik.setFieldValue('recognitions', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Penghargaan' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.recognitions &&
            formik?.values?.recognitions.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Penghargaan'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_AWARD,
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
                        name={`recognitions[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.recognitions &&
                          formik?.errors?.recognitions[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `recognitions[${idx}].month`,
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
                        name={`recognitions[${idx}].year`}
                        value={itm?.year}
                        error={
                          formik?.errors?.recognitions &&
                          formik?.errors?.recognitions[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `recognitions[${idx}].year`,
                            val,
                            false
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Name */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Nama Penghargaan'
                    placeholder='Masukkan Nama Penghargaan'
                    name={`recognitions[${idx}].name`}
                    value={itm?.name}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.name
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `recognitions[${idx}].name`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Description */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Keterangan Penghargaan'
                    placeholder='Masukkan Keterangan Penghargaan'
                    name={`recognitions[${idx}].description`}
                    value={itm?.description}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.description
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `recognitions[${idx}].description`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Decree Type */}
                <Grid item xs={6}>
                  <Autocomplete
                    disabled
                    options={options?.decreeType}
                    placeholder='Pilih Jenis SK'
                    label='Jenis SK'
                    name={`recognitions[${idx}].decreeType`}
                    value={itm?.decreeType}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.decreeType
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `recognitions[${idx}].decreeType`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Decree Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    disabled
                    label='Tanggal SK'
                    placeholder='dd-mm-yyyy'
                    name={`recognitions[${idx}].decreeDate`}
                    value={itm?.decreeDate}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.decreeDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `recognitions[${idx}].decreeDate`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Decree Number */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='No. SK Penghargaan'
                    placeholder='Masukkan No. SK Penghargaan'
                    name={`recognitions[${idx}].decreeNumber`}
                    value={itm?.decreeNumber}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.decreeNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `recognitions[${idx}].decreeNumber`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Decree Year */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Tahun SK'
                    placeholder='Masukkan Tahun SK'
                    name={`recognitions[${idx}].decreeYear`}
                    value={itm?.decreeYear}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.decreeYear
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `recognitions[${idx}].decreeYear`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Institutions */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Instansi Pemberi Penghargaan'
                    placeholder='Masukkan Instansi Pemberi Penghargaan'
                    name={`recognitions[${idx}].institution`}
                    value={itm?.institution}
                    error={
                      formik?.errors?.recognitions &&
                      formik?.errors?.recognitions[idx]?.institution
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `recognitions[${idx}].institution`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Receipt Date */}
                {/* <Grid item xs={6}>
                <DatePickerDay
                  disabled
                  label='Tanggal Terima'
                  placeholder='dd-mm-yyyy'
                  name={`recognitions[${idx}].receiptDate`}
                  value={itm?.receiptDate}
                  error={
                    formik?.errors?.recognitions &&
                    formik?.errors?.recognitions[idx]?.receiptDate
                  }
                  onChange={(val) => {
                    formik.setFieldValue(
                      `recognitions[${idx}].receiptDate`,
                      val,
                      false
                    )
                  }}
                />
              </Grid> */}
              </Grid>
            ))}
        </Grid>
      </CardAccordion>
    </form>
  )
})

AwardForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default AwardForm
