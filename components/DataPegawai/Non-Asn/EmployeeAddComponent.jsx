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
    emergencyContact: ''
  },
  educations: [],
  families: [],
  leaves: [],
  notes: [],
  assessments: [],
  competences: [],
  talentPools: [],
  credits: []
}

const FormSchema = Yup.object().shape({
  employee: Yup.object().shape({
    name: Yup.string().required('Nama tidak boleh kosong'),
    nip: Yup.string().required('NIP tidak boleh kosong'),
    placeOfBirth: Yup.string().required('Tempat Lahir tidak boleh kosong'),
    dateOfBirth: Yup.string().required('Tanggal Lahir tidak boleh kosong'),
    religion: Yup.string().required('Agama tidak boleh kosong'),
    gender: Yup.string().required('Jenis Kelamin tidak boleh kosong'),
    maritalStatus: Yup.string().required(
      'Status Perkawinan tidak boleh kosong'
    ),
    employmentType: Yup.string().required(
      'Jenis Perbantuan tidak boleh kosong'
    ),
    dateStartedWork: Yup.string().required(
      'Tanggal Mulai Bekerja tidak boleh kosong'
    ),
    position: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .nullable()
          .test('is-null', 'Jabatan tidak boleh kosong', function (value) {
            const { path, createError } = this
            if (this.parent[0].name === null) {
              return createError({
                path: `${path}`,
                message: 'Jabatan tidak boleh kosong'
              })
            }
            return true
          })
      })
    ),
    positionEffectiveDate: Yup.string().required(
      'TMT Menjabat tidak boleh kosong'
    ),
    grade: Yup.string().required('Golongan tidak boleh kosong'),
    gradeEffectiveDate: Yup.string().required(
      'TMT Golongan tidak boleh kosong'
    ),
    institution: Yup.string().required('Instansi Induk tidak boleh kosong'),
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
        if (employmentStatus !== 'Aktif' && employmentStatus !== 'Aktif PS') {
          return value != null && value !== ''
        }
        return true
      }
    ),
    familyRegistNumber: Yup.string()
      .min(16, 'No KK harus memiliki minimal 16 digit')
      .required('No KK tidak boleh kosong'),
    idNumber: Yup.string()
      .min(16, 'No NIK harus memiliki minimal 16 digit')
      .required('No NIK tidak boleh kosong'),
    residence: Yup.string().required('Komplek tidak boleh kosong'),
    emergencyContact: Yup.string().required(
      'Kontak Darurat tidak boleh kosong'
    ),
    email: Yup.string().email('Email tidak valid'),
    officeEmail: Yup.string().email('Email Dinas tidak valid'),
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
      ),
    employeeIdCard: Yup.mixed()
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
  families: Yup.lazy((families) => {
    if (Array.isArray(families) && families.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          familyRegistNumber: Yup.string()
            .min(16, 'No KK harus memiliki minimal 16 digit')
            .required('No Kartu Keluarga tidak boleh kosong'),
          name: Yup.string().required(
            'Nama Anggota Keluarga tidak boleh kosong'
          ),
          idNumber: Yup.string()
            .min(16, 'No NIK harus memiliki minimal 16 digit')
            .required('No NIK tidak boleh kosong'),
          gender: Yup.string().required('Jenis Kelamin tidak boleh kosong'),
          religion: Yup.string().required('Agama tidak boleh kosong'),
          placeOfBirth: Yup.string().required(
            'Tempat Lahir tidak boleh kosong'
          ),
          dateOfBirth: Yup.string().required(
            'Tanggal Lahir tidak boleh kosong'
          ),
          relationshipStatus: Yup.string().required(
            'Hubungan Keluarga tidak boleh kosong'
          ),
          educationLevel: Yup.string().required(
            'Pendidikan tidak boleh kosong'
          ),
          maritalStatus: Yup.string().required(
            'Status Perkawinan tidak boleh kosong'
          )
        })
      )
    } else {
      return Yup.array()
    }
  }),
  leaves: Yup.lazy((leaves) => {
    if (Array.isArray(leaves) && leaves.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          period: Yup.object()
            .shape({
              from: Yup.string().required('Pilih tanggal awal'),
              to: Yup.string().required('Pilih tanggal akhir')
            })
            .required('Periode tidak boleh kosong'),
          type: Yup.string().required('Jenis Cuti tidak boleh kosong'),
          number: Yup.string().required('No Cuti tidak boleh kosong'),
          description: Yup.string().required('Keterangan tidak boleh kosong'),
          leaveLetter: Yup.mixed()
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
          description: Yup.string().required('Catatan tidak boleh kosong')
        })
      )
    } else {
      return Yup.array()
    }
  }),
  assessments: Yup.lazy((assesments) => {
    if (Array.isArray(assesments) && assesments.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required('Tanggal tidak boleh kosong'),
          point: Yup.string().required('Hasil tidak boleh kosong'),
          certificate: Yup.mixed()
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
  competences: Yup.lazy((competences) => {
    if (Array.isArray(competences) && competences.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required('Tanggal tidak boleh kosong'),
          point: Yup.string().required('Hasil tidak boleh kosong'),
          certificate: Yup.mixed()
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
  talentPools: Yup.lazy((talentPools) => {
    if (Array.isArray(talentPools) && talentPools.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required('Tanggal tidak boleh kosong'),
          point: Yup.string().required('Hasil tidak boleh kosong'),
          certificate: Yup.mixed()
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
  credits: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          period: Yup.string().required('Periode tidak boleh kosong'),
          year: Yup.string().required('Tahun tidak boleh kosong')
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
  grade,
  echelon,
  institution,
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
    const newEchelon = echelon?.options ? handleMapping(echelon?.options) : []
    const newGrade = grade?.options ? handleMapping(grade?.options) : []
    const newInstitution = institution?.options
      ? handleMapping(institution?.options)
      : []
    const newEmploymentType = employmentType?.data
      ? handleMapping(employmentType?.data)
      : []

    const dataOptions = {
      positions: newPosition,
      echelon: newEchelon,
      grade: newGrade,
      institution: newInstitution,
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
  }, [positions, echelon, grade, institution, residence, employmentType])

  const handleGetValue = (type, val, idx) => {
    if (val) {
      if (type == 'position') {
        const dataPosition = positions.flat(1)
        const item = dataPosition.find((itm) => itm?.name == val)
        return item?.id
      } else if (type == 'grade') {
        const idItm =
          grade?.options && grade?.options.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'echelon') {
        const idItm =
          echelon?.options &&
          echelon?.options.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'institution') {
        const idItm =
          institution?.options &&
          institution?.options.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'residence') {
        const idItm =
          residence?.data && residence?.data.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'discipleType') {
        const idItm =
          disciplinary?.options &&
          disciplinary?.options.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'group') {
        const idItm =
          group?.data && group?.data.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'employmentType') {
        const item =
          employmentType?.data &&
          employmentType?.data.find((itm) => itm?.name == val)?.id

        return item
      } else if (type == 'decreeType') {
        const item =
          decree?.data && decree?.data.find((itm) => itm?.name == val)?.id

        return item
      } else {
        const index = options[type].findIndex((itm) => itm == val) + 1
        return index
      }
    } else {
      return val
    }
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
      const families = values?.families || []
      const leaves = values?.leaves || []
      const notes = values?.notes || []
      const credits = values?.credits || []
      const assessments = values?.assessments || []
      const competences = values?.competences || []
      const talentPools = values?.talentPools || []

      const formData = new FormData()

      // Employee
      formData.append('photo_profile', values?.employee?.image)
      formData.append('name', values?.employee?.name)
      formData.append('title_prefix', values?.employee?.titlePrefix)
      formData.append('title_suffix', values?.employee?.titleSuffix)
      formData.append('employee_id_number', values?.employee?.nip)
      formData.append('employee_registration_number', values?.employee?.nrp)
      formData.append('place_of_birth', values?.employee?.placeOfBirth)
      formData.append(
        'date_of_birth',
        moment(values?.employee?.dateOfBirth).format('YYYY-MM-DD')
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
        moment(values?.employee?.dateStartedWork).format('YYYY-MM-DD')
      )
      formData.append(
        'position_id',
        handleGetValue('position', itemPosition, indexPosition)
      )
      formData.append(
        'position_effective_date',
        moment(values?.employee?.positionEffectiveDate).format('YYYY-MM-DD')
      )
      formData.append(
        'grade_id',
        handleGetValue('grade', values?.employee?.grade)
      )
      formData.append(
        'grade_effective_date',
        moment(values?.employee?.gradeEffectiveDate).format('YYYY-MM-DD')
      )
      formData.append(
        'echelon_id',
        values?.employee?.echelon
          ? handleGetValue('echelon', values?.employee?.echelon)
          : ''
      )
      formData.append(
        'echelon_effective_date',
        values?.employee?.echelonEffectiveDate
          ? moment(values?.employee?.echelonEffectiveDate).format('YYYY-MM-DD')
          : ''
      )
      formData.append(
        'institution_id',
        handleGetValue('institution', values?.employee?.institution)
      )
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
        moment(values?.employee?.educationYear).format('YYYY')
      )
      formData.append(
        'employee_id_card_number',
        values?.employee?.employeeIdCardNumber
      )
      formData.append('employee_id_card', values?.employee?.employeeIdCard)
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
      formData.append('description', null)
      formData.append('type', 2)

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
          moment(item?.educationYear).format('YYYY')
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

      // Families
      families.map((item, index) => {
        formData.append(
          `families[${index}][card_number]`,
          item?.familyRegistNumber
        )
        formData.append(`families[${index}][name]`, item?.name)
        formData.append(`families[${index}][id_number]`, item?.idNumber)
        formData.append(
          `families[${index}][gender]`,
          item?.gender == 'Laki-Laki' ? 1 : 0
        )
        formData.append(
          `families[${index}][religion]`,
          handleGetValue('religion', item?.religion)
        )
        formData.append(
          `families[${index}][place_of_birth]`,
          item?.placeOfBirth
        )
        formData.append(
          `families[${index}][date_of_birth]`,
          moment(item?.dateOfBirth).format('YYYY-MM-DD')
        )
        formData.append(
          `families[${index}][name_of_father]`,
          item?.nameOfFather
        )
        formData.append(
          `families[${index}][name_of_mother]`,
          item?.nameOfMother
        )
        formData.append(
          `families[${index}][relationship_status]`,
          handleGetValue('relationshipStatus', item?.relationshipStatus)
        )
        formData.append(
          `families[${index}][education]`,
          handleGetValue('educationLevel', item?.educationLevel)
        )
        formData.append(`families[${index}][occupation]`, item?.occupation)
        formData.append(
          `families[${index}][occupation_description]`,
          item?.occupationDescription
        )
        formData.append(
          `families[${index}][marital_status]`,
          handleGetValue('marital', item?.maritalStatus)
        )
        formData.append(`families[${index}][mobile_phone]`, item?.mobilePhone)
        formData.append(
          `families[${index}][sequence_number]`,
          item?.sequenceNumber
        )
      })

      // Leaves
      leaves.map((item, index) => {
        formData.append(
          `leaves[${index}][start_date]`,
          moment(item?.period?.from).format('YYYY-MM-DD')
        )
        formData.append(
          `leaves[${index}][end_date]`,
          moment(item?.period?.to).format('YYYY-MM-DD')
        )
        formData.append(
          `leaves[${index}][type]`,
          handleGetValue('leaves', item?.type)
        )
        formData.append(`leaves[${index}][number]`, item?.number)
        formData.append(`leaves[${index}][description]`, item?.description)
        formData.append(`leaves[${index}][letter]`, item?.leaveLetter)
      })

      // Notes
      notes.map((item, index) => {
        formData.append(`notes[${index}][description]`, item?.description)
      })

      // Credits
      credits.map((item, index) => {
        formData.append(`credits[${index}][position]`, item?.position)
        formData.append(
          `credits[${index}][period]`,
          handleGetValue('periodCredits', item?.period)
        )
        formData.append(`credits[${index}][year]`, item?.year)
        formData.append(`credits[${index}][score]`, item?.point)
        formData.append(
          `credits[${index}][start_month]`,
          item?.month?.start
            ? handleGetValue('months', item?.month?.start)
            : null
        )
        formData.append(
          `credits[${index}][end_month]`,
          item?.month?.end ? handleGetValue('months', item?.month?.end) : null
        )
      })

      // Assesments
      assessments.map((item, index) => {
        formData.append(
          `assessments[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `assessments[${index}][point]`,
          handleGetValue('assessments', item?.point)
        )
        formData.append(`assessments[${index}][organizer]`, item?.organizer)
        formData.append(
          `assessments[${index}][assessment_document]`,
          item?.certificate
        )
      })

      // Competences
      competences.map((item, index) => {
        formData.append(
          `competencies[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `competencies[${index}][point]`,
          handleGetValue('competences', item?.point)
        )
        formData.append(`competencies[${index}][organizer]`, item?.organizer)
        formData.append(
          `competencies[${index}][competency_document]`,
          item?.certificate
        )
      })

      // Talent Pools
      talentPools.map((item, index) => {
        formData.append(
          `talents[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `talents[${index}][point]`,
          handleGetValue('talentPools', item?.point)
        )
        formData.append(`talents[${index}][organizer]`, item?.organizer)
        formData.append(`talents[${index}][talent_document]`, item?.certificate)
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
      !position?.loading &&
      !echelon?.loading &&
      !grade?.loading &&
      !institution?.loading &&
      !residence?.loading &&
      !employmentType?.loading
    onLoading(state)
  }, [position, echelon, grade, institution, residence, employmentType])

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
          summary={'Tambah Pegawai Non ASN'}
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
            pageType='NON_ASN'
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
  echelon: PropTypes.object,
  grade: PropTypes.object,
  institution: PropTypes.object,
  residence: PropTypes.object,
  employmentType: PropTypes.object,
  postEmployee: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default EmployeeAddComponent
