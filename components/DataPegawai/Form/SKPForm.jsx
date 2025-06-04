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
  targets: []
}

const FormSchema = Yup.object().shape({
  // targets: Yup.lazy((targets) => {
  //   if (Array.isArray(targets) && targets.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         workBehavior: Yup.string().required(
  //           'Rating Perilaku Kerja tidak boleh kosong'
  //         ),
  //         performance: Yup.string().required(
  //           'Predikat Kinerja Pegawai tidak boleh kosong'
  //         ),
  //         performanceAchievement: Yup.string().required(
  //           'Capaian Kinerja Organisasi tidak boleh kosong'
  //         )
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const SKPForm = forwardRef((props, ref) => {
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
    const error = formik?.errors?.targets
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.targets.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('targets', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat SKP' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.targets &&
            formik?.values?.targets.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat SKP'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_SKP,
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
                        name={`targets[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.targets &&
                          formik?.errors?.targets[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `targets[${idx}].month`,
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
                        name={`targets[${idx}].year`}
                        value={itm?.year}
                        error={
                          formik?.errors?.targets &&
                          formik?.errors?.targets[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `targets[${idx}].year`,
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
                  <Autocomplete
                    disabled
                    options={options?.period}
                    placeholder='Pilih Periode Penilaian'
                    label='Periode Penilaian'
                    name={`targets[${idx}].appraisal`}
                    value={itm?.appraisal}
                    error={
                      formik?.errors?.targets &&
                      formik?.errors?.targets[idx]?.appraisal
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `targets[${idx}].appraisal`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Assessment Year */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Tahun'
                    placeholder='Masukkan Tahun'
                    name={`targets[${idx}].assessmentYear`}
                    value={itm?.assessmentYear}
                    error={
                      formik?.errors?.targets &&
                      formik?.errors?.targets[idx]?.assessmentYear
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `targets[${idx}].assessmentYear`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Work Behavior */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.workBehavior}
                    placeholder='Pilih Rating Perilaku Kerja'
                    label='Rating Perilaku Kerja'
                    name={`targets[${idx}].workBehavior`}
                    value={itm?.workBehavior}
                    error={
                      formik?.errors?.targets &&
                      formik?.errors?.targets[idx]?.workBehavior
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `targets[${idx}].workBehavior`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`targets[${idx}].workBehavior`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Performance */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.performance}
                    placeholder='Pilih Predikat Kinerja Pegawai'
                    label='Predikat Kinerja Pegawai'
                    name={`targets[${idx}].performance`}
                    value={itm?.performance}
                    error={
                      formik?.errors?.targets &&
                      formik?.errors?.targets[idx]?.performance
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `targets[${idx}].performance`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`targets[${idx}].performance`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Performance Achievement */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.performanceAchievement}
                    placeholder='Pilih Capaian Kinerja Organisasi'
                    label='Capaian Kinerja Organisasi'
                    name={`targets[${idx}].performanceAchievement`}
                    value={itm?.performanceAchievement}
                    error={
                      formik?.errors?.targets &&
                      formik?.errors?.targets[idx]?.performanceAchievement
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `targets[${idx}].performanceAchievement`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(
                      //     `targets[${idx}].performanceAchievement`
                      //   )
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

SKPForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default SKPForm
