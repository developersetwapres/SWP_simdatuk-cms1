/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import FormComponent from '../Form/FormComponent'
import { Formik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { Box } from '@mui/material'
import { Button } from '@/components/shared'
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
  periodOptions,
  positionDescOptions,
  statusOptions,
  ppkDescOptions,
  predicateOptions,
  ratingOptions,
  ratingOrganizationOptions,
  relationshipStatusOptions,
  religionOptions,
  talentPoolsOptions,
  maritalStatuFamilysOptions
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
    emergencyContact: ''
  },
  educations: [],
  families: [],
  leaves: [],
  notes: [],
  assessments: [],
  competences: [],
  talentPools: [],
  credits: [],
  positions: [],
  grades: [],
  trainingStructurals: [],
  trainingFungsionals: [],
  trainingTechnicals: [],
  recognitions: [],
  targets: [],
  performances: [],
  disciplinaries: []
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
    officeEmail: Yup.string().email('Email Dinas tidak valid'),
    employeeIdCardNumber: Yup.lazy((taxId) => {
      if (Array.isArray(taxId) && taxId.length > 0) {
        return Yup.string()
          .nullable()
          .when('employeeIdCardNumber', {
            is: (value) => value && value.length > 0,
            then: Yup.string()
              .min(5, 'No. Karpeg tidak boleh kurang dari 5 digit')
              .max(18, 'No. Karpeg tidak boleh lebih dari 18 digit')
          })
      } else {
        return Yup.string()
      }
    }),
    karisu: Yup.lazy((taxId) => {
      if (Array.isArray(taxId) && taxId.length > 0) {
        return Yup.string()
          .nullable()
          .when('karisu', {
            is: (value) => value && value.length > 0,
            then: Yup.string()
              .min(
                5,
                'No. Kartu Istri / Kartu Suami tidak boleh kurang dari 5 digit'
              )
              .max(
                18,
                'No. Kartu Istri / Kartu Suami tidak boleh lebih dari 18 digit'
              )
          })
      } else {
        return Yup.string()
      }
    }),
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
        if (!value || !isFile(value)) return true

        const fileType = value && value.type
        return fileType === 'image/png' || fileType === 'image/jpeg'
      })
      .test('fileSize', 'Ukuran file tidak boleh lebih dari 2MB', (value) => {
        if (!value || !isFile(value)) return true

        const maxSize = 2 * 1024 * 1024
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
      ),
    employeeIdCard: Yup.mixed()
      .nullable()
      .test('fileType', 'Format file harus PNG, JPG, atau PDF', (value) => {
        if (!value || !isFile(value)) return true
        const fileType = value && value.type
        return (
          fileType === 'image/png' ||
          fileType === 'image/jpeg' ||
          fileType === 'application/pdf'
        )
      })
      .test('fileSize', 'Ukuran file tidak boleh lebih dari 2MB', (value) => {
        if (!value || !isFile(value)) return true
        const maxSize = 2 * 1024 * 1024
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
  families: Yup.lazy((families) => {
    if (Array.isArray(families) && families.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          familyRegistNumber: Yup.string()
            .min(16, 'No KK harus tediri dari 16 digit angka')
            .max(16, 'No KK harus tediri dari 16 digit angka')
            .required('No KK tidak boleh kosong'),
          name: Yup.string().required(
            'Nama Anggota Keluarga tidak boleh kosong'
          ),
          idNumber: Yup.string()
            .min(16, 'No NIK harus terdiri dari 16 digit angka')
            .min(16, 'No NIK harus terdiri dari 16 digit angka')
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
  }),
  assessments: Yup.lazy((assessments) => {
    if (Array.isArray(assessments) && assessments.length > 0) {
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
  }),
  positions: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          position: Yup.string().required('Jabatan tidak boleh kosong'),
          group: Yup.string().required('Rumpun tidak boleh kosong'),
          effectiveDate: Yup.string().required(
            'TMT Menjabat tidak boleh kosong'
          ),
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
  grades: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          grade: Yup.string().required('Golongan tidak boleh kosong'),
          effectiveDate: Yup.string().required(
            'TMT Golongan tidak boleh kosong'
          ),
          decreeType: Yup.string().required(
            'Jenis SK Golongan tidak boleh kosong'
          ),
          decreeNumber: Yup.string().required(
            'No. SK Golongan tidak boleh kosong'
          ),
          status: Yup.string().required('Status Golongan tidak boleh kosong'),
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
  trainingStructurals: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
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
  }),
  trainingFungsionals: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
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
  }),
  trainingTechnicals: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
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
  }),
  targets: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          workBehavior: Yup.string().required(
            'Rating Perilaku Kerja tidak boleh kosong'
          ),
          performance: Yup.string().required(
            'Predikat Kinerja Pegawai tidak boleh kosong'
          ),
          performanceAchievement: Yup.string().required(
            'Capaian Kinerja Organisasi tidak boleh kosong'
          )
        })
      )
    } else {
      return Yup.array()
    }
  }),
  performances: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          point: Yup.string().required(
            'Nilai Prestasi Kerja tidak boleh kosong'
          )
        })
      )
    } else {
      return Yup.array()
    }
  }),
  disciplinaries: Yup.lazy((credits) => {
    if (Array.isArray(credits) && credits.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          discipleType: Yup.string().required(
            'Jenis Hukuman tidak boleh kosong'
          ),
          discipleDate: Yup.string().required(
            'Tanggal Hukuman Disiplin tidak boleh kosong'
          )
        })
      )
    } else {
      return Yup.array()
    }
  })
})

