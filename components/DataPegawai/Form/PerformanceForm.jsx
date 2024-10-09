/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
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
  performances: []
}

const FormSchema = Yup.object().shape({
  // performances: Yup.lazy((performances) => {
  //   if (Array.isArray(performances) && performances.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         point: Yup.string().required(
  //           'Nilai Prestasi Kerja tidak boleh kosong'
  //         )
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const PerformanceForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.performances
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.performances.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('performances', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion
        title='Riwayat Penilaian Prestasi Kerja'
        isExpand={isExpand}
      >
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.performances &&
            formik?.values?.performances.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Penilaian Prestasi Kerja'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_PERFORMANCE,
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
                        name={`performances[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.performances &&
                          formik?.errors?.performances[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `performances[${idx}].month`,
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
                        name={`performances[${idx}].year`}
                        value={itm?.year}
                        error={
                          formik?.errors?.performances &&
                          formik?.errors?.performances[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `performances[${idx}].year`,
                            val,
                            false
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Appraisal */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Periode PPK'
                    placeholder='Masukkan Periode PPK'
                    name={`performances[${idx}].appraisal`}
                    value={itm?.appraisal}
                    error={
                      formik?.errors?.performances &&
                      formik?.errors?.performances[idx]?.appraisal
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `performances[${idx}].appraisal`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Point */}
                <Grid item xs={6}>
                  <Input
                    label='Nilai Prestasi Kerja*'
                    placeholder='Masukkan Nilai Prestasi Kerja'
                    name={`performances[${idx}].point`}
                    value={itm?.point}
                    error={
                      formik?.errors?.performances &&
                      formik?.errors?.performances[idx]?.point
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `performances[${idx}].point`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`performances[${idx}].point`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Description */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.performancesType}
                    placeholder='Pilih Keterangan'
                    label='Keterangan'
                    name={`performances[${idx}].description`}
                    value={itm?.description}
                    error={
                      formik?.errors?.performances &&
                      formik?.errors?.performances[idx]?.description
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `performances[${idx}].description`,
                        val,
                        false
                      )
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

PerformanceForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default PerformanceForm
