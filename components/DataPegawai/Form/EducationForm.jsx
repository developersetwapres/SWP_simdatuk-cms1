/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import CardAccordion from './CardAccordion'
import { Grid } from '@mui/material'
import { Autocomplete, Input } from '@/components/shared'
import UploadFile from '@/components/shared/form/UploadFile'
import HeaderForm from './HeaderForm'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

const EducationForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options,
  isExpand
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        educationLevel: null,
        educationName: '',
        educationArea: null,
        educationAccreditation: '',
        educationFaculty: '',
        educationMajor: '',
        educationStatus: null,
        educationYear: null,
        educationDescription: '',
        educationCertificate: null,
        educationStudyAssignmentLetter: null,
        edudcationAcademicTitleLetter: null
      }

      const updateData = [...data, newData]
      setFieldValue('educations', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('educations', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.educations
    if (error) error.splice(idx, 1)

    handleData(values?.educations, 'educations', idx)
  }

  return (
    <CardAccordion
      footer
      title='Riwayat Pendidikan'
      textAdd='Tambah Pendidikan Baru'
      isExpand={isExpand}
      handleAdd={() => handleData(values?.educations, 'add')}
    >
      <Grid container spacing={3}>
        {values?.educations &&
          values?.educations.map((itm, idx) => (
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
                  label='Tingkat *'
                  placeholder='Pilih Tingkat'
                  name={`educations[${idx}].educationLevel`}
                  value={itm?.educationLevel}
                  error={
                    errors?.educations &&
                    errors?.educations[idx]?.educationLevel
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].educationLevel`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationLevel`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Education Name */}
              <Grid item xs={6}>
                <Input
                  label='Nama Sekolah/Universitas *'
                  placeholder='Masukkan Nama Sekolah/Universitas'
                  name={`educations[${idx}].educationName`}
                  value={itm?.educationName}
                  error={
                    errors?.educations && errors?.educations[idx]?.educationName
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `educations[${idx}].educationName`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationName`
                      )
                    }, 1)
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
                    errors?.educations && errors?.educations[idx]?.educationArea
                  }
                  onChange={(val) => {
                    setFieldValue(
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationAccreditation
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationFaculty
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationMajor
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `educations[${idx}].educationMajor`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Education Status */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.educationStatus}
                  label='Status *'
                  placeholder='Pilih Status'
                  name={`educations[${idx}].educationStatus`}
                  value={itm?.educationStatus}
                  error={
                    errors?.educations &&
                    errors?.educations[idx]?.educationStatus
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].educationStatus`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationStatus`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Education Year */}
              <Grid item xs={6}>
                <DatepickerYear
                  isClear
                  label='Tahun Lulus *'
                  placeholder='Pilih Tahun Lulus'
                  nname={`educations[${idx}].educationYear`}
                  value={itm?.educationYear}
                  error={
                    errors?.educations && errors?.educations[idx]?.educationYear
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].educationYear`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationYear`
                      )
                    }, 1)
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationDescription
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationCertificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `educations[${idx}].educationCertificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationCertificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].educationCertificate`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
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
                    errors?.educations &&
                    errors?.educations[idx]?.educationStudyAssignmentLetter
                  }
                  onDelete={() => {
                    setFieldValue(
                      `educations[${idx}].educationStudyAssignmentLetter`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].educationStudyAssignmentLetter`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].educationStudyAssignmentLetter`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
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
                    errors?.educations &&
                    errors?.educations[idx]?.edudcationAcademicTitleLetter
                  }
                  onDelete={() => {
                    setFieldValue(
                      `educations[${idx}].edudcationAcademicTitleLetter`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `educations[${idx}].edudcationAcademicTitleLetter`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(
                      `educations[${idx}].edudcationAcademicTitleLetter`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
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
  )
}

EducationForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any,
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default EducationForm
