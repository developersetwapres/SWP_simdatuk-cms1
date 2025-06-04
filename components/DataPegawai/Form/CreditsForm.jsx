/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Input } from '@/components/shared'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const InitValue = {
  credits: []
}

const FormSchema = Yup.object().shape({
  // credits: Yup.lazy((credits) => {
  //   if (Array.isArray(credits) && credits.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         period: Yup.string().required('Periode tidak boleh kosong'),
  //         year: Yup.string().required('Tahun tidak boleh kosong')
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const CreditsForm = forwardRef((props, ref) => {
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
        position: '',
        period: null,
        year: '',
        point: '',
        month: {
          start: null,
          end: null
        }
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('credits', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('credits', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.credits
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.credits, 'delete', idx)
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Penetapan Angka Kredit Terakhir'
        textAdd='Tambah Penetapan Angka Kredit Terakhir Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.credits, 'add')}
      >
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.credits &&
            formik?.values?.credits.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Penetapan Angka Kredit Terakhir'
                    handleDelete={() => handleDeleteData(idx)}
                  />
                </Grid>
                {/* Position */}
                <Grid item xs={6}>
                  <Input
                    label='Jabatan'
                    placeholder='Masukkan Jabatan'
                    name={`credits[${idx}].position`}
                    value={itm?.position}
                    error={
                      formik?.errors?.credits &&
                      formik?.errors?.credits[idx]?.position
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `credits[${idx}].position`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Period */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.periodCredits}
                    placeholder='Pilih Periode'
                    label='Periode'
                    name={`credits[${idx}].period`}
                    value={itm?.period}
                    error={
                      formik?.errors?.credits &&
                      formik?.errors?.credits[idx]?.period
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `credits[${idx}].period`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(`credits[${idx}].period`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Year */}
                <Grid item xs={6}>
                  <Input
                    label='Tahun'
                    placeholder='Masukkan Tahun'
                    name={`credits[${idx}].year`}
                    value={itm?.year}
                    error={
                      formik?.errors?.credits &&
                      formik?.errors?.credits[idx]?.year
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(`credits[${idx}].year`, val, false)
                      // setTimeout(() => {
                      //   formik.validateField(`credits[${idx}].year`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Month */}
                {itm?.period !== 'Tahunan' && itm?.period !== null && (
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}
                    >
                      Bulan
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <Autocomplete
                        options={options?.months}
                        placeholder='Pilih Bulan Awal'
                        name={`credits[${idx}].month.start`}
                        value={itm?.month.start}
                        error={
                          formik?.errors?.credits &&
                          formik?.errors?.credits[idx]?.month?.start
                        }
                        onChange={(val) => {
                          formik?.setFieldValue(
                            `credits[${idx}].month.start`,
                            val,
                            false
                          )
                        }}
                      />
                      <Typography sx={{ fontWeight: 600 }}>-</Typography>
                      <Autocomplete
                        options={options?.months}
                        placeholder='Pilih Bulan Awal'
                        name={`credits[${idx}].month.end`}
                        value={itm?.month.end}
                        error={
                          formik?.errors?.credits &&
                          formik?.errors?.credits[idx]?.month?.end
                        }
                        onChange={(val) => {
                          formik?.setFieldValue(
                            `credits[${idx}].month.end`,
                            val,
                            false
                          )
                        }}
                      />
                    </Box>
                  </Grid>
                )}
                {/* Point */}
                <Grid item xs={6}>
                  <Input
                    type='number'
                    inputProps={{ min: '0' }}
                    label='Angka Kredit Terakhir'
                    placeholder='Masukkan Angka Kredit Terakhir'
                    name={`credits[${idx}].point`}
                    value={itm?.point}
                    error={
                      formik?.errors?.credits &&
                      formik?.errors?.credits[idx]?.point
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(`credits[${idx}].point`, val, false)
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

CreditsForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default CreditsForm
