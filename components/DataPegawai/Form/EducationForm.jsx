/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import CardAccordion from './CardAccordion'
import { Grid } from '@mui/material'
import { Autocomplete, Input } from '@/components/shared'
import UploadFile from '@/components/shared/form/UploadFile'
import HeaderForm from './HeaderForm'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const isFile = (value) => {
  return typeof value !== 'string'
}

const InitValue = {
  educations: []
}

const FormSchema = Yup.object().shape({
  educations: Yup.lazy((educations) => {
    if (Array.isArray(educations) && educations.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          // educationLevel: Yup.string().required('Tingkat tidak boleh kosong'),
          // educationName: Yup.string().required('Nama tidak boleh kosong'),
          // educationStatus: Yup.string().required('Status tidak boleh kosong'),
          // educationYear: Yup.string().required(
          //   'Tahun Lulus tidak boleh kosong'
          // ),
          educationCertificate: Yup.mixed()
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
            ),
          educationStudyAssignmentLetter: Yup.mixed()
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
            ),
          edudcationAcademicTitleLetter: Yup.mixed()
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

const EducationForm = forwardRef((props, ref) => {
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
        educationLevel: null,
        educationName: '',
        educationArea: null,
        educationAccreditation: '',
        educationFaculty: '',
        educationMajor: '',
        // educationStatus: null,
        educationYear: null,
        educationDescription: '',
        educationCertificate: null,
        educationStudyAssignmentLetter: null,
        edudcationAcademicTitleLetter: null
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('educations', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('educations', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.educations
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.educations, 'delete', idx)
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Riwayat Pendidikan'
        textAdd='Tambah Pendidikan Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.educations, 'add')}
      >
        <Grid container spacing={3}>
          {formik?.values?.educations &&
            formik?.values?.educations.map((itm, idx) => (
              <Grid item container xs={12} spacing={3} key={idx}>
                <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                  <HeaderForm
                    title='Riwayat Pendidikan'
                    handleDelete={() => handleDeleteData(idx)}
                  />
                </Grid>
                {/* Education Level */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.employeeEducationLevel}
                    label='Tingkat'
                    placeholder='Pilih Tingkat'
                    name={`educations[${idx}].educationLevel`}
                    value={itm?.educationLevel}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationLevel
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationLevel`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(
                      //     `educations[${idx}].educationLevel`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Education Name */}
                <Grid item xs={6}>
                  <Input
                    label='Nama Sekolah/Universitas'
                    placeholder='Masukkan Nama Sekolah/Universitas'
                    name={`educations[${idx}].educationName`}
                    value={itm?.educationName}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationName
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `educations[${idx}].educationName`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(
                      //     `educations[${idx}].educationName`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Education Area */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.studyArea}
                    label='Wilayah'
                    placeholder='Pilih Wilayah'
                    name={`educations[${idx}].educationArea`}
                    value={itm?.educationArea}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationArea
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationArea`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Education Accreditation */}
                <Grid item xs={6}>
                  <Input
                    label='Akreditasi'
                    placeholder='Masukkan Akreditasi'
                    name={`educations[${idx}].educationAccreditation`}
                    value={itm?.educationAccreditation}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationAccreditation
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `educations[${idx}].educationAccreditation`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Education Faculty */}
                <Grid item xs={6}>
                  <Input
                    label='Fakultas'
                    placeholder='Masukkan Fakultas'
                    name={`educations[${idx}].educationFaculty`}
                    value={itm?.educationFaculty}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationFaculty
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `educations[${idx}].educationFaculty`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Education Major */}
                <Grid item xs={6}>
                  <Input
                    label='Jurusan'
                    placeholder='Masukkan Jurusan'
                    name={`educations[${idx}].educationMajor`}
                    value={itm?.educationMajor}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationMajor
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `educations[${idx}].educationMajor`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Education Status */}
                {/* <Grid item xs={6}>
                <Autocomplete
                  options={options?.educationStatus}
                  label='Status *'
                  placeholder='Pilih Status'
                  name={`educations[${idx}].educationStatus`}
                  value={itm?.educationStatus}
                  error={
                    formik?.errors?.educations &&
                    formik?.errors?.educations[idx]?.educationStatus
                  }
                  onChange={(val) => {
                    formik?.setFieldValue(
                      `educations[${idx}].educationStatus`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formik?.validateField(
                        `educations[${idx}].educationStatus`
                      )
                    }, 1)
                  }}
                />
              </Grid> */}
                {/* Education Year */}
                <Grid item xs={6}>
                  <DatepickerYear
                    isClear
                    label='Tahun Lulus'
                    placeholder='Pilih Tahun Lulus'
                    nname={`educations[${idx}].educationYear`}
                    value={itm?.educationYear}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationYear
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationYear`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(
                      //     `educations[${idx}].educationYear`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Education Description */}
                <Grid item xs={6}>
                  <Input
                    label='Keterangan Sekolah'
                    placeholder='Masukkan Keterangan Sekolah'
                    name={`educations[${idx}].educationDescription`}
                    value={itm?.educationDescription}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationDescription
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `educations[${idx}].educationDescription`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Education Certificate */}
                <Grid item xs={6}>
                  <UploadFile
                    label='Ijazah'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`educations[${idx}].educationCertificate`}
                    value={itm?.educationCertificate}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]?.educationCertificate
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationCertificate`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].educationCertificate`
                        )
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationCertificate`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].educationCertificate`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Study Assignment Letter */}
                <Grid item xs={6}>
                  <UploadFile
                    label='Surat Keterangan Tugas Belajar'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`educations[${idx}].educationStudyAssignmentLetter`}
                    value={itm?.educationStudyAssignmentLetter}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]
                        ?.educationStudyAssignmentLetter
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationStudyAssignmentLetter`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].educationStudyAssignmentLetter`
                        )
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].educationStudyAssignmentLetter`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].educationStudyAssignmentLetter`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Academic Title Letter */}
                <Grid item xs={6}>
                  <UploadFile
                    label='Surat Keputusan Pencantuman Gelar'
                    maxSize={2}
                    dataUnit='MB'
                    formatFile={['.png', '.jpg', '.pdf']}
                    name={`educations[${idx}].edudcationAcademicTitleLetter`}
                    value={itm?.edudcationAcademicTitleLetter}
                    error={
                      formik?.errors?.educations &&
                      formik?.errors?.educations[idx]
                        ?.edudcationAcademicTitleLetter
                    }
                    onDelete={() => {
                      formik?.setFieldValue(
                        `educations[${idx}].edudcationAcademicTitleLetter`,
                        null,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].edudcationAcademicTitleLetter`
                        )
                      }, 1)
                    }}
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `educations[${idx}].edudcationAcademicTitleLetter`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formik?.validateField(
                          `educations[${idx}].edudcationAcademicTitleLetter`
                        )
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

EducationForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default EducationForm
