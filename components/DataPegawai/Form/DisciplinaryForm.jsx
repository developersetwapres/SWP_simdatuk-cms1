/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Input, Autocomplete } from '@/components/shared'
import { Typography, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
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
  disciplinaries: []
}

const FormSchema = Yup.object().shape({
  disciplinaries: Yup.lazy((disciplinaries) => {
    if (Array.isArray(disciplinaries) && disciplinaries.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          // discipleType: Yup.string().required(
          //   'Jenis Hukuman tidak boleh kosong'
          // ),
          discipleDate: Yup.object().shape({
            from: Yup.string().required('Pilih tanggal awal'),
            to: Yup.string().required('Pilih tanggal akhir')
          })
          // .required('Tanggal Hukuman tidak boleh kosong')
        })
      )
    } else {
      return Yup.array()
    }
  })
})

const DisciplinaryForm = forwardRef((props, ref) => {
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

  const handleGetError = (value) => {
    if (value?.to) {
      return value?.to
    } else {
      return value
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.disciplinaries
    if (error) error.splice(idx, 1)

    const newData = formik?.values?.disciplinaries.filter(
      (item, index) => index !== idx
    )
    formik.setFieldValue('disciplinaries', newData, false)
  }

  return (
    <form ref={ref}>
      <CardAccordion title='Riwayat Hukuman Disiplin' isExpand={isExpand}>
        <Grid container spacing={3} sx={{ paddingBottom: '12px' }}>
          {formik?.values?.disciplinaries &&
            formik?.values?.disciplinaries.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Hukuman Disiplin'
                    isDelete={accessGranted(
                      PermissionsIDs.HISTORY_DISCIPLINARY,
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
                        name={`disciplinaries[${idx}].month`}
                        value={itm?.month}
                        error={
                          formik?.errors?.disciplinaries &&
                          formik?.errors?.disciplinaries[idx]?.month
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `disciplinaries[${idx}].month`,
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
                        name={`disciplinaries[${idx}].year`}
                        value={itm?.year}
                        error={
                          formik?.errors?.disciplinaries &&
                          formik?.errors?.disciplinaries[idx]?.year
                        }
                        onChange={(val) => {
                          formik.setFieldValue(
                            `disciplinaries[${idx}].year`,
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
                  <Input
                    label='Pangkat / Golongan'
                    placeholder='Masukkan Pangkat / Golongan'
                    name={`disciplinaries[${idx}].grade`}
                    value={itm?.grade}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.grade
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].grade`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Position */}
                <Grid item xs={6}>
                  <Input
                    label='Jabatan'
                    placeholder='Masukkan Jabatan'
                    name={`disciplinaries[${idx}].position`}
                    value={itm?.position}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.position
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].position`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Type of Disciple */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.discipleType}
                    placeholder='Pilih Jenis Hukuman'
                    label='Jenis Hukuman'
                    name={`disciplinaries[${idx}].discipleType`}
                    value={itm?.discipleType}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.discipleType
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `disciplinaries[${idx}].discipleType`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(
                      //     `disciplinaries[${idx}].discipleType`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Level of Disciple */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Tingkat Hukuman'
                    placeholder='Masukkan Tingkat Hukuman'
                    name={`disciplinaries[${idx}].discipleLevel`}
                    value={itm?.discipleLevel}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.discipleLevel
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].discipleLevel`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Allowance Deducation */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Pemotongan Tunjangan Kinerja(Persentase)'
                    placeholder='Masukkan Pemotongan Tunjangan Kinerja'
                    name={`disciplinaries[${idx}].allowanceDeducation`}
                    value={itm?.allowanceDeducation}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.allowanceDeducation
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].allowanceDeducation`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Allowance Duration */}
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Jangka Waktu Pemotongan'
                    placeholder='Masukkan Jangka Waktu Pemotongan'
                    name={`disciplinaries[${idx}].allowanceDuration`}
                    value={itm?.allowanceDuration}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.allowanceDuration
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].allowanceDuration`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik.validateField(
                      //     `disciplinaries[${idx}].allowanceDuration`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Decree Number */}
                <Grid item xs={6}>
                  <Input
                    label='No. SK Hukuman Disiplin'
                    placeholder='Masukkan No. SK Hukuman Disiplin'
                    name={`disciplinaries[${idx}].decreeNumber`}
                    value={itm?.decreeNumber}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.decreeNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].decreeNumber`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Decree Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='Tanggal SK Hukuman Disiplin'
                    placeholder='dd-mm-yy'
                    name={`disciplinaries[${idx}].decreeDate`}
                    value={itm?.decreeDate}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.decreeDate
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `disciplinaries[${idx}].decreeDate`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Disciple Date */}
                <Grid item xs={6}>
                  <DatePickerDay
                    mode='range'
                    label='Tanggal Hukuman Disiplin'
                    placeholder='dd-mm-yy - dd-mm-yy'
                    name={`disciplinaries[${idx}].discipleDate`}
                    value={itm?.discipleDate}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.discipleDate
                        ? handleGetError(
                            formik?.errors?.disciplinaries[idx]?.discipleDate
                          )
                        : null
                    }
                    onChange={(val) => {
                      formik.setFieldValue(
                        `disciplinaries[${idx}].discipleDate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik.validateField(
                          `disciplinaries[${idx}].discipleDate`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Status */}
                {itm?.status && (
                  <Grid item xs={6}>
                    <Input
                      disabled
                      label='Status'
                      placeholder='Masukkan Status'
                      name={`disciplinaries[${idx}].status`}
                      value={itm?.status}
                      error={
                        formik?.errors?.disciplinaries &&
                        formik?.errors?.disciplinaries[idx]?.status
                      }
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik.setFieldValue(
                          `disciplinaries[${idx}].status`,
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                )}
                {/* Validity */}
                {itm?.validity && (
                  <Grid item xs={6}>
                    <Input
                      disabled
                      label='Masa Berlaku'
                      placeholder='Masukkan Masa Berlaku'
                      name={`disciplinaries[${idx}].validity`}
                      value={itm?.validity}
                      error={
                        formik?.errors?.disciplinaries &&
                        formik?.errors?.disciplinaries[idx]?.validity
                      }
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik.setFieldValue(
                          `disciplinaries[${idx}].validity`,
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                )}
                {/* Authorized Official */}
                <Grid item xs={6}>
                  <Input
                    label='Pejabat Berwenang'
                    placeholder='Masukkan Pejabat Berwenang'
                    name={`disciplinaries[${idx}].authorizedOfficial`}
                    value={itm?.authorizedOfficial}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.authorizedOfficial
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].authorizedOfficial`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Name Authorized Official */}
                <Grid item xs={6}>
                  <Input
                    label='Nama Pejabat Berwenang'
                    placeholder='Masukkan Nama Pejabat Berwenang'
                    name={`disciplinaries[${idx}].authorizedOfficialName`}
                    value={itm?.authorizedOfficialName}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]
                        ?.authorizedOfficialName
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].authorizedOfficialName`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Description */}
                <Grid item xs={6}>
                  <Input
                    label='Keterangan'
                    placeholder='Masukkan Keterangan'
                    name={`disciplinaries[${idx}].description`}
                    value={itm?.description}
                    error={
                      formik?.errors?.disciplinaries &&
                      formik?.errors?.disciplinaries[idx]?.description
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik.setFieldValue(
                        `disciplinaries[${idx}].description`,
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

DisciplinaryForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default DisciplinaryForm
