/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const FamilyForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        familyRegistNumber: '',
        name: '',
        idNumber: '',
        gender: null,
        religion: null,
        placeOfBirth: '',
        dateOfBirth: '',
        nameOfFather: '',
        nameOfMother: '',
        relationshipStatus: null,
        educationLevel: null,
        occupation: '',
        occupationDescription: '',
        maritalStatus: null,
        mobilePhone: '',
        sequenceNumber: ''
      }

      const updateData = [...data, newData]
      setFieldValue('families', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('families', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.families
    if (error) error.splice(idx, 1)
    handleData(values?.families, 'families', idx)
  }

  return (
    <CardAccordion
      footer
      title='Keluarga'
      textAdd='Tambah Keluarga Baru'
      handleAdd={() => handleData(values?.families, 'add')}
    >
      <Grid container spacing={3}>
        {values?.families &&
          values?.families.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Keluarga'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Family Registration Number */}
              <Grid item xs={6}>
                <Input
                  type='number'
                  inputProps={{ min: '0' }}
                  label='No Kartu Keluarga *'
                  placeholder='Masukkan No Kartu Keluarga *'
                  name={`families[${idx}].familyRegistNumber`}
                  value={itm?.familyRegistNumber}
                  error={
                    errors?.families &&
                    errors?.families[idx]?.familyRegistNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `families[${idx}].familyRegistNumber`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].familyRegistNumber`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Name */}
              <Grid item xs={6}>
                <Input
                  label='Nama Anggota Keluarga *'
                  placeholder='Masukkan Nama Anggota Keluarga *'
                  name={`families[${idx}].name`}
                  value={itm?.name}
                  error={errors?.families && errors?.families[idx]?.name}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].name`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`families[${idx}].name`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* ID Number */}
              <Grid item xs={6}>
                <Input
                  type='number'
                  inputProps={{ min: '0' }}
                  label='No NIK *'
                  placeholder='Masukkan No NIK *'
                  name={`families[${idx}].idNumber`}
                  value={itm?.idNumber}
                  error={errors?.families && errors?.families[idx]?.idNumber}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].idNumber`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].idNumber`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Gender */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.gender}
                  placeholder='Pilih Jenis Kelamin'
                  label='Jenis Kelamin *'
                  name={`families[${idx}].gender`}
                  value={itm?.gender}
                  error={errors?.families && errors?.families[idx]?.gender}
                  onChange={(val) => {
                    setFieldValue(`families[${idx}].gender`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`families[${idx}].gender`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Religion */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.religion}
                  placeholder='Pilih Agama'
                  label='Agama *'
                  name={`families[${idx}].religion`}
                  value={itm?.religion}
                  error={errors?.families && errors?.families[idx]?.religion}
                  onChange={(val) => {
                    setFieldValue(`families[${idx}].religion`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].religion`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Place of Birth */}
              <Grid item xs={6}>
                <Input
                  label='Tempat Lahir *'
                  placeholder='Masukkan Tempat Lahir *'
                  name={`families[${idx}].placeOfBirth`}
                  value={itm?.placeOfBirth}
                  error={
                    errors?.families && errors?.families[idx]?.placeOfBirth
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].placeOfBirth`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].placeOfBirth`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Date of Birth */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal Lahir *'
                  placeholder='dd-mm-yyyy'
                  name={`families[${idx}].dateOfBirth`}
                  value={itm?.dateOfBirth}
                  error={errors?.families && errors?.families[idx]?.dateOfBirth}
                  onChange={(val) => {
                    setFieldValue(`families[${idx}].dateOfBirth`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].dateOfBirth`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Father Name */}
              <Grid item xs={6}>
                <Input
                  label='Nama Bapak'
                  placeholder='Masukkan Nama Bapak'
                  name={`families[${idx}].nameOfFather`}
                  value={itm?.nameOfFather}
                  error={
                    errors?.families && errors?.families[idx]?.nameOfFather
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].nameOfFather`, val, false)
                  }}
                />
              </Grid>
              {/* Mother Name */}
              <Grid item xs={6}>
                <Input
                  label='Nama Ibu'
                  placeholder='Masukkan Nama Ibu'
                  name={`families[${idx}].nameOfMother`}
                  value={itm?.nameOfMother}
                  error={
                    errors?.families && errors?.families[idx]?.nameOfMother
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].nameOfMother`, val, false)
                  }}
                />
              </Grid>
              {/* Relationship Status */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.relationshipStatus}
                  placeholder='Pilih Hubungan Keluarga'
                  label='Hubungan Keluarga *'
                  name={`families[${idx}].relationshipStatus`}
                  value={itm?.relationshipStatus}
                  error={
                    errors?.families &&
                    errors?.families[idx]?.relationshipStatus
                  }
                  onChange={(val) => {
                    setFieldValue(
                      `families[${idx}].relationshipStatus`,
                      val,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].relationshipStatus`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Education Level */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.educationLevel}
                  placeholder='Pilih Pendidikan'
                  label='Pendidikan *'
                  name={`families[${idx}].educationLevel`}
                  value={itm?.educationLevel}
                  error={
                    errors?.families && errors?.families[idx]?.educationLevel
                  }
                  onChange={(val) => {
                    setFieldValue(`families[${idx}].educationLevel`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].educationLevel`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Occupation */}
              <Grid item xs={6}>
                <Input
                  label='Jenis Pekerjaan'
                  placeholder='Masukkan Jenis Pekerjaan'
                  name={`families[${idx}].occupation`}
                  value={itm?.occupation}
                  error={errors?.families && errors?.families[idx]?.occupation}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].occupation`, val, false)
                  }}
                />
              </Grid>
              {/* Occupation Description */}
              <Grid item xs={6}>
                <Input
                  label='Keterangan Pekerjaan'
                  placeholder='Masukkan Keterangan Pekerjaan'
                  name={`families[${idx}].occupationDescription`}
                  value={itm?.occupationDescription}
                  error={
                    errors?.families &&
                    errors?.families[idx]?.occupationDescription
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(
                      `families[${idx}].occupationDescription`,
                      val,
                      false
                    )
                  }}
                />
              </Grid>
              {/* Marital Status */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.maritalFamily}
                  placeholder='Pilih Status Perkawinan'
                  label='Status Perkawinan *'
                  name={`families[${idx}].maritalStatus`}
                  value={itm?.maritalStatus}
                  error={
                    errors?.families && errors?.families[idx]?.maritalStatus
                  }
                  onChange={(val) => {
                    setFieldValue(`families[${idx}].maritalStatus`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `families[${idx}].maritalStatus`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Number Phone */}
              <Grid item xs={6}>
                <Input
                  type='number'
                  inputProps={{ min: '0' }}
                  label='No. HP'
                  placeholder='Masukkan No. HP'
                  name={`families[${idx}].mobilePhone`}
                  value={itm?.mobilePhone}
                  error={errors?.families && errors?.families[idx]?.mobilePhone}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].mobilePhone`, val, false)
                  }}
                />
              </Grid>
              {/* Sequence Number */}
              <Grid item xs={6}>
                <Input
                  label='Urut Keluarga'
                  placeholder='Masukkan Urut Keluarga'
                  name={`families[${idx}].sequenceNumber`}
                  value={itm?.sequenceNumber}
                  error={
                    errors?.families && errors?.families[idx]?.sequenceNumber
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`families[${idx}].sequenceNumber`, val, false)
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

FamilyForm.propTypes = {
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
  options: PropTypes.object
}

export default FamilyForm
