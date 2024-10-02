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
  maritalStatuFamilysOptions,
  maritalStatusOptions,
  monthOptions,
  periodCreditsOptions,
  periodOptions,
  positionDescOptions,
  ppkDescOptions,
  predicateOptions,
  ratingOptions,
  ratingOrganizationOptions,
  relationshipStatusOptions,
  religionOptions,
  statusOptions,
  studyAreaOptions,
  talentPoolsOptions
} from 'libs/types/options'

const isFile = (value) => {
  return typeof value !== 'string'
}

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
    description: '',
    yearsOfServiceTotal: {
      year: 0,
      month: 0
    }
  },
  families: [],
  positions: [],
  trainingTechnicals: [],
  educations: [],
  notes: []
}

const FormSchema = Yup.object().shape({
  employee: Yup.object().shape({
    name: Yup.string().required('Nama tidak boleh kosong'),
    nip: Yup.string()
      .min(5, 'NIP tidak boleh kurang dari 5 digit')
      .max(18, 'NIP tidak boleh lebih dari 18 digit')
      .required('NIP tidak boleh kosong'),
    placeOfBirth: Yup.string().required('Tempat Lahir tidak boleh kosong'),
    dateOfBirth: Yup.string().required('Tanggal Lahir tidak boleh kosong'),
    religion: Yup.string().required('Agama tidak boleh kosong'),
    gender: Yup.string().required('Jenis Kelamin tidak boleh kosong'),
    // maritalStatus: Yup.string().required(
    //   'Status Perkawinan tidak boleh kosong'
    // ),
    employmentType: Yup.string().required(
      'Jenis Outsourcing tidak boleh kosong'
    ),
    // dateStartedWork: Yup.string().required(
    //   'Tanggal Mulai Bekerja tidak boleh kosong'
    // ),
    positions: Yup.array().of(
      Yup.object().shape({
        name: Yup.mixed()
          .nullable()
          .test('is-required', 'Jabatan tidak boleh kosong', function (value) {
            const { path } = this
            const { employmentStatus } = this.parent

            const pathParts = path.split('.')
            const index = pathParts[1].match(/\d+/)[0]

            if (
              !value &&
              index == 0 &&
              employmentStatus !== 'Aktif' &&
              employmentStatus !== 'Aktif Perbantuan Setneg'
            )
              return false

            return true
          })
      })
    ),
    positionEffectiveDate: Yup.string()
      .nullable()
      .required('TMT Menjabat tidak boleh kosong'),
    educationLevel: Yup.string().required(
      'Tingak Pendidikan tidak boleh kosong'
    ),
    // educationName: Yup.string().required(
    //   'Nama Sekolah/Universitas tidak boleh kosong'
    // ),
    // educationYear: Yup.string().required('Tahun Lulus tidak boleh kosong'),
    employmentStatus: Yup.string().required(
      'Status Pegawai tidak boleh kosong'
    ),
    // lastDateOfWork: Yup.string().test(
    //   'is-required',
    //   'Tanggal Terakhir Bekerja tidak boleh kosong',
    //   function (value) {
    //     const { employmentStatus } = this.parent
    //     if (
    //       employmentStatus !== 'Aktif' &&
    //       employmentStatus !== 'Aktif Perbantuan Setneg' &&
    //       employmentStatus !== 'Hukuman Disiplin'
    //     ) {
    //       return value != null && value !== ''
    //     }
    //     return true
    //   }
    // ),
    familyRegistNumber: Yup.string().test(
      'len',
      'No KK harus terdiri dari 16 digit angka',
      function (value) {
        if (value && value.length > 0) return value.length === 16
        return true
      }
    ),
    idNumber: Yup.string()
      .min(16, 'No NIK harus terdiri dari 16 digit angka')
      .max(16, 'No NIK harus terdiri dari 16 digit angka')
      .required('No NIK tidak boleh kosong'),
    // residence: Yup.string().required('Komplek tidak boleh kosong'),
    emergencyContact: Yup.string().required(
      'Kontak Darurat tidak boleh kosong'
    ),
    email: Yup.string()
      .required('Email tidak boleh kosong')
      .email('Email tidak valid'),
    taxId: Yup.string()
      .nullable()
      .test(
        'length-check',
        'NPWP harus terdiri dari 15 hingga 16 digit',
        function (value) {
          if (!value) return true
          return value.length >= 15 && value.length <= 16
        }
      ),
    yearsOfServiceTotal: Yup.object().shape({
      month: Yup.number()
        .nullable()
        .notRequired()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .test(
          'max-12',
          'Jumlah Bulan tidak boleh lebih dari 12',
          function (value) {
            if (value === null || value === undefined) return true
            return value <= 12
          }
        )
    }),
    image: Yup.mixed()
      .nullable()
      .test('fileType', 'Format file harus PNG, JPG', (value) => {
        if (!value || !isFile(value)) return true
        const fileType = value && value.type
        return fileType === 'image/png' || fileType === 'image/jpeg'
      })
      .test('fileSize', 'Ukuran file tidak boleh lebih dari 2MB', (value) => {
        const maxSize = 2 * 1024 * 1024
        if (!value || !isFile(value)) return true
        return value.size <= maxSize
      })
      .test(
        'fileDimensions',
        'Ukuran dimensi file harus 350px x 500px',
        async (value) => {
          if (!value || !isFile(value)) return true

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
  families: Yup.lazy((families) => {
    if (Array.isArray(families) && families.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          familyRegistNumber: Yup.string()
            .min(16, 'No KK harus tediri dari 16 digit angka')
            .max(16, 'No KK harus tediri dari 16 digit angka')
            .required('No Kartu Keluarga tidak boleh kosong'),
          name: Yup.string().required(
            'Nama Anggota Keluarga tidak boleh kosong'
          ),
          idNumber: Yup.string()
            .min(16, 'No NIK harus terdiri dari 16 digit angka')
            .max(16, 'No NIK harus terdiri dari 16 digit angka')
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
  positions: Yup.lazy((positions) => {
    if (Array.isArray(positions) && positions.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          position: Yup.string().required('Jabatan tidak boleh kosong'),
          // group: Yup.string().required('Rumpun tidak boleh kosong'),
          effectiveDate: Yup.string().required(
            'TMT Menjabat tidak boleh kosong'
          ),
          status: Yup.string().required('Status tidak boleh kosong'),
          decreeDocument: Yup.mixed()
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
  }),
  trainingTechnicals: Yup.lazy((trainingTechnicals) => {
    if (Array.isArray(trainingTechnicals) && trainingTechnicals.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          certificate: Yup.mixed()
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
  // educations: Yup.lazy((educations) => {
  //   if (Array.isArray(educations) && educations.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         educationLevel: Yup.string().required('Tingkat tidak boleh kosong'),
  //         educationName: Yup.string().required('Nama tidak boleh kosong'),
  //         educationStatus: Yup.string().required('Status tidak boleh kosong'),
  //         educationYear: Yup.string().required(
  //           'Tahun Lulus tidak boleh kosong'
  //         ),
  //         educationCertificate: Yup.mixed()
  //           .nullable()
  //           .test(
  //             'fileType',
  //             'Format file harus PNG, JPG, atau PDF',
  //             (value) => {
  //               if (!value || !isFile(value)) return true
  //               const fileType = value && value.type
  //               return (
  //                 fileType === 'image/png' ||
  //                 fileType === 'image/jpeg' ||
  //                 fileType === 'application/pdf'
  //               )
  //             }
  //           )
  //           .test(
  //             'fileSize',
  //             'Ukuran file tidak boleh lebih dari 2MB',
  //             (value) => {
  //               const maxSize = 2 * 1024 * 1024
  //               if (!value || !isFile(value)) return true
  //               return value.size <= maxSize
  //             }
  //           ),
  //         educationStudyAssignmentLetter: Yup.mixed()
  //           .nullable()
  //           .test(
  //             'fileType',
  //             'Format file harus PNG, JPG, atau PDF',
  //             (value) => {
  //               if (!value) return true
  //               const fileType = value && value.type
  //               return (
  //                 fileType === 'image/png' ||
  //                 fileType === 'image/jpeg' ||
  //                 fileType === 'application/pdf'
  //               )
  //             }
  //           )
  //           .test(
  //             'fileSize',
  //             'Ukuran file tidak boleh lebih dari 2MB',
  //             (value) => {
  //               const maxSize = 2 * 1024 * 1024
  //               if (!value) return true
  //               return value.size <= maxSize
  //             }
  //           ),
  //         edudcationAcademicTitleLetter: Yup.mixed()
  //           .nullable()
  //           .test(
  //             'fileType',
  //             'Format file harus PNG, JPG, atau PDF',
  //             (value) => {
  //               if (!value) return true
  //               const fileType = value && value.type
  //               return (
  //                 fileType === 'image/png' ||
  //                 fileType === 'image/jpeg' ||
  //                 fileType === 'application/pdf'
  //               )
  //             }
  //           )
  //           .test(
  //             'fileSize',
  //             'Ukuran file tidak boleh lebih dari 2MB',
  //             (value) => {
  //               const maxSize = 2 * 1024 * 1024
  //               if (!value) return true
  //               return value.size <= maxSize
  //             }
  //           )
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // }),
  // notes: Yup.lazy((notes) => {
  //   if (Array.isArray(notes) && notes.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         description: Yup.string()
  //           .required('Catatan tidak boleh kosong')
  //           .max(160, 'Catatan tidak boleh lebih dari 160 karakter')
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const EmployeeEditComponent = ({
  employee,
  position,
  echelon,
  decree,
  group,
  residence,
  employmentType,
  getEmployee = () => {},
  updateEmployee = () => {},
  clearEmployeeState = () => {},
  onFetchHierarchy = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [positions, setPositions] = useState([])
  const [isExpand, setIsExpand] = useState(false)

  const errorsForm = useMemo(() => {
    return employee?.errorForm || {}
  }, [employee?.errorForm])

  const handleMapping = (type, val) => {
    if (type == 'positions') {
      const detail = employee?.detail
      const hierarchies = detail?.position || []

      const dataMap = new Map(
        hierarchies.map((item, index) => [item.id, index])
      )

      const sortedArr = val.sort((a, b) => {
        const aId = a.find((item) => dataMap.has(item.id))?.id
        const bId = b.find((item) => dataMap.has(item.id))?.id

        if (aId !== undefined && bId !== undefined) {
          return dataMap.get(aId) - dataMap.get(bId)
        }

        if (aId !== undefined) return -1
        if (bId !== undefined) return 1

        return 0
      })

      const sortedNames = sortedArr.map((group) =>
        group.map((item) => item.name)
      )

      return sortedNames
    } else {
      const arr = []

      val.map((itm) => {
        if (type == 'employments' && itm?.status) {
          arr.push(itm?.name)
        }

        if (type !== 'employments') {
          arr.push(itm?.name)
        }
      })

      return arr
    }
  }

  const options = useMemo(() => {
    const newPosition =
      positions.length > 0 ? handleMapping('positions', positions) : []
    const newResidence = residence?.data
      ? handleMapping('residences', residence?.data)
      : []
    const newEmploymentType = employmentType?.data
      ? handleMapping('employments', employmentType?.data)
      : []
    const newGroup = group?.data ? handleMapping('groups', group?.data) : []
    const newDecreeType = decree?.data
      ? handleMapping('decrees', decree?.data)
      : []
    const newEchelon = echelon?.options
      ? handleMapping('echelons', echelon?.options)
      : []

    const dataOptions = {
      positions: newPosition,
      echelon: newEchelon,
      grade: [],
      institution: [],
      residence: newResidence,
      employmentType: newEmploymentType,
      religion: religionOptions,
      gender: genderOptions,
      marital: maritalStatusOptions,
      maritalFamily: maritalStatuFamilysOptions,
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
      periodCredits: periodCreditsOptions,
      status: statusOptions,
      positionDescription: positionDescOptions,
      decreeType: newDecreeType,
      group: newGroup,
      period: periodOptions,
      workBehavior: ratingOptions,
      performance: predicateOptions,
      performanceAchievement: ratingOrganizationOptions,
      discipleType: [],
      performancesType: ppkDescOptions,
      studyArea: studyAreaOptions
    }

    return dataOptions
  }, [positions, residence, employmentType, echelon, decree, group])

  const handleGetValueID = (type, val, idx) => {
    if (val) {
      if (type == 'position') {
        const dataPosition = positions[idx]
        const item = dataPosition.find((itm) => itm?.name == val)
        return item?.id
      } else if (type == 'echelon') {
        const idItm =
          echelon?.options &&
          echelon?.options.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'group') {
        const idItm =
          group?.data && group?.data.find((itm) => itm?.name == val)?.id
        return idItm
      } else if (type == 'decreeType') {
        const item =
          decree?.data && decree?.data.find((itm) => itm?.name == val)?.id

        return item
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
      return ''
    }
  }

  const handleGetValue = (type, val) => {
    if ((val || val >= 0) && val !== null) {
      if (type == 'residence') {
        const item =
          residence?.data && residence?.data.find((itm) => itm?.id == val)?.name
        return item
      } else if (type == 'employmentType') {
        const item =
          employmentType?.data &&
          employmentType?.data.find((itm) => itm?.id == val)?.name

        return item
      } else if (type == 'echelon') {
        const item =
          echelon?.options &&
          echelon?.options.find((itm) => itm?.id == val)?.name
        return item
      } else if (type == 'decree') {
        const item =
          decree?.data && decree?.data.find((itm) => itm?.id == val)?.name
        return item
      } else if (type == 'group') {
        const item =
          group?.data && group?.data.find((itm) => itm?.id == val)?.name
        return item
      } else {
        const index = val - 1
        const item = options[type][index]
        return item
      }
    } else {
      return null
    }
  }

  const handleFormatDate = (value, format) => {
    if (value) return moment(value).format(format)

    return ''
  }

  const handleSubmit = async (values) => {
    setIsExpand(true)

    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const emptyArray = ''

      const id = atob(router?.query?.id)

      const position = values?.employee?.positions.filter(
        (itm) => itm?.name !== null
      )
      const positionLength = position.length
      const indexPosition = positionLength > 0 ? positionLength - 1 : 0
      const itemPosition =
        positionLength > 0 ? position[indexPosition]?.name : ''

      const educations = values?.educations || []
      const families = values?.families || []
      const leaves = values?.leaves || []
      const notes = values?.notes || []
      const credits = values?.credits || []
      const assessments = values?.assessments || []
      const competences = values?.competences || []
      const talentPools = values?.talentPools || []
      const positions = values?.positions || []
      const grades = values?.grades || []
      const structurals = values?.trainingStructurals || []
      const functionals = values?.trainingFungsionals || []
      const technicals = values?.trainingTechnicals || []
      const targets = values?.targets || []
      const performances = values?.performances || []
      const disciplinaries = values?.disciplinaries || []

      const formData = new FormData()

      // Employee
      formData.append(
        'photo_profile',
        !values?.employee?.image || typeof values?.employee?.image == 'string'
          ? ''
          : values?.employee?.image
      )
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
        handleGetValueID('religion', values?.employee?.religion)
      )
      formData.append('gender', values?.employee?.gender == 'Laki-Laki' ? 1 : 0)
      formData.append(
        'marital_status',
        handleGetValueID('marital', values?.employee?.maritalStatus)
      )
      formData.append(
        'employment_type_id',
        handleGetValueID('employmentType', values?.employee?.employmentType)
      )
      formData.append(
        'cpns_effective_date',
        handleFormatDate(values?.employee?.dateStartedWork, 'YYYY-MM-DD')
      )
      formData.append(
        'position_id',
        positionLength > 0
          ? handleGetValueID('position', itemPosition, indexPosition)
          : ''
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
        handleGetValueID(
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
        handleGetValueID('employeeStatus', values?.employee?.employmentStatus)
      )
      formData.append(
        'family_registration_number',
        values?.employee?.familyRegistNumber
      )
      formData.append('id_number', values?.employee?.idNumber)
      formData.append(
        'residence_id',
        values?.employee?.residence
          ? handleGetValueID('residence', values?.employee?.residence)
          : ''
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
      formData.append('delete_employee_id_card', 0)
      formData.append(
        'quit_date',
        handleFormatDate(values?.employee?.lastDateOfWork, 'YYYY-MM-DD')
      )
      formData.append(
        'years_of_service_total',
        values?.employee?.yearsOfServiceTotal?.year
      )
      formData.append(
        'month_of_service_total',
        values?.employee?.yearsOfServiceTotal?.month
      )
      formData.append('type', 3)

      // Families
      if (families.length > 0) {
        families.map((item, index) => {
          formData.append(`families[${index}][id]`, item?.id || '')
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
            handleGetValueID('religion', item?.religion, '')
          )
          formData.append(
            `families[${index}][place_of_birth]`,
            item?.placeOfBirth
          )
          formData.append(
            `families[${index}][date_of_birth]`,
            handleFormatDate(item?.dateOfBirth, 'YYYY-MM-DD')
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
            handleGetValueID('relationshipStatus', item?.relationshipStatus, '')
          )
          formData.append(
            `families[${index}][education]`,
            handleGetValueID('educationLevel', item?.educationLevel, '')
          )
          formData.append(`families[${index}][occupation]`, item?.occupation)
          formData.append(
            `families[${index}][occupation_description]`,
            item?.occupationDescription
          )
          formData.append(
            `families[${index}][marital_status]`,
            handleGetValueID('maritalFamily', item?.maritalStatus, '')
          )
          formData.append(
            `families[${index}][marriage_other_notes]`,
            item?.marriageOther
          )
          formData.append(`families[${index}][mobile_phone]`, item?.mobilePhone)
          formData.append(
            `families[${index}][sequence_number]`,
            item?.sequenceNumber
          )
        })
      } else {
        formData.append(`families`, emptyArray)
      }

      // History Positions
      positions.map((item, index) => {
        formData.append(`positions[${index}][id]`, item?.id || '')
        formData.append(`positions[${index}][position]`, item?.position)
        formData.append(
          `positions[${index}][group_id]`,
          handleGetValueID('group', item?.group, '')
        )
        formData.append(
          `positions[${index}][echelon]`,
          item?.level ? handleGetValueID('echelon', item?.level, '') : ''
        )
        formData.append(
          `positions[${index}][position_status]`,
          item?.description
            ? handleGetValueID('positionDescription', item?.description, '')
            : ''
        )
        formData.append(
          `positions[${index}][effective_date]`,
          handleFormatDate(item?.effectiveDate, 'YYYY-MM-DD')
        )
        formData.append(`positions[${index}][decree]`, item?.decree)
        formData.append(
          `positions[${index}][decree_document]`,
          !item?.decreeDocument || typeof item?.decreeDocument == 'string'
            ? ''
            : item?.decreeDocument
        )
        formData.append(
          `positions[${index}][type_of_decree]`,
          item?.decreeType
            ? handleGetValueID('decreeType', item?.decreeType, '')
            : ''
        )
        formData.append(
          `positions[${index}][decree_number]`,
          item?.decreeNumber
        )
        formData.append(
          `positions[${index}][decree_date]`,
          handleFormatDate(item?.decreeDate, 'YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][termination_date]`,
          handleFormatDate(item?.terminationDate, 'YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][termination_decree]`,
          item?.terminationDecree || ''
        )
        formData.append(
          `positions[${index}][type_of_termination_decree]`,
          item?.terminationDecreeType
            ? handleGetValueID('decreeType', item?.terminationDecreeType, '')
            : ''
        )
        formData.append(
          `positions[${index}][termination_decree_number]`,
          item?.terminationDecreeNumber
        )
        formData.append(
          `positions[${index}][termination_decree_date]`,
          handleFormatDate(item?.terminationDecreeDate, 'YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][status]`,
          item?.status == 'Aktif' ? 1 : 0
        )
        formData.append(
          `positions[${index}][delete_decree_document]`,
          values?.decreeDocument ? 0 : 1
        )
      })

      // History Technicals Trainigns
      technicals.map((item, index) => {
        formData.append(`technicals[${index}][id]`, item?.id || '')
        formData.append(
          `technicals[${index}][certificate]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `technicals[${index}][delete_certificate]`,
          item?.certificate ? 0 : 1
        )
      })

      // Educations
      // if (educations.length > 0) {
      //   educations.map((item, index) => {
      //     formData.append(`educations[${index}][id]`, item?.id || '')
      //     formData.append(
      //       `educations[${index}][level]`,
      //       handleGetValueID('employeeEducationLevel', item?.educationLevel)
      //     )
      //     formData.append(`educations[${index}][name]`, item?.educationName)
      //     formData.append(
      //       `educations[${index}][study_area]`,
      //       handleGetValueID('studyArea', item?.educationArea, '')
      //     )
      //     formData.append(
      //       `educations[${index}][accreditation]`,
      //       item?.educationAccreditation
      //     )
      //     formData.append(
      //       `educations[${index}][faculty]`,
      //       item?.educationFaculty
      //     )
      //     formData.append(`educations[${index}][major]`, item?.educationMajor)
      //     formData.append(
      //       `educations[${index}][status]`,
      //       handleGetValueID('educationStatus', item?.educationStatus)
      //     )
      //     formData.append(
      //       `educations[${index}][year_of_graduation]`,
      //       handleFormatDate(item?.educationYear, 'YYYY')
      //     )
      //     formData.append(
      //       `educations[${index}][description]`,
      //       item?.educationDescription
      //     )
      //     formData.append(
      //       `educations[${index}][degree_document]`,
      //       !item?.educationCertificate ||
      //         typeof item?.educationCertificate == 'string'
      //         ? ''
      //         : item?.educationCertificate
      //     )
      //     formData.append(
      //       `educations[${index}][delete_degree_document]`,
      //       item?.educationCertificate ? 0 : 1
      //     )
      //     formData.append(
      //       `educations[${index}][study_assignment_letter]`,
      //       item?.educationStudyAssignmentLetter || ''
      //     )
      //     formData.append(
      //       `educations[${index}][delete_study_assignment_letter]`,
      //       item?.educationStudyAssignmentLetter ? 0 : 1
      //     )
      //     formData.append(
      //       `educations[${index}][academic_title_letter]`,
      //       item?.edudcationAcademicTitleLetter || ''
      //     )
      //     formData.append(
      //       `educations[${index}][delete_academic_title_letter]`,
      //       item?.edudcationAcademicTitleLetter ? 0 : 1
      //     )
      //   })
      // } else {
      //   formData.append(`educations`, emptyArray)
      // }

      // Notes
      // if (notes.length > 0) {
      //   notes.map((item, index) => {
      //     formData.append(`notes[${index}][id]`, item?.id || '')
      //     formData.append(`notes[${index}][description]`, item?.description)
      //   })
      // } else {
      //   formData.append(`notes`, emptyArray)
      // }

      const payload = {
        id,
        data: formData
      }

      updateEmployee(payload)
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
        setTimeout(() => {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 5)
    }

    setIsExpand(true)
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

  const handleClearState = () => {
    clearEmployeeState()
    formikRef.current.resetForm()
  }

  useEffect(() => {
    const id = router?.query.id
    if (id) getEmployee(atob(id))

    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

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

  useEffect(() => {
    const detail = employee?.detail

    const handleSplitFile = (val) => {
      if (val) {
        const fileSplit = val.split('/')
        const fileName = fileSplit[fileSplit.length - 1]

        return fileName
      }

      return null
    }

    const handleSetCountServiceValue = (val) => {
      return val !== null ? val.toString() : ''
    }

    if (Object.entries(detail).length > 0) {
      const newPosition = detail?.position.map((itm, idx) => {
        if (itm?.parent_id) onFetchHierarchy(itm?.parent_id)
        if (idx == detail?.position.length - 1) onFetchHierarchy(itm?.id)
        return { name: itm?.name }
      })
      const dateOfBirth = detail?.date_of_birth
        ? moment(detail?.date_of_birth, 'DD-MM-YYYY').toDate()
        : ''
      const positionEffectiveDate = detail?.position_effective_date
        ? moment(detail?.position_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const cpnsEffectiveDate = detail?.cpns_effective_date
        ? moment(detail?.cpns_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const educationYear = detail?.education_year
        ? moment(detail?.education_year, 'YYYY').toDate()
        : null
      const quitDate = detail?.quit_date
        ? moment(detail?.quit_date, 'DD-MM-YYYY').toDate()
        : ''

      // Employee
      formikRef.current?.setFieldValue(
        'employee.image',
        handleSplitFile(detail?.photo_profile),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.name',
        detail?.name || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.titlePrefix',
        detail?.title_prefix || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.titleSuffix',
        detail?.title_suffix || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.nip',
        detail?.employee_id_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.nik',
        detail?.id_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.nrp',
        detail?.employee_registration_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.placeOfBirth',
        detail?.place_of_birth || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.dateOfBirth',
        dateOfBirth,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.religion',
        handleGetValue('religion', detail?.religion),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.gender',
        handleGetValue(
          'gender',
          detail?.gender !== null && detail?.gender >= 0
            ? detail?.gender == 1
              ? 1
              : 2
            : null
        ),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.maritalStatus',
        handleGetValue('marital', detail?.marital_status),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.employmentType',
        handleGetValue('employmentType', detail?.employment_type_id),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.dateStartedWork',
        cpnsEffectiveDate,
        false
      )
      formikRef.current?.setFieldValue(`employee.positions`, newPosition, false)
      formikRef.current?.setFieldValue(
        'employee.positionEffectiveDate',
        positionEffectiveDate,
        false
      )
      formikRef.current?.setFieldValue('employee.grade', null, false)
      formikRef.current?.setFieldValue('employee.gradeEffectiveDate', '', false)
      formikRef.current?.setFieldValue('employee.echelon', null, false)
      formikRef.current?.setFieldValue(
        'employee.echelonEffectiveDate',
        '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.educationLevel',
        handleGetValue('employeeEducationLevel', detail?.education_level),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.educationName',
        detail?.education_name || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.educationYear',
        educationYear,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.institution',
        detail?.institution_name || null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.employeeIdCardNumber',
        detail?.employee_id_card_number || '',
        false
      )
      formikRef.current?.setFieldValue('employee.employeeIdCard', null, false)
      formikRef.current?.setFieldValue(
        'employee.karisu',
        detail?.karisu_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.taxId',
        detail?.id_tax || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.employmentStatus',
        handleGetValue('employeeStatus', detail?.employment_status),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.lastDateOfWork',
        quitDate,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.familyRegistNumber',
        detail?.family_registration_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.idNumber',
        detail?.id_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.residence',
        handleGetValue('residence', detail?.residence_id),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.residenceName',
        detail?.residence_description || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.address',
        detail?.current_address || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.homeTelephoneNumber',
        detail?.home_phone_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.mobilePhone',
        detail?.mobile_phone || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.officeAddress',
        detail?.office_address || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.officeTelephoneNumber',
        detail?.office_phone_number || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.officeEmail',
        detail?.office_email || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.email',
        detail?.email || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.emergencyContact',
        detail?.emergency_contact || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.description',
        detail?.description || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.description',
        detail?.description || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.description',
        detail?.description || '',
        false
      )
      formikRef.current?.setFieldValue(
        'employee.yearsOfServiceTotal.year',
        handleSetCountServiceValue(detail?.years_of_service_total),
        false
      )
      formikRef.current?.setFieldValue(
        'employee.yearsOfServiceTotal.month',
        handleSetCountServiceValue(detail?.month_of_service_total),
        false
      )

      // History Positions
      detail?.positions.map((itm, idx) => {
        const positionsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const positionsEffectiveDate = itm?.effective_date
          ? moment(itm?.effective_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsTerminationDate = itm?.termination_date
          ? moment(itm?.termination_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsTerminationDecreeDate = itm?.termination_decree_date
          ? moment(itm?.termination_decree_date, 'DD-MM-YYYY').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `positions[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].year`,
          positionsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].position`,
          itm?.position || '',
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].group`,
          handleGetValue('group', itm?.group_id),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].level`,
          handleGetValue('echelon', itm?.echelon),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].description`,
          handleGetValue('positionDescription', itm?.position_status),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].effectiveDate`,
          positionsEffectiveDate,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].decree`,
          itm?.decree || '',
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].decreeDocument`,
          handleSplitFile(itm?.decree_document),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].decreeType`,
          handleGetValue('decree', itm?.type_decree_id),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].decreeDate`,
          positionsDecreeDate,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].terminationDate`,
          positionsTerminationDate,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].terminationDecree`,
          itm?.termination_decree,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].terminationDecreeType`,
          handleGetValue('decree', itm?.type_termination_decree_id),
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].terminationDecreeNumber`,
          itm?.termination_decree_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].terminationDecreeDate`,
          positionsTerminationDecreeDate,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].status`,
          handleGetValue(
            'status',
            itm?.status !== null && itm?.status >= 0
              ? itm?.status == 0
                ? 2
                : 1
              : null
          ),
          false
        )
      })

      // History Technicals Traininss
      detail?.technicals.map((itm, idx) => {
        const functionalsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const functionalsDate = itm?.start_date
          ? moment(itm?.start_date, 'DD-MM-YYYY').toDate()
          : null

        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].year`,
          functionalsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].date`,
          functionalsDate,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].link`,
          itm?.link || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].certificate`,
          handleSplitFile(itm?.certificate),
          false
        )
      })

      // Families
      detail?.families.map((itm, idx) => {
        const familiesDateOfBirth = itm?.date_of_birth
          ? moment(itm?.date_of_birth, 'DD-MM-YYYY').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `families[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].familyRegistNumber`,
          itm?.card_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].name`,
          itm?.name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].idNumber`,
          itm?.id_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].gender`,
          handleGetValue(
            'gender',
            itm?.gender !== null && itm?.gender >= 0
              ? itm?.gender == 1
                ? 1
                : 2
              : null
          ),
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].religion`,
          handleGetValue('religion', itm?.religion),
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].placeOfBirth`,
          itm?.place_of_birth || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].dateOfBirth`,
          familiesDateOfBirth,
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].nameOfFather`,
          itm?.name_of_father || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].nameOfMother`,
          itm?.name_of_mother || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].relationshipStatus`,
          handleGetValue('relationshipStatus', itm?.relationship_status),
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].educationLevel`,
          handleGetValue('educationLevel', itm?.education),
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].occupation`,
          itm?.occupation || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].occupationDescription`,
          itm?.occupation_description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].maritalStatus`,
          handleGetValue('maritalFamily', itm?.marital_status),
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].marriageOther`,
          itm?.marriage_other_notes || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].mobilePhone`,
          itm?.mobile_phone || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].mobilePhone`,
          itm?.mobile_phone || '',
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].sequenceNumber`,
          itm?.sequence_number || '',
          false
        )
      })

      // Educations
      // detail?.educations.map((itm, idx) => {
      //   const educationsYear = itm?.year_of_graduation
      //     ? moment(itm?.year_of_graduation, 'YYYY').toDate()
      //     : null

      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].id`,
      //     itm?.id || null,
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationLevel`,
      //     handleGetValue('employeeEducationLevel', itm?.level),
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationName`,
      //     itm?.name || '',
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationArea`,
      //     handleGetValue('studyArea', itm?.study_area),
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationAccreditation`,
      //     itm?.accreditation || '',
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationFaculty`,
      //     itm?.faculty || '',
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationMajor`,
      //     itm?.major || '',
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationStatus`,
      //     handleGetValue('educationStatus', itm?.status),
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationYear`,
      //     educationsYear,
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationDescription`,
      //     itm?.description || '',
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationCertificate`,
      //     handleSplitFile(itm?.degree_document),
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].educationStudyAssignmentLetter`,
      //     handleSplitFile(itm?.study_assignment_letter),
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `educations[${idx}].edudcationAcademicTitleLetter`,
      //     handleSplitFile(itm?.academic_title_letter),
      //     false
      //   )
      // })

      // Notes
      // detail?.notes.map((itm, idx) => {
      //   formikRef.current?.setFieldValue(
      //     `notes[${idx}].id`,
      //     itm?.id || null,
      //     false
      //   )
      //   formikRef.current?.setFieldValue(
      //     `notes[${idx}].description`,
      //     itm?.description || '',
      //     false
      //   )
      // })
    }
  }, [employee?.detail, residence, employmentType])

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
          summary={'Edit Pegawai Outsourcing'}
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
            mode='edit'
            pageType='OUTSOURCING'
            isExpand={isExpand}
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

EmployeeEditComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  echelon: PropTypes.object,
  decree: PropTypes.object,
  group: PropTypes.object,
  residence: PropTypes.object,
  employmentType: PropTypes.object,
  getEmployee: PropTypes.func,
  updateEmployee: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default EmployeeEditComponent
