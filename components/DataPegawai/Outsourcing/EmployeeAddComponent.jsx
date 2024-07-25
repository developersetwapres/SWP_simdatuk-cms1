/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Button } from '@/components/shared'
import { Box } from '@mui/material'
import FormComponent from '../Form/FormComponent'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import {
  assesmentsOptions,
  competencesOptions,
  educationLevelOptions,
  educationStatusOptions,
  employeeEducationLevelOptions,
  employeeStatusOptions,
  genderOptions,
  leavesOptions,
  maritalStatusOptions,
  monthOptions,
  organizationOptions,
  periodCreditsOptions,
  relationshipStatusOptions,
  religionOptions,
  talentPoolsOptions
} from 'libs/types/options'

const InitValue = {
  employee: {
    image: null,
    name: '',
    titlePrefix: '',
    titleSuffix: '',
    nip: '',
    nik: '',
    nrp: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religion: null,
    gender: null,
    maritalStatus: null,
    employmentType: null,
    dateStartedWork: '',
    positions: [{ name: null }],
    positionEffectiveDate: '',
    grade: null,
    gradeEffectiveDate: '',
    echelon: null,
    echelonEffectiveDate: '',
    educationLevel: null,
    educationName: '',
    educationYear: null,
    institution: null,
    employeeIdCardNumber: '',
    employeeIdCard: null,
    karisu: '',
    taxId: '',
    employmentStatus: null,
    lastDateOfWork: '',
    familyRegistNumber: '',
    idNumber: '',
    residence: null,
    residenceName: '',
    address: '',
    homeTelephoneNumber: '',
    mobilePhone: '',
    officeAddress: '',
    officeTelephoneNumber: '',
    email: '',
    officeEmail: '',
    emergencyContact: '',
    description: ''
  },
  educations: [],
  notes: []
}

