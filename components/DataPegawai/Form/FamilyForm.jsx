/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const InitValue = {
  families: []
}

const FormSchema = Yup.object().shape({
  // families: Yup.lazy((families) => {
  //   if (Array.isArray(families) && families.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         familyRegistNumber: Yup.string()
  //           .min(16, 'No KK harus tediri dari 16 digit angka')
  //           .max(16, 'No KK harus tediri dari 16 digit angka')
  //           .required('No Kartu Keluarga tidak boleh kosong'),
  //         name: Yup.string().required(
  //           'Nama Anggota Keluarga tidak boleh kosong'
  //         ),
  //         idNumber: Yup.string()
  //           .min(16, 'No NIK harus terdiri dari 16 digit angka')
  //           .max(16, 'No NIK harus terdiri dari 16 digit angka')
  //           .required('No NIK tidak boleh kosong'),
  //         gender: Yup.string().required('Jenis Kelamin tidak boleh kosong'),
  //         religion: Yup.string().required('Agama tidak boleh kosong'),
  //         placeOfBirth: Yup.string().required(
  //           'Tempat Lahir tidak boleh kosong'
  //         ),
  //         dateOfBirth: Yup.string().required(
  //           'Tanggal Lahir tidak boleh kosong'
  //         ),
  //         relationshipStatus: Yup.string().required(
  //           'Hubungan Keluarga tidak boleh kosong'
  //         ),
  //         educationLevel: Yup.string().required(
  //           'Pendidikan tidak boleh kosong'
  //         ),
  //         maritalStatus: Yup.string().required(
  //           'Status Perkawinan tidak boleh kosong'
  //         )
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const FamilyForm = forwardRef((props, ref) => {
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
        marriageOther: '',
        mobilePhone: '',
        sequenceNumber: ''
      }

      const updateData = [...data, newData]
      formik?.setFieldValue('families', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('families', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.families
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.families, 'delete', idx)
  }

  return (
    <form>
      <CardAccordion
        footer
        title='Keluarga'
        textAdd='Tambah Keluarga Baru'
        isExpand={isExpand}
        handleAdd={() => handleData(formik?.values?.families, 'add')}
      >
        <Grid container spacing={3}>
          {formik?.values?.families &&
            formik?.values?.families.map((itm, idx) => (
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
                    label='No Kartu Keluarga'
                    placeholder='Masukkan No Kartu Keluarga'
                    name={`families[${idx}].familyRegistNumber`}
                    value={itm?.familyRegistNumber}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.familyRegistNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].familyRegistNumber`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(
                      //     `families[${idx}].familyRegistNumber`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Name */}
                <Grid item xs={6}>
                  <Input
                    label='Nama Anggota Keluarga'
                    placeholder='Masukkan Nama Anggota Keluarga'
                    name={`families[${idx}].name`}
                    value={itm?.name}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.name
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(`families[${idx}].name`, val, false)
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].name`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* ID Number */}
                <Grid item xs={6}>
                  <Input
                    type='number'
                    inputProps={{ min: '0' }}
                    label='No NIK'
                    placeholder='Masukkan No NIK'
                    name={`families[${idx}].idNumber`}
                    value={itm?.idNumber}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.idNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].idNumber`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].idNumber`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Gender */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.gender}
                    placeholder='Pilih Jenis Kelamin'
                    label='Jenis Kelamin'
                    name={`families[${idx}].gender`}
                    value={itm?.gender}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.gender
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].gender`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].gender`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Religion */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.religion}
                    placeholder='Pilih Agama'
                    label='Agama'
                    name={`families[${idx}].religion`}
                    value={itm?.religion}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.religion
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].religion`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].religion`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Place of Birth */}
                <Grid item xs={6}>
                  <Input
                    label='Tempat Lahir'
                    placeholder='Masukkan Tempat Lahir'
                    name={`families[${idx}].placeOfBirth`}
                    value={itm?.placeOfBirth}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.placeOfBirth
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].placeOfBirth`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].placeOfBirth`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Date of Birth */}
                <Grid item xs={6}>
                  <DatePickerDay
                    label='Tanggal Lahir'
                    placeholder='dd-mm-yyyy'
                    name={`families[${idx}].dateOfBirth`}
                    value={itm?.dateOfBirth}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.dateOfBirth
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].dateOfBirth`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].dateOfBirth`)
                      // }, 1)
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
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.nameOfFather
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].nameOfFather`,
                        val,
                        false
                      )
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
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.nameOfMother
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].nameOfMother`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Relationship Status */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.relationshipStatus}
                    placeholder='Pilih Hubungan Keluarga'
                    label='Hubungan Keluarga'
                    name={`families[${idx}].relationshipStatus`}
                    value={itm?.relationshipStatus}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.relationshipStatus
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].relationshipStatus`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(
                      //     `families[${idx}].relationshipStatus`
                      //   )
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Education Level */}
                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.educationLevel}
                    placeholder='Pilih Pendidikan'
                    label='Pendidikan'
                    name={`families[${idx}].educationLevel`}
                    value={itm?.educationLevel}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.educationLevel
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].educationLevel`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].educationLevel`)
                      // }, 1)
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
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.occupation
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].occupation`,
                        val,
                        false
                      )
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
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.occupationDescription
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
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
                    label='Status Perkawinan'
                    name={`families[${idx}].maritalStatus`}
                    value={itm?.maritalStatus}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.maritalStatus
                    }
                    onChange={(val) => {
                      formik?.setFieldValue(
                        `families[${idx}].maritalStatus`,
                        val,
                        false
                      )
                      // setTimeout(() => {
                      //   formik?.validateField(`families[${idx}].maritalStatus`)
                      // }, 1)
                    }}
                  />
                </Grid>
                {/* Marriage Other */}
                <Grid item xs={6}>
                  <Input
                    label='Keterangan Lainnya'
                    placeholder='Masukkan Keterangan Lainnya'
                    name={`families[${idx}].marriageOther`}
                    value={itm?.marriageOther}
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.marriageOther
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].marriageOther`,
                        val,
                        false
                      )
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '12px', marginTop: '6px', opacity: 0.8 }}
                  >
                    Contoh : Meninggal Dunia, Anak Angkat, Dan lain-lain
                  </Typography>
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
                    error={
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.mobilePhone
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].mobilePhone`,
                        val,
                        false
                      )
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
                      formik?.errors?.families &&
                      formik?.errors?.families[idx]?.sequenceNumber
                    }
                    onChange={(e) => {
                      const val = e?.target?.value
                      formik?.setFieldValue(
                        `families[${idx}].sequenceNumber`,
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

FamilyForm.propTypes = {
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default FamilyForm