const EmployeeEditComponent = ({
  employee,
  position,
  grade,
  echelon,
  institution,
  residence,
  employmentType,
  decree,
  disciplinary,
  group,
  getEmployee = () => {},
  updateEmployee = () => {},
  clearEmployeeState = () => {},
  onFetchHierarchy = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [positions, setPositions] = useState([])

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
        arr.push(itm?.name)
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
    const newEchelon = echelon?.options
      ? handleMapping('echelons', echelon?.options)
      : []
    const newGrade = grade?.options
      ? handleMapping('grades', grade?.options)
      : []
    const newInstitution = institution?.options
      ? handleMapping('institutions', institution?.options)
      : []
    const newEmploymentType = employmentType?.data
      ? handleMapping('employments', employmentType?.data)
      : []
    const newDecreeType = decree?.data
      ? handleMapping('decrees', decree?.data)
      : []
    const newGroup = group?.data ? handleMapping('groups', group?.data) : []
    const newDiscipleType = disciplinary?.options
      ? handleMapping('disciples', disciplinary?.options)
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
      discipleType: newDiscipleType,
      performancesType: ppkDescOptions
    }

    return dataOptions
  }, [
    positions,
    echelon,
    grade,
    institution,
    residence,
    employmentType,
    group,
    disciplinary
  ])

  const handleGetValueID = (type, val) => {
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

  const handleGetValue = (type, val) => {
    if (type == 'grade') {
      const item =
        grade?.options && grade?.options.find((itm) => itm?.id == val)?.name
      return item
    } else if (type == 'echelon') {
      const item =
        echelon?.options && echelon?.options.find((itm) => itm?.id == val)?.name
      return item
    } else if (type == 'institution') {
      const item =
        institution?.options &&
        institution?.options.find((itm) => itm?.id == val)?.name
      return item
    } else if (type == 'residence') {
      const item =
        residence?.data && residence?.data.find((itm) => itm?.id == val)?.name
      return item
    } else if (type == 'employmentType') {
      const item =
        employmentType?.data &&
        employmentType?.data.find((itm) => itm?.id == val)?.name

      return item
    } else if (type == 'decree') {
      const item =
        decree?.data && decree?.data.find((itm) => itm?.id == val)?.name
      return item
    } else if (type == 'disciplinary') {
      const item =
        disciplinary?.options &&
        disciplinary?.options.find((itm) => itm?.id == val)?.name
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
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const id = atob(router?.query?.id)
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
        moment(values?.employee?.dateOfBirth).format('YYYY-MM-DD')
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
        moment(values?.employee?.dateStartedWork).format('YYYY-MM-DD')
      )
      formData.append(
        'position_id',
        handleGetValueID('position', itemPosition, indexPosition)
      )
      formData.append(
        'position_effective_date',
        moment(values?.employee?.positionEffectiveDate).format('YYYY-MM-DD')
      )
      formData.append(
        'grade_id',
        handleGetValueID('grade', values?.employee?.grade)
      )
      formData.append(
        'grade_effective_date',
        moment(values?.employee?.gradeEffectiveDate).format('YYYY-MM-DD')
      )
      formData.append(
        'echelon_id',
        values?.employee?.echelon
          ? handleGetValueID('echelon', values?.employee?.echelon)
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
        handleGetValueID('institution', values?.employee?.institution)
      )
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
        moment(values?.employee?.educationYear).format('YYYY')
      )
      formData.append(
        'employee_id_card_number',
        values?.employee?.employeeIdCardNumber
      )
      formData.append(
        'employee_id_card',
        !values?.employee?.employeeIdCard ||
          typeof values?.employee?.employeeIdCard == 'string'
          ? ''
          : values?.employee?.employeeIdCard
      )
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
      formData.append(
        'delete_employee_id_card',
        values?.employee?.employeeIdCard ? 0 : 1
      )
      formData.append('type', 2)

      // Educations
      educations.map((item, index) => {
        formData.append(`educations[${index}][id]`, item?.id || '')
        formData.append(
          `educations[${index}][level]`,
          handleGetValueID('employeeEducationLevel', item?.educationLevel)
        )
        formData.append(`educations[${index}][name]`, item?.educationName)
        formData.append(`educations[${index}][faculty]`, item?.educationFaculty)
        formData.append(`educations[${index}][major]`, item?.educationMajor)
        formData.append(
          `educations[${index}][status]`,
          handleGetValueID('educationStatus', item?.educationStatus)
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
          !item?.educationCertificate ||
            typeof item?.educationCertificate == 'string'
            ? ''
            : item?.educationCertificate
        )
        formData.append(
          `educations[${index}][delete_degree_document]`,
          item?.educationCertificate ? 0 : 1
        )
      })

      // Families
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
          handleGetValueID('religion', item?.religion)
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
          handleGetValueID('relationshipStatus', item?.relationshipStatus)
        )
        formData.append(
          `families[${index}][education]`,
          handleGetValueID('educationLevel', item?.educationLevel)
        )
        formData.append(`families[${index}][occupation]`, item?.occupation)
        formData.append(
          `families[${index}][occupation_description]`,
          item?.occupationDescription
        )
        formData.append(
          `families[${index}][marital_status]`,
          handleGetValueID('maritalFamily', item?.maritalStatus)
        )
        formData.append(`families[${index}][mobile_phone]`, item?.mobilePhone)
        formData.append(
          `families[${index}][sequence_number]`,
          item?.sequenceNumber
        )
      })

      // Leaves
      leaves.map((item, index) => {
        formData.append(`leaves[${index}][id]`, item?.id || '')
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
          handleGetValueID('leaves', item?.type)
        )
        formData.append(`leaves[${index}][number]`, item?.number)
        formData.append(`leaves[${index}][description]`, item?.description)
        formData.append(
          `leaves[${index}][letter]`,
          !item?.leaveLetter || typeof item?.leaveLetter == 'string'
            ? ''
            : item?.leaveLetter
        )
        formData.append(
          `leaves[${index}][delete_letter]`,
          item?.leaveLetter ? 0 : 1
        )
      })

      // Notes
      notes.map((item, index) => {
        formData.append(`notes[${index}][id]`, item?.id || '')
        formData.append(`notes[${index}][description]`, item?.description)
      })

      // Credits
      credits.map((item, index) => {
        formData.append(`credits[${index}][id]`, item?.id || '')
        formData.append(`credits[${index}][position]`, item?.position)
        formData.append(
          `credits[${index}][period]`,
          handleGetValueID('periodCredits', item?.period)
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
        formData.append(`assessments[${index}][id]`, item?.id || '')
        formData.append(
          `assessments[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `assessments[${index}][point]`,
          handleGetValueID('assessments', item?.point)
        )
        formData.append(`assessments[${index}][organizer]`, item?.organizer)
        formData.append(
          `assessments[${index}][assessment_document]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `assessments[${index}][delete_assessment_document]`,
          item?.certificate ? 0 : 1
        )
      })

      // Competences
      competences.map((item, index) => {
        formData.append(`competencies[${index}][id]`, item?.id || '')
        formData.append(
          `competencies[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `competencies[${index}][point]`,
          handleGetValueID('competences', item?.point)
        )
        formData.append(`competencies[${index}][organizer]`, item?.organizer)
        formData.append(
          `competencies[${index}][competency_document]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `competencies[${index}][delete_competency_document]`,
          item?.certificate ? 0 : 1
        )
      })

      // Talent Pools
      talentPools.map((item, index) => {
        formData.append(`talents[${index}][id]`, item?.id || '')
        formData.append(
          `talents[${index}][event_date]`,
          moment(item?.date).format('YYYY-MM-DD')
        )
        formData.append(
          `talents[${index}][point]`,
          handleGetValueID('talentPools', item?.point)
        )
        formData.append(`talents[${index}][organizer]`, item?.organizer)
        formData.append(
          `talents[${index}][talent_document]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `talents[${index}][delete_talent_document]`,
          item?.certificate ? 0 : 1
        )
      })

      // History Positions
      positions.map((item, index) => {
        formData.append(`positions[${index}][id]`, item?.id || '')
        formData.append(`positions[${index}][position]`, item?.position)
        formData.append(
          `positions[${index}][group_id]`,
          handleGetValueID('group', item?.group)
        )
        formData.append(
          `positions[${index}][echelon]`,
          item?.level ? handleGetValueID('echelon', item?.level) : null
        )
        formData.append(
          `positions[${index}][position_status]`,
          item?.description
            ? handleGetValueID('positionDescription', item?.description)
            : null
        )
        formData.append(
          `positions[${index}][effective_date]`,
          moment(item?.effectiveDate).format('YYYY-MM-DD')
        )
        formData.append(`positions[${index}][decree]`, item?.decree)
        formData.append(
          `positions[${index}][decree_document]`,
          item?.decreeDocument
        )
        formData.append(
          `positions[${index}][type_of_decree]`,
          item?.decreeType ? handleGetValueID('decree', item?.decreeType) : null
        )
        formData.append(
          `positions[${index}][decree_number]`,
          item?.decreeNumber
        )
        formData.append(
          `positions[${index}][decree_date]`,
          moment(item?.decreeDate).format('YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][termination_date]`,
          moment(item?.terminationDate).format('YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][termination_decree]`,
          item?.terminationDecree
        )
        formData.append(
          `positions[${index}][type_of_termination_decree]`,
          handleGetValueID('decree', item?.terminationDecreeType)
        )
        formData.append(
          `positions[${index}][termination_decree_number]`,
          item?.terminationDecreeNumber
        )
        formData.append(
          `positions[${index}][termination_decree_date]`,
          moment(item?.terminationDecreeDate).format('YYYY-MM-DD')
        )
        formData.append(
          `positions[${index}][status]`,
          item?.status ? (item?.status == 'Aktif' ? 1 : 0) : null
        )
        formData.append(
          `positions[${index}][delete_decree_document]`,
          values?.decreeDocument ? 0 : 1
        )
      })

      // History Grades
      grades.map((item, index) => {
        formData.append(`grades[${index}][id]`, item?.id || '')
        formData.append(
          `grades[${index}][grade_id]`,
          handleGetValueID('grade', item?.grade_id)
        )
        formData.append(
          `grades[${index}][effective_date]`,
          moment(item?.effectiveDate).format('YYYY-MM-DD')
        )
        formData.append(`grades[${index}][decree]`, item?.decree)
        formData.append(
          `grades[${index}][decree_document]`,
          item?.decreeDocument
        )
        formData.append(
          `grades[${index}][type_of_decree]`,
          handleGetValueID('decree', item?.type_of_decree)
        )
        formData.append(`grades[${index}][decree_number]`, item?.decreeNumber)
        formData.append(
          `grades[${index}][date_of_decree]`,
          moment(item?.decreeDate).format('YYYY-MM-DD')
        )
        formData.append(`grades[${index}][description]`, item?.description)
        formData.append(
          `grades[${index}][status]`,
          item?.status == 'Aktif' ? 1 : 0
        )
        formData.append(
          `grades[${index}][delete_decree_document]`,
          item?.decreeDocument ? 0 : 1
        )
      })

      // History Structurals Traininss
      structurals.map((item, index) => {
        formData.append(`structurals[${index}][id]`, !item?.id || '')
        formData.append(
          `structurals[${index}][certificate]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `structurals[${index}][delete_certificate]`,
          item?.certificate ? 0 : 1
        )
      })

      // History Functionals Traininss
      functionals.map((item, index) => {
        formData.append(`functionals[${index}][id]`, !item?.id || '')
        formData.append(
          `functionals[${index}][certificate]`,
          !item?.certificate || typeof item?.certificate == 'string'
            ? ''
            : item?.certificate
        )
        formData.append(
          `functionals[${index}][delete_certificate]`,
          item?.certificate ? 0 : 1
        )
      })

      // History Technicals Traininss
      technicals.map((item, index) => {
        formData.append(`technicals[${index}][id]`, !item?.id || '')
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

      // History Targets
      targets.map((item, index) => {
        formData.append(`functionals[${index}][id]`, !item?.id || '')
        formData.append(
          `functionals[${index}][work_behavior_rating]`,
          handleGetValueID('workBehavior', item?.workBehavior)
        )
        formData.append(
          `functionals[${index}][employee_performance_predicate]`,
          handleGetValueID('performance', item?.performance)
        )
        formData.append(
          `functionals[${index}][organizational_performance_achievement]`,
          handleGetValueID(
            'performanceAchievement',
            item?.performanceAchievement
          )
        )
      })

      // History Performances
      performances.map((item, index) => {
        formData.append(`performances[${index}][id]`, item?.id || '')
        formData.append(
          `performances[${index}][work_performance_score]`,
          item?.performanceAchievement
        )
        formData.append(
          `performances[${index}][description]`,
          handleGetValueID('performancesType', item?.description)
        )
      })

      // History Disciplinaries
      disciplinaries.map((item, index) => {
        formData.append(`disciplinaries[${index}][id]`, item?.id || '')
        formData.append(`disciplinaries[${index}][grade]`, item?.grade)
        formData.append(`disciplinaries[${index}][position]`, item?.position)
        formData.append(
          `disciplinaries[${index}][disciplinary_id]`,
          handleGetValueID('discipleType', item?.discipleType)
        )
        formData.append(
          `disciplinaries[${index}][decree_number]`,
          item?.decreeNumber
        )
        formData.append(
          `disciplinaries[${index}][date_of_decree]`,
          moment(item?.decreeDate).format('YYYY-MM-DD')
        )
        formData.append(
          `disciplinaries[${index}][start_date]`,
          moment(item?.discipleDate?.from).format('YYYY-MM-DD')
        )
        formData.append(
          `disciplinaries[${index}][end_date]`,
          moment(item?.discipleDate?.to).format('YYYY-MM-DD')
        )
        formData.append(
          `disciplinaries[${index}][end_date]`,
          moment(item?.discipleDate?.to).format('YYYY-MM-DD')
        )
        formData.append(
          `disciplinaries[${index}][authorizing_officer]`,
          item?.authorizedOfficial
        )
        formData.append(
          `disciplinaries[${index}][name_of_authorizing_officer]`,
          item?.authorizedOfficialName
        )
        formData.append(
          `disciplinaries[${index}][description]`,
          item?.description
        )
      })

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
      !position?.loading &&
      !echelon?.loading &&
      !grade?.loading &&
      !institution?.loading &&
      !residence?.loading &&
      !decree?.loading &&
      !disciplinary?.loading &&
      !group?.loading &&
      !employmentType?.loading
    onLoading(state)
  }, [
    position,
    echelon,
    grade,
    institution,
    residence,
    decree,
    disciplinary,
    group,
    employmentType
  ])

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

    if (Object.entries(detail).length > 0) {
      const newPosition = detail?.position.map((itm, idx) => {
        if (itm?.parent_id) onFetchHierarchy(itm?.parent_id)
        if (idx == detail?.position.length - 1) onFetchHierarchy(itm?.id)
        return { name: itm?.name }
      })
      const dateOfBirth = detail?.date_of_birth
        ? moment(detail?.date_of_birth, 'YYYY-MM-DD').toDate()
        : ''
      const positionEffectiveDate = detail?.position_effective_date
        ? moment(detail?.position_effective_date, 'YYYY-MM-DD').toDate()
        : ''
      const gradeEffectiveDate = detail?.grade_effective_date
        ? moment(detail?.grade_effective_date, 'YYYY-MM-DD').toDate()
        : ''
      const echelonEffectiveDate = detail?.echelon_effective_date
        ? moment(detail?.echelon_effective_date, 'YYYY-MM-DD').toDate()
        : ''
      const cpnsEffectiveDate = detail?.cpns_effective_date
        ? moment(detail?.cpns_effective_date, 'YYYY-MM-DD').toDate()
        : ''
      const educationYear = detail?.education_year
        ? moment(detail?.education_year, 'YYYY').toDate()
        : null
      const quitDate = detail?.quit_date
        ? moment(detail?.quit_date, 'YYYY-MM-DD').toDate()
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
        detail?.religion ? handleGetValue('religion', detail?.religion) : null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.gender',
        detail?.gender || detail?.gender >= 0
          ? handleGetValue('gender', detail?.gender == 1 ? 1 : 2)
          : null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.maritalStatus',
        detail?.marital_status
          ? handleGetValue('marital', detail?.marital_status)
          : null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.employmentType',
        detail?.employment_type_id
          ? handleGetValue('employmentType', detail?.employment_type_id)
          : null,
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
      formikRef.current?.setFieldValue(
        'employee.grade',
        detail?.grade_id ? handleGetValue('grade', detail?.grade_id) : null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.gradeEffectiveDate',
        gradeEffectiveDate,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.echelon',
        detail?.echelon_id
          ? handleGetValue('echelon', detail?.echelon_id)
          : null,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.echelonEffectiveDate',
        echelonEffectiveDate,
        false
      )
      formikRef.current?.setFieldValue(
        'employee.educationLevel',
        detail?.education_level
          ? handleGetValue('employeeEducationLevel', detail?.education_level)
          : null,
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
      formikRef.current?.setFieldValue(
        'employee.employeeIdCard',
        handleSplitFile(detail?.employee_id_card),
        false
      )
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
        detail?.employment_status
          ? handleGetValue('employeeStatus', detail?.employment_status)
          : null,
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
        detail?.residence_name || null,
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

      // Educations
      detail?.educations.map((itm, idx) => {
        const educationsYear = itm?.year_of_graduation
          ? moment(itm?.year_of_graduation, 'YYYY').toDate()
          : null

        formikRef.current?.setFieldValue(
          `educations[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationLevel`,
          itm?.level
            ? handleGetValue('employeeEducationLevel', itm?.level)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationName`,
          itm?.name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationFaculty`,
          itm?.faculty || '',
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationMajor`,
          itm?.major || '',
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationStatus`,
          itm?.status ? handleGetValue('educationStatus', itm?.status) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationYear`,
          educationsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationDescription`,
          itm?.description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `educations[${idx}].educationCertificate`,
          handleSplitFile(itm?.degree_document),
          false
        )
      })

      // History Positions
      detail?.positions.map((itm, idx) => {
        const positionsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const positionsEffectiveDate = itm?.effective_date
          ? moment(itm?.effective_date, 'YYYY-MM-DD').toDate()
          : ''
        const positionsDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'YYYY-MM-DD').toDate()
          : ''
        const positionsTerminationDate = itm?.termination_date
          ? moment(itm?.termination_date, 'YYYY-MM-DD').toDate()
          : ''
        const positionsTerminationDecreeDate = itm?.termination_decree_date
          ? moment(itm?.termination_decree_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `positions[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
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
          itm?.group_id ? handleGetValue('group', itm?.group_id) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].level`,
          itm?.echelon ? handleGetValue('echelon', itm?.echelon) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `positions[${idx}].description`,
          itm?.position_status
            ? handleGetValue('positionDescription', itm?.position_status)
            : null,
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
          itm?.type_decree_id
            ? handleGetValue('decree', itm?.type_decree_id)
            : null,
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
          itm?.type_termination_decree_id
            ? handleGetValue('decree', itm?.type_termination_decree_id)
            : null,
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
          itm?.status !== null && itm?.status >= 0
            ? handleGetValue('status', itm?.status == 0 ? 2 : 1)
            : null,
          false
        )
      })

      // History Grade
      detail?.grades.map((itm, idx) => {
        const gradesYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const gradesEffectiveDate = itm?.effective_date
          ? moment(itm?.effective_date, 'YYYY-MM-DD')
          : ''
        const gradesDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'YYYY-MM-DD')
          : ''

        formikRef.current?.setFieldValue(
          `grades[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].year`,
          gradesYear,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].grade`,
          itm?.grade_id ? handleGetValue('grade', itm?.grade_id) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].effectiveDate`,
          gradesEffectiveDate,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].decree`,
          itm?.decree_name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].decreeDocument`,
          handleSplitFile(itm?.decree_document),
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].decreeType`,
          itm?.type_of_decree
            ? handleGetValue('decree', itm?.type_of_decree)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].decreeNumber`,
          itm?.decree_number || null,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].decreeDate`,
          gradesDecreeDate,
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].description`,
          itm?.description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `grades[${idx}].status`,
          itm?.status !== null && itm?.status >= 0
            ? handleGetValue('status', itm?.status == 0 ? 2 : 1)
            : null,
          false
        )
      })

      // History Structurals Traininss
      detail?.structurals.map((itm, idx) => {
        const structuralsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const structuralsDate = itm?.start_date
          ? moment(itm?.start_date, 'YYYY-MM-DD').toDate()
          : null

        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].year`,
          structuralsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].level`,
          itm?.level || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].date`,
          structuralsDate,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].link`,
          itm?.link || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingStructurals[${idx}].certificate`,
          handleSplitFile(itm?.certificate),
          false
        )
      })

      // History Functionals Traininss
      detail?.functionals.map((itm, idx) => {
        const functionalsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const functionalsDate = itm?.start_date
          ? moment(itm?.start_date, 'YYYY-MM-DD').toDate()
          : null

        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].year`,
          functionalsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].level`,
          itm?.level || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].date`,
          functionalsDate,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].link`,
          itm?.link || '',
          false
        )
        formikRef.current?.setFieldValue(
          `trainingFungsionals[${idx}].certificate`,
          handleSplitFile(itm?.certificate),
          false
        )
      })

      // History Technicals Traininss
      detail?.technicals.map((itm, idx) => {
        const functionalsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const functionalsDate = itm?.start_date
          ? moment(itm?.start_date, 'YYYY-MM-DD').toDate()
          : null

        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `trainingTechnicals[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
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

      // History Recognitions
      detail?.recognitions.map((itm, idx) => {
        const recognitionsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const recognitionsDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'YYYY-MM-DD').toDate()
          : ''
        const recognitionsReceiptDate = itm?.date_of_receipt
          ? moment(itm?.date_of_receipt, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `recognitions[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].year`,
          recognitionsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].name`,
          itm?.recognition_name || '',
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].description`,
          itm?.description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].decreeType`,
          itm?.type_of_decree
            ? handleGetValue('decree', itm?.type_of_decree)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].decreeDate`,
          recognitionsDecreeDate,
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].decreeYear`,
          itm?.decree_year || '',
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].institution`,
          itm?.awarding_institution || '',
          false
        )
        formikRef.current?.setFieldValue(
          `recognitions[${idx}].receiptDate`,
          recognitionsReceiptDate,
          false
        )
      })

      // History Targets
      detail?.targets.map((itm, idx) => {
        const targetsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const targetsAssessmentYear = itm?.year
          ? moment(itm?.year, 'YYYY').toDate()
          : null

        formikRef.current?.setFieldValue(
          `targets[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].year`,
          targetsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].appraisal`,
          itm?.appraisal_period
            ? handleGetValue('period', itm?.appraisal_period)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].assessmentYear`,
          targetsAssessmentYear,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].workBehavior`,
          itm?.work_behavior_rating
            ? handleGetValue('workBehavior', itm?.work_behavior_rating)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].performance`,
          itm?.employee_performance_predicate
            ? handleGetValue('performance', itm?.employee_performance_predicate)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `targets[${idx}].performanceAchievement`,
          itm?.organizational_performance_achievement
            ? handleGetValue(
                'performanceAchievement',
                itm?.organizational_performance_achievement
              )
            : null,
          false
        )
      })

      // History Performances
      detail?.performances.map((itm, idx) => {
        const performancesYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null

        formikRef.current?.setFieldValue(
          `performances[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `performances[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `performances[${idx}].year`,
          performancesYear,
          false
        )
        formikRef.current?.setFieldValue(
          `performances[${idx}].appraisal`,
          itm?.performance_period || '',
          false
        )
        formikRef.current?.setFieldValue(
          `performances[${idx}].point`,
          itm?.work_performance_score || '',
          false
        )
        formikRef.current?.setFieldValue(
          `performances[${idx}].description`,
          itm?.description
            ? handleGetValue('performancesType', itm?.description)
            : null,
          false
        )
      })

      // History Disciplinaries
      detail?.disciplinaries.map((itm, idx) => {
        const disciplinariesYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const disciplinariesDecreeDate = itm?.date_of_decree
          ? moment(itm?.date_of_decree, 'YYYY-MM-DD').toDate()
          : ''
        const disciplinariesDiscipleStartDate = itm?.start_date
          ? moment(itm?.start_date, 'YYYY-MM-DD').toDate()
          : ''
        const disciplinariesDiscipleEndDate = itm?.end_date
          ? moment(itm?.end_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].month`,
          itm?.period_month
            ? handleGetValue('months', itm?.period_month)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].year`,
          disciplinariesYear,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].grade`,
          itm?.grade || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].position`,
          itm?.position || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].discipleType`,
          itm?.disciplinary_id
            ? handleGetValue('disciplinary', itm?.disciplinary_id)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].discipleLevel`,
          itm?.disciplinary_description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].allowanceDeducation`,
          itm?.performance_allowance_deduction || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].allowanceDuration`,
          itm?.performance_allowance_duration || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].decreeDate`,
          disciplinariesDecreeDate,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].discipleDate`,
          itm?.start_date && itm?.end_date
            ? {
                from: disciplinariesDiscipleStartDate,
                to: disciplinariesDiscipleEndDate
              }
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].status`,
          itm?.status == 1 ? 'Aktif' : 'Tidak Aktif',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].validity`,
          itm?.validity_period || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficial`,
          itm?.authorizing_officer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficial`,
          itm?.authorizing_officer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficialName`,
          itm?.name_of_authorizing_officer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `disciplinaries[${idx}].description`,
          itm?.description || '',
          false
        )
      })

      // Families
      detail?.families.map((itm, idx) => {
        const familiesDateOfBirth = itm?.date_of_birth
          ? moment(itm?.date_of_birth, 'YYYY-MM-DD').toDate()
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
          itm?.gender ? handleGetValue('gender', itm?.gender) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].religion`,
          itm?.religion ? handleGetValue('religion', itm?.religion) : null,
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
          itm?.relationship_status
            ? handleGetValue('relationshipStatus', itm?.relationship_status)
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `families[${idx}].educationLevel`,
          itm?.education
            ? handleGetValue('educationLevel', itm?.education)
            : null,
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
          itm?.marital_status
            ? handleGetValue('maritalFamily', itm?.marital_status)
            : null,
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

      // Leaves
      detail?.leaves.map((itm, idx) => {
        const leavesStartDate = itm?.start_date
          ? moment(itm?.start_date, 'YYYY-MM-DD').toDate()
          : ''
        const leavesEndDate = itm?.end_date
          ? moment(itm?.end_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `leaves[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `leaves[${idx}].period`,
          itm?.start_date && itm?.end_date
            ? {
                from: leavesStartDate,
                to: leavesEndDate
              }
            : null,
          false
        )
        formikRef.current?.setFieldValue(
          `leaves[${idx}].type`,
          itm?.type ? handleGetValue('leaves', itm?.type) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `leaves[${idx}].number`,
          itm?.number || '',
          false
        )
        formikRef.current?.setFieldValue(
          `leaves[${idx}].description`,
          itm?.description || '',
          false
        )
        formikRef.current?.setFieldValue(
          `leaves[${idx}].leaveLetter`,
          handleSplitFile(itm?.leaveLetter),
          false
        )
      })

      // Notes
      detail?.notes.map((itm, idx) => {
        formikRef.current?.setFieldValue(
          `notes[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `notes[${idx}].description`,
          itm?.description || '',
          false
        )
      })

      // Assesments
      detail?.assessments.map((itm, idx) => {
        const assessmentsDate = itm?.event_date
          ? moment(itm?.event_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `assessments[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `assessments[${idx}].date`,
          assessmentsDate,
          false
        )
        formikRef.current?.setFieldValue(
          `assessments[${idx}].point`,
          itm?.point ? handleGetValue('assessments', itm?.point) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `assessments[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `assessments[${idx}].certificate`,
          handleSplitFile(itm?.assessment_document),
          false
        )
      })

      // Competences
      detail?.competencies.map((itm, idx) => {
        const competencesDate = itm?.event_date
          ? moment(itm?.event_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `competences[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `competences[${idx}].date`,
          competencesDate,
          false
        )
        formikRef.current?.setFieldValue(
          `competences[${idx}].point`,
          itm?.point ? handleGetValue('competences', itm?.point) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `competences[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `competences[${idx}].certificate`,
          handleSplitFile(itm?.competency_document),
          false
        )
      })

      // Talent Pools
      detail?.talents.map((itm, idx) => {
        const talentsDate = itm?.event_date
          ? moment(itm?.event_date, 'YYYY-MM-DD').toDate()
          : ''

        formikRef.current?.setFieldValue(
          `talentPools[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `talentPools[${idx}].date`,
          talentsDate,
          false
        )
        formikRef.current?.setFieldValue(
          `talentPools[${idx}].point`,
          itm?.point ? handleGetValue('talentPools', itm?.point) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `talentPools[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        formikRef.current?.setFieldValue(
          `talentPools[${idx}].certificate`,
          handleSplitFile(itm?.talent_document),
          false
        )
      })

      // Credits
      detail?.credits.map((itm, idx) => {
        const creaditsYear = itm?.year
          ? moment(itm?.year, 'YYYY').toDate()
          : null
        const creditsMonthStart = itm?.month_start
          ? handleGetValue('months', itm?.month_start)
          : null
        const creditsMonthEnd = itm?.month_end
          ? handleGetValue('months', itm?.month_end)
          : null
        const creditsMonth = {
          start: creditsMonthStart,
          end: creditsMonthEnd
        }

        formikRef.current?.setFieldValue(
          `credits[${idx}].id`,
          itm?.id || null,
          false
        )
        formikRef.current?.setFieldValue(
          `credits[${idx}].position`,
          itm?.position || '',
          false
        )
        formikRef.current?.setFieldValue(
          `credits[${idx}].period`,
          itm?.period ? handleGetValue('periodCredits', itm?.period) : null,
          false
        )
        formikRef.current?.setFieldValue(
          `credits[${idx}].year`,
          creaditsYear,
          false
        )
        formikRef.current?.setFieldValue(
          `credits[${idx}].point`,
          itm?.score || '',
          false
        )
        formikRef.current?.setFieldValue(
          `credits[${idx}].month`,
          creditsMonth,
          false
        )
      })
    }
  }, [employee?.detail])

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
          summary={'Edit Pegawai Non ASN'}
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

EmployeeEditComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  echelon: PropTypes.object,
  grade: PropTypes.object,
  institution: PropTypes.object,
  residence: PropTypes.object,
  employmentType: PropTypes.object,
  decree: PropTypes.object,
  disciplinary: PropTypes.object,
  group: PropTypes.object,
  getEmployee: PropTypes.func,
  updateEmployee: PropTypes.func,
  clearEmployeeState: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default EmployeeEditComponent