const FormSchema = Yup.object().shape({
  employee: Yup.object().shape({
    name: Yup.string().required('Nama tidak boleh kosong'),
    nip: Yup.string()
      .required('NIP tidak boleh kosong')
      .min(5, 'NIP tidak boleh kurang dari 5 digit')
      .max(18, 'NIP tidak boleh lebih dari 18 digit'),
    placeOfBirth: Yup.string().required('Tempat Lahir tidak boleh kosong'),
    dateOfBirth: Yup.string().required('Tanggal Lahir tidak boleh kosong'),
    religion: Yup.string().required('Agama tidak boleh kosong'),
    gender: Yup.string().required('Jenis Kelamin tidak boleh kosong'),
    maritalStatus: Yup.string().required(
      'Status Perkawinan tidak boleh kosong'
    ),
    employmentType: Yup.string().required(
      'Jenis Outsourcing tidak boleh kosong'
    ),
    dateStartedWork: Yup.string().required(
      'Tanggal Mulai Bekerja tidak boleh kosong'
    ),
    positions: Yup.array().of(
      Yup.object().shape({
        name: Yup.mixed()
          .nullable()
          .test('is-required', 'Jabatan tidak boleh kosong', function (value) {
            const { path } = this

            const pathParts = path.split('.')
            const index = pathParts[1].match(/\d+/)[0]

            if (!value && index == 0) return false

            return true
          })
      })
    ),
    educationLevel: Yup.string().required(
      'Tingak Pendidikan tidak boleh kosong'
    ),
    educationName: Yup.string().required(
      'Nama Sekolah/Universitas tidak boleh kosong'
    ),
    educationYear: Yup.string().required('Tahun Lulus tidak boleh kosong'),
    employmentStatus: Yup.string().required(
      'Status Pegawai tidak boleh kosong'
    ),
    lastDateOfWork: Yup.string().test(
      'is-required',
      'Tanggal Terakhir Bekerja tidak boleh kosong',
      function (value) {
        const { employmentStatus } = this.parent
        if (
          employmentStatus !== 'Aktif' &&
          employmentStatus !== 'Aktif Perbantuan Setneg' &&
          employmentStatus !== 'Hukuman Disiplin'
        ) {
          return value != null && value !== ''
        }
        return true
      }
    ),
    familyRegistNumber: Yup.string()
      .min(16, 'No KK harus tediri dari 16 digit angka')
      .max(16, 'No KK harus tediri dari 16 digit angka')
      .required('No KK tidak boleh kosong'),
    idNumber: Yup.string()
      .min(16, 'No NIK harus terdiri dari 16 digit angka')
      .max(16, 'No NIK harus terdiri dari 16 digit angka')
      .required('No NIK tidak boleh kosong'),
    residence: Yup.string().required('Komplek tidak boleh kosong'),
    emergencyContact: Yup.string().required(
      'Kontak Darurat tidak boleh kosong'
    ),
    email: Yup.string().email('Email tidak valid'),
    taxId: Yup.lazy((taxId) => {
      if (Array.isArray(taxId) && taxId.length > 0) {
        return Yup.string()
          .nullable()
          .when('taxId', {
            is: (value) => value && value.length > 0,
            then: Yup.string()
              .min(15, 'NPWP tidak boleh kurang dari 15 digit')
              .max(16, 'NPWP tidak boleh lebih dari 16 digit')
          })
      } else {
        return Yup.string()
      }
    }),
    image: Yup.mixed()
      .nullable()
      .test('fileType', 'Format file harus PNG, JPG', (value) => {
        if (!value) return true
        const fileType = value && value.type
        return fileType === 'image/png' || fileType === 'image/jpeg'
      })
      .test('fileSize', 'Ukuran file tidak boleh lebih dari 2MB', (value) => {
        const maxSize = 2 * 1024 * 1024
        if (!value) return true
        return value.size <= maxSize
      })
      .test(
        'fileDimensions',
        'Ukuran dimensi file harus 350px x 500px',
        async (value) => {
          if (!value) return true

          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              const img = new Image()
              img.onload = () => {
                if (img.width === 350 && img.height === 500) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
              img.src = e.target.result
            }
            reader.onerror = () => {
              reject(new Error('File reading failed'))
            }
            reader.readAsDataURL(value)
          })
        }
      )
  }),
  educations: Yup.lazy((educations) => {
    if (Array.isArray(educations) && educations.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          educationLevel: Yup.string().required('Tingkat tidak boleh kosong'),
          educationName: Yup.string().required('Nama tidak boleh kosong'),
          educationStatus: Yup.string().required('Status tidak boleh kosong'),
          educationYear: Yup.string().required(
            'Tahun Lulus tidak boleh kosong'
          ),
          educationCertificate: Yup.mixed()
            .nullable()
            .test(
              'fileType',
              'Format file harus PNG, JPG, atau PDF',
              (value) => {
                if (!value) return true
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
                if (!value) return true
                return value.size <= maxSize
              }
            )
        })
      )
    } else {
      return Yup.array()
    }
  }),
  notes: Yup.lazy((notes) => {
    if (Array.isArray(notes) && notes.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          description: Yup.string()
            .required('Catatan tidak boleh kosong')
            .max(160, 'Catatan tidak boleh lebih dari 160 karakter')
        })
      )
    } else {
      return Yup.array()
    }
  })
})

const EmployeeAddComponent = ({
  employee,
  position,
  residence,
  employmentType,
  postEmployee = () => {},
  onFetchHierarchy = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [positions, setPositions] = useState([])

  const errorsForm = useMemo(() => {
    return employee?.errorForm || {}
  }, [employee?.errorForm])

  const handleMapping = (val) => {
    const arr = []

    val.map((itm) => {
      arr.push(itm?.name)
    })

    return arr
  }

  const options = useMemo(() => {
    const newPosition = positions
      ? positions.map((itm) => handleMapping(itm))
      : []
    const newResidence = residence?.data ? handleMapping(residence?.data) : []
    const newEmploymentType = employmentType?.data
      ? handleMapping(employmentType?.data)
      : []

    const dataOptions = {
      positions: newPosition,
      echelon: [],
      grade: [],
      institution: [],
      residence: newResidence,
      employmentType: newEmploymentType,
      organization: organizationOptions,
      religion: religionOptions,
      gender: genderOptions,
      marital: maritalStatusOptions,
      employeeStatus: employeeStatusOptions,
      employeeEducationLevel: employeeEducationLevelOptions,
      educationLevel: educationLevelOptions,
      educationStatus: educationStatusOptions,
      relationshipStatus: relationshipStatusOptions,
      leaves: leavesOptions,
      assessments: assesmentsOptions,
      competences: competencesOptions,
      talentPools: talentPoolsOptions,
      months: monthOptions,
      periodCredits: periodCreditsOptions
    }

    return dataOptions
  }, [positions, residence, employmentType])

  const handleGetValue = (type, val, idx) => {
    if (val) {
      if (type == 'position') {
        const dataPosition = positions.flat(1)
        const item = dataPosition.find((itm) => itm?.name == val)
        return item?.id
      } else if (type == 'residence') {
        const idItm =
          residence?.data && residence?.data.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'employmentType') {
        const item =
          employmentType?.data &&
          employmentType?.data.find((itm) => itm?.name == val)?.id

        return item
      } else {
        const index = options[type].findIndex((itm) => itm == val) + 1
        return index
      }
    } else {
      return val
    }
  }

  const handleFormatDate = (value, format) => {
    if (value) return moment(value).format(format)

    return ''
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const position = values?.employee?.positions.filter(
        (itm) => itm?.name !== null
      )
      const indexPosition = position.length - 1
      const itemPosition = position[indexPosition]?.name || []

      const educations = values?.educations || []
      const notes = values?.notes || []

      const formData = new FormData()

      // Employee
      formData.append('photo_profile', values?.employee?.image || '')
      formData.append('name', values?.employee?.name)
      formData.append('title_prefix', values?.employee?.titlePrefix)
      formData.append('title_suffix', values?.employee?.titleSuffix)
      formData.append('employee_id_number', values?.employee?.nip)
      formData.append('employee_registration_number', values?.employee?.nrp)
      formData.append('place_of_birth', values?.employee?.placeOfBirth)
      formData.append(
        'date_of_birth',
        handleFormatDate(values?.employee?.dateOfBirth, 'YYYY-MM-DD')
      )
      formData.append(
        'religion',
        handleGetValue('religion', values?.employee?.religion)
      )
      formData.append('gender', values?.employee?.gender == 'Laki-Laki' ? 1 : 0)
      formData.append(
        'marital_status',
        handleGetValue('marital', values?.employee?.maritalStatus)
      )
      formData.append(
        'employment_type_id',
        handleGetValue('employmentType', values?.employee?.employmentType)
      )
      formData.append(
        'cpns_effective_date',
        handleFormatDate(values?.employee?.dateStartedWork, 'YYYY-MM-DD')
      )
      formData.append(
        'position_id',
        handleGetValue('position', itemPosition, indexPosition)
      )
      formData.append(
        'position_effective_date',
        handleFormatDate(values?.employee?.positionEffectiveDate, 'YYYY-MM-DD')
      )
      formData.append('grade_id', '')
      formData.append('grade_effective_date', '')
      formData.append('echelon_id', '')
      formData.append('echelon_effective_date', '')
      formData.append('institution_id', '')
      formData.append(
        'education_level',
        handleGetValue(
          'employeeEducationLevel',
          values?.employee?.educationLevel
        )
      )
      formData.append('education_name', values?.employee?.educationName)
      formData.append(
        'education_year',
        handleFormatDate(values?.employee?.educationYear, 'YYYY')
      )
      formData.append(
        'employee_id_card_number',
        values?.employee?.employeeIdCardNumber
      )
      formData.append('employee_id_card', '')
      formData.append('karisu_number', values?.employee?.karisu)
      formData.append('id_tax', values?.employee?.taxId)
      formData.append(
        'employment_status',
        handleGetValue('employeeStatus', values?.employee?.employmentStatus)
      )
      formData.append(
        'family_registration_number',
        values?.employee?.familyRegistNumber
      )
      formData.append('id_number', values?.employee?.idNumber)
      formData.append(
        'residence_id',
        values?.employee?.residence
          ? handleGetValue('residence', values?.employee?.residence)
          : null
      )
      formData.append('residence_description', values?.employee?.residenceName)
      formData.append('current_address', values?.employee?.address)
      formData.append(
        'home_phone_number',
        values?.employee?.homeTelephoneNumber
      )
      formData.append('mobile_phone', values?.employee?.mobilePhone)
      formData.append('office_address', values?.employee?.officeAddress)
      formData.append(
        'office_phone_number',
        values?.employee?.officeTelephoneNumber
      )
      formData.append('email', values?.employee?.email)
      formData.append('office_email', values?.employee?.officeEmail)
      formData.append('emergency_contact', values?.employee?.emergencyContact)
      formData.append('description', values?.employee?.description)
      formData.append(
        'quit_date',
        handleFormatDate(values?.employee?.lastDateOfWork, 'YYYY-MM-DD')
      )
      formData.append('type', 3)

      // Educations
      educations.map((item, index) => {
        formData.append(
          `educations[${index}][level]`,
          handleGetValue('employeeEducationLevel', item?.educationLevel)
        )
        formData.append(`educations[${index}][name]`, item?.educationName)
        formData.append(`educations[${index}][faculty]`, item?.educationFaculty)
        formData.append(`educations[${index}][major]`, item?.educationMajor)
        formData.append(
          `educations[${index}][status]`,
          handleGetValue('educationStatus', item?.educationStatus)
        )
        formData.append(
          `educations[${index}][year_of_graduation]`,
          handleFormatDate(item?.educationYear, 'YYYY')
        )
        formData.append(
          `educations[${index}][description]`,
          item?.educationDescription
        )
        formData.append(
          `educations[${index}][degree_document]`,
          item?.educationCertificate
        )
      })

      // Notes
      notes.map((item, index) => {
        formData.append(`notes[${index}][description]`, item?.description)
      })

      postEmployee(formData)
    } catch (err) {
      if (!err.inner || err.inner.length === 0) {
        return
      }

      const newErrors = {}
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message
        formikRef.current.setFieldError(error.path, error.message)
      })

      const firstErrorField = err.inner[0].path
      const firstErrorEl = document.querySelector(`[name="${firstErrorField}"]`)
      firstErrorEl &&
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleChangeHierarchies = (val) => {
    const datas = val.filter((itm) => itm?.name !== null)

    if (datas.length > 0) {
      const length = datas?.length
      const index = length - 1
      const item = datas[index]
      const dataPosition = positions.flat(1)
      const lengthPositions = positions.length
      const id = dataPosition.find((itm) => itm?.name == item?.name)?.id

      if (length < lengthPositions) {
        const newPositions = positions.slice(0, length)
        setPositions(newPositions)
      }

      if (id) onFetchHierarchy(id)
    } else {
      const newPositions = positions.length > 0 ? positions.slice(0, 1) : []
      setPositions(newPositions)
    }
  }

  const handleGetPositionType = (val) => {
    const dataPosition = positions.flat(1)
    const item = dataPosition.find((itm) => itm?.name == val)

    if (item) return item?.type?.name.toLowerCase()

    return ''
  }

  useEffect(() => {
    const data = position?.data
    const isValidate = data?.length > 0
    const isChecked = positions.some((subArray) =>
      data.every((value) => subArray.some((item) => item.id === value.id))
    )

    if (isValidate && !isChecked) {
      const values = [...positions, data]
      setPositions(values)
    }
  }, [position?.data])

  useEffect(() => {
    const state =
      !position?.loading && !residence?.loading && !employmentType?.loading
    onLoading(state)
  }, [position, residence, employmentType])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          handleBack={() => router.back()}
          summary={'Tambah Pegawai Outsourcing'}
          action={
            <Box>
              <Button
                text='Simpan'
                color='primary'
                onClick={() => handleSubmit(formikProps?.values)}
              />
            </Box>
          }
        >
          <FormComponent
            mode='add'
            pageType='OUTSOURCING'
            options={options}
            formikRef={formikRef}
            formikProps={formikProps}
            errorsForm={errorsForm}
            onGetPositionType={handleGetPositionType}
            onChangeHierarchies={handleChangeHierarchies}
          />
        </LayoutPages>
      )}
    </Formik>
  )
}

EmployeeAddComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  residence: PropTypes.object,
  employmentType: PropTypes.object,
  postEmployee: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default EmployeeAddComponent
