/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Input } from '@/components/shared'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Autocomplete } from '@/components/shared'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const isFile = (value) => {
  return typeof value !== 'string'
}

const InitValue = {
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
  marriageDate: '',
  marriageDesc: '',
  employmentType: null,
  dateStartedWork: '',
  pnsEffectiveDate: '',
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
  yearsOfServiceTotal: {
    year: 0,
    month: 0
  },
  yearsOfServiceRank: {
    year: 0,
    month: 0
  },
  type: '',
  description: ''
}

const FormSchema = Yup.object().shape({
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
  employmentType: Yup.string().required('Jenis Pegawai tidak boleh kosong'),
  dateStartedWork: Yup.string().test(
    'required',
    'TMT CPNS tidak boleh kosong',
    function (value) {
      const { type } = this.parent

      if (!value && type == '1') return false

      return true
    }
  ),
  positions: Yup.array().of(
    Yup.object().shape({
      name: Yup.mixed()
        .nullable()
        .test('is-required', 'Jabatan tidak boleh kosong', function (value) {
          const { path } = this
          const { employmentStatus } = this.from[1]?.value

          const pathParts = path.split('.')
          const index = pathParts[0].match(/\d+/)[0]

          if (
            !value &&
            index == 0 &&
            employmentStatus == 'Aktif' &&
            employmentStatus == 'Aktif Perbantuan Setneg'
          )
            return false

          return true
        })
    })
  ),
  positionEffectiveDate: Yup.string()
    .nullable()
    .test('required', 'TMT Menjabat tidak boleh kosong', function (value) {
      const { employmentStatus } = this.parent

      if (
        !value &&
        employmentStatus == 'Aktif' &&
        employmentStatus == 'Aktif Perbantuan Setneg'
      )
        return false

      return true
    }),
  // .test('required', 'TMT Menjabat tidak boleh kosong', function (value) {
  //   const { positions } = this.parent

  //   const positionsLength = positions.length
  //   const isPositions =
  //     positionsLength > 1
  //       ? positions
  //           .filter((itm) => itm?.name)
  //           .every((itm) => itm?.name !== null)
  //       : false

  //   if (positionsLength > 1 && isPositions && !value) return false

  //   return true
  // }),
  grade: Yup.string()
    .nullable()
    .test(
      'required',
      'Pangkat / Golongan tidak boleh kosong',
      function (value) {
        const { type, employmentStatus } = this.parent

        if (
          (!value || value === null) &&
          type == '1'
          // employmentStatus == 'Aktif' &&
          // employmentStatus == 'Aktif Perbantuan Setneg'
        )
          return false

        return true
      }
    ),
  gradeEffectiveDate: Yup.string()
    .nullable()
    .test(
      'required',
      'TMT Pangkat / Golongan tidak boleh kosong',
      function (value) {
        const { type, employmentStatus } = this.parent

        if (
          (!value || value == null) &&
          type == '1'
          // employmentStatus == 'Aktif' &&
          // employmentStatus == 'Aktif Perbantuan Setneg'
        )
          return false

        return true
      }
    ),
  // institution: Yup.string().required('Instansi Induk tidak boleh kosong'),
  educationLevel: Yup.string().required('Tingak Pendidikan tidak boleh kosong'),
  // educationName: Yup.string().required(
  //   'Nama Sekolah/Universitas tidak boleh kosong'
  // ),
  // educationYear: Yup.string().required('Tahun Lulus tidak boleh kosong'),
  employmentStatus: Yup.string().required('Status Pegawai tidak boleh kosong'),
  lastDateOfWork: Yup.string()
    .nullable()
    .test(
      'is-required',
      'Tanggal Terakhir Bekerja tidak boleh kosong',
      function (value) {
        const { employmentStatus } = this.parent

        if (
          (!value || value == null || value == '') &&
          employmentStatus &&
          employmentStatus !== 'Aktif' &&
          employmentStatus !== 'Aktif Perbantuan Setneg' &&
          employmentStatus !== 'Hukuman Disiplin'
        )
          return false

        return true
      }
    ),
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
  emergencyContact: Yup.string().required('Kontak Darurat tidak boleh kosong'),
  email: Yup.string()
    .test('required', 'Email tidak boleh kosong', function (value) {
      const { type } = this.parent

      if (!value && type !== '1') return false

      return true
    })
    .email('Email tidak valid'),
  officeEmail: Yup.string()
    .test('required', 'Email Dinas tidak boleh kosong', function (value) {
      const { type } = this.parent

      if (!value && type == '1') return false

      return true
    })
    .email('Email Dinas tidak valid'),
  employeeIdCardNumber: Yup.string()
    .nullable()
    .test(
      'length-check',
      'No. Karpeg harus terdiri dari 5 hingga 18 digit',
      function (value) {
        if (!value) return true
        return value.length >= 5 && value.length <= 18
      }
    ),
  karisu: Yup.string()
    .nullable()
    .test(
      'length-check',
      'No. Kartu Istri / Kartu Suami harus terdiri dari 5 hingga 18 digit',
      function (value) {
        if (!value) return true
        return value.length >= 5 && value.length <= 18
      }
    ),
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
  yearsOfServiceRank: Yup.object().shape({
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
      const maxSize = 2 * 1024 * 1024
      if (!value || !isFile(value)) return true
      return value.size <= maxSize
    })
})

const EmployeeForm = forwardRef((props, ref) => {
  const {
    options,
    pagesType,
    isExpand,
    setIsCreditNumber = () => {},
    onChangeHierarchies = () => {},
    onGetPositionType = () => {}
  } = props

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

  const isLastDate = useMemo(() => {
    const status = formik?.values?.employmentStatus

    return (
      status &&
      status !== 'Aktif' &&
      status !== 'Aktif Perbantuan Setneg' &&
      status !== 'Hukuman Disiplin'
    )
  }, [ref, formik?.values?.employmentStatus])

  const isPositions = useMemo(() => {
    const values = formik?.values

    if (
      !values?.employmentStatus ||
      values?.employmentStatus == 'Aktif' ||
      values?.employmentStatus == 'Aktif Perbantuan Setneg'
    )
      return true

    return false
  }, [ref, formik?.values])

  useEffect(() => {
    const datas = formik?.values?.positions || []
    const hierarchiesNull = datas.filter((itm) => itm?.name == null)

    onChangeHierarchies(datas)

    if (hierarchiesNull.length == 0) {
      const newValues = [...datas, { name: null }]
      formik?.setFieldValue(`positions`, newValues, false)
    } else {
      const newDatas = datas.filter((itm) => itm?.name !== null)

      if (pagesType?.ASN) {
        const index = newDatas.length - 1
        const item = newDatas[index]
        const type = onGetPositionType(item?.name, index)
        const state = type == 'fungsional'

        setIsCreditNumber(state)
      } else {
        setIsCreditNumber(false)
      }
    }
  }, [ref, formik?.values?.positions])

  return (
    <form ref={ref}>
      <CardAccordion
        title='Data Pegawai'
        isExpand={isExpand}
        defaultExpanded={true}
      >
        <Grid container spacing={3} sx={{ marginBottom: '10px' }} ref={ref}>
          {/* Image Profile */}
          <Grid item xs={12}>
            <UploadFile
              label='Foto Profil'
              maxSize={2}
              dataUnit='MB'
              formatFile={['.png', '.jpg']}
              dimension={{ width: '350', height: '500' }}
              name={'image'}
              value={formik?.values?.image}
              error={formik?.errors?.image}
              onDelete={() => {
                formik?.setFieldValue('image', null, false)
                setTimeout(() => {
                  formik.validateField('image')
                }, 1)
              }}
              onChange={(val) => {
                formik?.setFieldValue('image', val, false)
                setTimeout(() => {
                  formik.validateField('image')
                }, 1)
              }}
            />
          </Grid>
          {/* Name */}
          <Grid item xs={6}>
            <Input
              label='Nama *'
              placeholder='Masukkan Nama'
              name='name'
              value={formik?.values?.name}
              error={formik?.errors?.name}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('name', val, false)
                setTimeout(() => {
                  formik.validateField('name')
                }, 1)
              }}
            />
          </Grid>

          {/* Prefix / Suffix */}
          {!pagesType?.OUTSOURCE && (
            <>
              {/* Prefix */}
              <Grid item xs={6}>
                <Input
                  label='Nama Gelar Depan'
                  placeholder='Masukkan Nama Gelar Depan'
                  name='titlePrefix'
                  value={formik?.values?.titlePrefix}
                  error={formik?.errors?.titlePrefix}
                  onChange={(e) => {
                    const val = e?.target?.value
                    formik?.setFieldValue('titlePrefix', val, false)
                  }}
                />
              </Grid>
              {/* Suffix */}
              <Grid item xs={6}>
                <Input
                  label='Nama Gelar Belakang'
                  placeholder='Masukkan Nama Gelar Belakang'
                  name='titleSuffix'
                  value={formik?.values?.titleSuffix}
                  error={formik?.errors?.titleSuffix}
                  onChange={(e) => {
                    const val = e?.target?.value
                    formik?.setFieldValue('titleSuffix', val, false)
                  }}
                />
              </Grid>
            </>
          )}

          {/* NIP */}
          <Grid item xs={6}>
            <Input
              label='NIP *'
              placeholder='Masukkan NIP'
              name='nip'
              value={formik?.values?.nip}
              error={formik?.errors?.nip}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('nip', val, false)
                setTimeout(() => {
                  formik.validateField('nip')
                }, 1)
              }}
            />
          </Grid>

          {/* NRP */}
          {!pagesType?.OUTSOURCE && (
            <Grid item xs={6}>
              <Input
                type='number'
                inputProps={{ min: '0' }}
                label='NRP'
                placeholder='Masukkan NRP'
                name='nrp'
                value={formik?.values?.nrp}
                error={formik?.errors?.nrp}
                onChange={(e) => {
                  const val = e?.target?.value
                  formik?.setFieldValue('nrp', val, false)
                }}
              />
            </Grid>
          )}

          {/* Place of Birth */}
          <Grid item xs={6}>
            <Input
              label='Tempat Lahir *'
              placeholder='Masukkan Tempat Lahir'
              name='placeOfBirth'
              value={formik?.values?.placeOfBirth}
              error={formik?.errors?.placeOfBirth}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('placeOfBirth', val, false)
                setTimeout(() => {
                  formik.validateField('placeOfBirth')
                }, 1)
              }}
            />
          </Grid>
          {/* Date of Birth */}
          <Grid item xs={6}>
            <DatePickerDay
              label='Tanggal Lahir *'
              placeholder='dd-mm-yyyy'
              name={'dateOfBirth'}
              value={formik?.values?.dateOfBirth}
              error={formik?.errors?.dateOfBirth}
              onChange={(val) => {
                formik?.setFieldValue('dateOfBirth', val, false)
                setTimeout(() => {
                  formik.validateField('dateOfBirth')
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
              name='religion'
              value={formik?.values?.religion}
              error={formik?.errors?.religion}
              onChange={(val) => {
                formik?.setFieldValue('religion', val, false)
                setTimeout(() => {
                  formik.validateField('religion')
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
              name='gender'
              value={formik?.values?.gender}
              error={formik?.errors?.gender}
              onChange={(val) => {
                formik?.setFieldValue('gender', val, false)
                setTimeout(() => {
                  formik.validateField('gender')
                }, 1)
              }}
            />
          </Grid>
          {/* Marital Status */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.marital}
              placeholder='Pilih Status Perkawinan'
              label='Status Perkawinan'
              name='maritalStatus'
              value={formik?.values?.maritalStatus}
              error={formik?.errors?.maritalStatus}
              onChange={(val) => {
                formik?.setFieldValue('maritalStatus', val, false)
                // setTimeout(() => {
                //   formik.validateField('maritalStatus')
                // }, 1)
              }}
            />
          </Grid>
          {pagesType?.ASN && (
            <>
              {/* Marriage Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal Perkawinan'
                  placeholder='dd-mm-yyyy'
                  name={'marriageDate'}
                  value={formik?.values?.marriageDate}
                  error={formik?.errors?.marriageDate}
                  onChange={(val) => {
                    formik?.setFieldValue('marriageDate', val, false)
                    // setTimeout(() => {
                    //   formik.validateField('marriageDate')
                    // }, 1)
                  }}
                />
              </Grid>
              {/* Marriage Description */}
              <Grid item xs={6}>
                <Input
                  label='Keterangan Perkawinan'
                  placeholder='Masukkan Keterangan Perkawinan'
                  name='marriageDesc'
                  value={formik?.values?.marriageDesc}
                  error={formik?.errors?.marriageDesc}
                  onChange={(e) => {
                    const val = e?.target?.value
                    formik?.setFieldValue('marriageDesc', val, false)
                    // setTimeout(() => {
                    //   formik.validateField('marriageDesc')
                    // }, 1)
                  }}
                />
                <Typography
                  sx={{ fontSize: '12px', marginTop: '6px', opacity: 0.8 }}
                >
                  Contoh : Pernikahan Pertama, dst., Cerai Mati, Cerai Hidup
                </Typography>
              </Grid>
            </>
          )}
          {/* Employment Type */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.employmentType}
              placeholder={`Pilih Jenis ${
                pagesType?.ASN
                  ? 'Pegawai'
                  : pagesType?.NONASN
                  ? 'Perbantuan'
                  : 'Outsourcing'
              }`}
              label={`Jenis ${
                pagesType?.ASN
                  ? 'Pegawai'
                  : pagesType?.NONASN
                  ? 'Perbantuan'
                  : 'Outsourcing'
              } *`}
              name='employmentType'
              value={formik?.values?.employmentType}
              error={formik?.errors?.employmentType}
              onChange={(val) => {
                formik?.setFieldValue('employmentType', val, false)
                setTimeout(() => {
                  formik.validateField('employmentType')
                }, 1)
              }}
            />
          </Grid>
          {/* Date Started Work */}
          <Grid item xs={6}>
            <DatePickerDay
              label={
                pagesType?.ASN
                  ? 'TMT CPNS *'
                  : pagesType?.NONASN
                  ? 'Tanggal Mulai Bekerja di Sekretariat Wakil Presiden'
                  : 'Tanggal Mulai Bekerja'
              }
              placeholder='dd-mm-yyyy'
              name={'dateStartedWork'}
              value={formik?.values?.dateStartedWork}
              error={formik?.errors?.dateStartedWork}
              onChange={(val) => {
                formik?.setFieldValue('dateStartedWork', val, false)

                if (pagesType?.ASN) {
                  setTimeout(() => {
                    formik.validateField('dateStartedWork')
                  }, 1)
                }
              }}
            />
          </Grid>
          {/* PNS Effective Date */}
          {pagesType?.ASN && (
            <Grid item xs={6}>
              <DatePickerDay
                label={'TMT PNS'}
                placeholder='dd-mm-yyyy'
                name={'pnsEffectiveDate'}
                value={formik?.values?.pnsEffectiveDate}
                error={formik?.errors?.pnsEffectiveDate}
                onChange={(val) => {
                  formik?.setFieldValue('pnsEffectiveDate', val, false)
                }}
              />
            </Grid>
          )}
          {/* Position */}
          <Grid container item xs={6} spacing={3}>
            {formik?.values?.positions &&
              formik?.values?.positions.map((itm, idx) => (
                <Grid item xs={12} key={idx} ref={ref}>
                  <Autocomplete
                    options={options?.positions[idx] || []}
                    placeholder='Pilih Jabatan'
                    label={
                      idx == 0 ? `Jabatan ${isPositions ? '*' : ''}` : null
                    }
                    name={`positions[${idx}].name`}
                    value={itm?.name}
                    error={formik?.errors[`positions[${idx}].name`]}
                    onChange={(val) => {
                      const data = formik?.values?.positions
                      const dataSlice = data.slice(0, idx)
                      const newData = [...dataSlice, { name: val || null }]

                      if (val) {
                        newData.push({ name: null })
                      }

                      formik?.setFieldValue(`positions`, newData, false)

                      setTimeout(() => {
                        formik.validateField(`positions`)
                      }, 1)
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          {/* TMT Position */}
          <Grid item xs={6}>
            <DatePickerDay
              label={`TMT Menjabat ${isPositions ? '*' : ''}`}
              placeholder='dd-mm-yyyy'
              name='positionEffectiveDate'
              value={formik?.values?.positionEffectiveDate}
              error={formik?.errors?.positionEffectiveDate}
              onChange={(val) => {
                formik?.setFieldValue('positionEffectiveDate', val, false)
                setTimeout(() => {
                  formik.validateField('positionEffectiveDate')
                }, 1)
              }}
            />
          </Grid>

          {!pagesType?.OUTSOURCE && (
            <>
              {/* Grade */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.grade}
                  placeholder='Pilih Pangkat / Golongan'
                  label={`Pangkat / Golongan ${pagesType?.ASN ? '*' : ''}`}
                  name='grade'
                  value={formik?.values?.grade}
                  error={formik?.errors?.grade}
                  onChange={(val) => {
                    formik?.setFieldValue('grade', val, false)

                    if (pagesType?.ASN) {
                      setTimeout(() => {
                        formik.validateField('grade')
                      }, 1)
                    }
                  }}
                />
              </Grid>
              {/* TMT Grade */}
              <Grid item xs={6}>
                <DatePickerDay
                  label={`TMT Pangkat / Golongan ${pagesType?.ASN ? '*' : ''}`}
                  placeholder='dd-mm-yyyy'
                  name='gradeEffectiveDate'
                  value={formik?.values?.gradeEffectiveDate}
                  error={formik?.errors?.gradeEffectiveDate}
                  onChange={(val) => {
                    formik?.setFieldValue('gradeEffectiveDate', val, false)

                    if (pagesType?.ASN) {
                      setTimeout(() => {
                        formik.validateField('gradeEffectiveDate')
                      }, 1)
                    }
                  }}
                />
              </Grid>
              {/* Echelon */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.echelon}
                  placeholder='Pilih Eselon'
                  label='Eselon'
                  name='echelon'
                  value={formik?.values?.echelon}
                  error={formik?.errors?.echelon}
                  onChange={(val) => {
                    formik?.setFieldValue('echelon', val, false)
                  }}
                />
              </Grid>
              {/* TMT Echelon */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='TMT Eselon'
                  placeholder='dd-mm-yyyy'
                  name='echelonEffectiveDate'
                  value={formik?.values?.echelonEffectiveDate}
                  error={formik?.errors?.echelonEffectiveDate}
                  onChange={(val) => {
                    formik?.setFieldValue('echelonEffectiveDate', val, false)
                  }}
                />
              </Grid>
            </>
          )}

          {/* Years of Service */}
          {pagesType?.ASN && (
            <Grid container item xs={12} spacing={3}>
              {/* Total */}
              <Grid item xs={6}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    margin: '0 0 8px 0'
                  }}
                >
                  Masa Kerja Keseluruhan
                </Typography>
                <Grid container spacing={3}>
                  {/* Years */}
                  <Grid item xs={6}>
                    <Input
                      type='number'
                      inputProps={{ min: '0' }}
                      label='Jumlah Tahun'
                      placeholder='Masukkan Jumlah Tahun'
                      name='yearsOfServiceTotal.year'
                      value={formik?.values?.yearsOfServiceTotal?.year}
                      error={formik?.errors?.yearsOfServiceTotal?.year}
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik?.setFieldValue(
                          'yearsOfServiceTotal.year',
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                  {/* Months */}
                  <Grid item xs={6}>
                    <Input
                      type='number'
                      inputProps={{ min: '0' }}
                      label='Jumlah Bulan'
                      placeholder='Masukkan Jumlah Bulan'
                      name='yearsOfServiceTotal.month'
                      value={formik?.values?.yearsOfServiceTotal?.month}
                      error={formik?.errors?.yearsOfServiceTotal?.month}
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik?.setFieldValue(
                          'yearsOfServiceTotal.month',
                          val,
                          false
                        )
                        setTimeout(() => {
                          formik.validateField('yearsOfServiceTotal.month')
                        }, 1)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Grade */}
              <Grid item xs={6}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    margin: '0 0 8px 0'
                  }}
                >
                  Masa Kerja Golongan
                </Typography>
                <Grid container spacing={3}>
                  {/* Years */}
                  <Grid item xs={6}>
                    <Input
                      type='number'
                      inputProps={{ min: '0' }}
                      label='Jumlah Tahun'
                      placeholder='Masukkan Jumlah Tahun'
                      name='yearsOfServiceRank.year'
                      value={formik?.values?.yearsOfServiceRank?.year}
                      error={formik?.errors?.yearsOfServiceRank?.year}
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik?.setFieldValue(
                          'yearsOfServiceRank.year',
                          val,
                          false
                        )
                      }}
                    />
                  </Grid>
                  {/* Months */}
                  <Grid item xs={6}>
                    <Input
                      type='number'
                      inputProps={{ min: '0' }}
                      label='Jumlah Bulan'
                      placeholder='Masukkan Jumlah Bulan'
                      name='yearsOfServiceRank.month'
                      value={formik?.values?.yearsOfServiceRank?.month}
                      error={formik?.errors?.yearsOfServiceRank?.month}
                      onChange={(e) => {
                        const val = e?.target?.value
                        formik?.setFieldValue(
                          'yearsOfServiceRank.month',
                          val,
                          false
                        )
                        setTimeout(() => {
                          formik.validateField('yearsOfServiceRank.month')
                        }, 1)
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Agency */}
          {!pagesType?.OUTSOURCE && (
            <Grid item xs={6}>
              <Autocomplete
                options={options?.institution}
                placeholder='Pilih Instansi Induk'
                label='Instansi Induk'
                name='institution'
                value={formik?.values?.institution}
                error={formik?.errors?.institution}
                onChange={(val) => {
                  formik?.setFieldValue('institution', val, false)
                  // setTimeout(() => {
                  //   formik.validateField('institution')
                  // }, 1)
                }}
              />
            </Grid>
          )}

          {/* Education Level */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.employeeEducationLevel}
              label={`Tingkat Pendidikan Akhir *`}
              placeholder='Pilih Tingkat Pendidikan Akhir'
              name={`educationLevel`}
              value={formik?.values?.educationLevel}
              error={formik?.errors?.educationLevel}
              onChange={(val) => {
                formik?.setFieldValue(`educationLevel`, val, false)
                setTimeout(() => {
                  formik.validateField(`educationLevel`)
                }, 1)
              }}
            />
          </Grid>
          {/* Education Name */}
          <Grid item xs={6}>
            <Input
              label='Nama Sekolah/Universitas'
              placeholder='Masukkan Nama Sekolah/Universitas'
              name={`educationName`}
              value={formik?.values?.educationName}
              error={formik?.errors?.educationName}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue(`educationName`, val, false)
                // setTimeout(() => {
                //   formik.validateField(`educationName`)
                // }, 1)
              }}
            />
          </Grid>
          {/* Education Year */}
          <Grid item xs={6}>
            <DatepickerYear
              isClear
              label='Tahun Lulus'
              placeholder='Pilih Tahun Lulus'
              nname={`educationYear`}
              value={formik?.values?.educationYear}
              error={formik?.errors?.educationYear}
              onChange={(val) => {
                formik?.setFieldValue(`educationYear`, val, false)
                // setTimeout(() => {
                //   formik.validateField(`educationYear`)
                // }, 1)
              }}
            />
          </Grid>

          {/* Employee Id Card Number */}
          {pagesType?.ASN && (
            <Grid item xs={6}>
              <Input
                label='No. Karpeg'
                placeholder='Masukkan No. Karpeg'
                name='employeeIdCardNumber'
                value={formik?.values?.employeeIdCardNumber}
                error={formik?.errors?.employeeIdCardNumber}
                onChange={(e) => {
                  const val = e?.target?.value
                  formik?.setFieldValue('employeeIdCardNumber', val, false)
                  setTimeout(() => {
                    formik.validateField('employeeIdCardNumber')
                  }, 1)
                }}
              />
            </Grid>
          )}

          {/* Employee Card */}
          {!pagesType?.outsource && (
            <Grid item xs={6}>
              <UploadFile
                label='SK Pengangkatan'
                maxSize={2}
                dataUnit='MB'
                formatFile={['.png', '.jpg', '.pdf']}
                name='employeeIdCard'
                value={formik?.values?.employeeIdCard}
                error={formik?.errors?.employeeIdCard}
                onDelete={() =>
                  formik?.setFieldValue('employeeIdCard', null, false)
                }
                onChange={(val) => {
                  formik?.setFieldValue('employeeIdCard', val, false)
                  setTimeout(() => {
                    formik.validateField('employeeIdCard')
                  }, 1)
                }}
              />
            </Grid>
          )}

          {/* Karisu */}
          {pagesType?.ASN && (
            <Grid item xs={6}>
              <Input
                label='No. Kartu Istri / Kartu Suami'
                placeholder='Masukkan No. Kartu Istri / Kartu Suami'
                name='karisu'
                value={formik?.values?.karisu}
                error={formik?.errors?.karisu}
                onChange={(e) => {
                  const val = e?.target?.value
                  formik?.setFieldValue('karisu', val, false)
                  setTimeout(() => {
                    formik.validateField('karisu')
                  }, 1)
                }}
              />
            </Grid>
          )}

          {/* NPWP */}
          <Grid item xs={6}>
            <Input
              label='NPWP'
              placeholder='Masukkan NPWP'
              name='taxId'
              value={formik?.values?.taxId}
              error={formik?.errors?.taxId}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('taxId', val, false)
                setTimeout(() => {
                  formik.validateField('taxId')
                }, 1)
              }}
            />
          </Grid>
          {/* Employee Status */}
          <Grid item xs={6}>
            <Autocomplete
              options={options?.employeeStatus}
              placeholder='Pilih Status Pegawai'
              label='Status Pegawai *'
              name='employmentStatus'
              value={formik?.values?.employmentStatus}
              error={formik?.errors?.employmentStatus}
              onChange={(val) => {
                formik?.setFieldValue('employmentStatus', val, false)
                setTimeout(() => {
                  formik.validateField('employmentStatus')
                }, 1)

                if (
                  val == 'Aktif' ||
                  val == 'Aktif Perbantuan Setneg' ||
                  val == 'Hukuman Disiplin'
                ) {
                  formik?.setFieldValue('lastDateOfWork', '', false)
                }
              }}
            />
          </Grid>
          {/* Employee Status */}
          {isLastDate && (
            <Grid item xs={6}>
              <DatePickerDay
                label='Tanggal Terakhir Bekerja *'
                placeholder='dd-mm-yyyy'
                name={'lastDateOfWork'}
                value={formik?.values?.lastDateOfWork}
                error={formik?.errors?.lastDateOfWork}
                onChange={(val) => {
                  formik?.setFieldValue('lastDateOfWork', val, false)
                  setTimeout(() => {
                    formik.validateField('lastDateOfWork')
                  }, 1)
                }}
              />
            </Grid>
          )}
          {/* Family Regist Number */}
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='No KK'
              placeholder='Masukkan No. KK'
              name='familyRegistNumber'
              value={formik?.values?.familyRegistNumber}
              error={formik?.errors?.familyRegistNumber}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('familyRegistNumber', val, false)
                // setTimeout(() => {
                //   formik.validateField('familyRegistNumber')
                // }, 1)
              }}
            />
          </Grid>
          {/* ID Number */}
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='No NIK *'
              placeholder='Masukkan No. NIK'
              name='idNumber'
              value={formik?.values?.idNumber}
              error={formik?.errors?.idNumber}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('idNumber', val, false)
                setTimeout(() => {
                  formik.validateField('idNumber')
                }, 1)
              }}
            />
          </Grid>
          {/* Residence */}
          {pagesType?.ASN && (
            <Grid item xs={6}>
              <Autocomplete
                options={options?.residence}
                placeholder='Pilih Komplek'
                label='Komplek'
                name='residence'
                value={formik?.values?.residence}
                error={formik?.errors?.residence}
                onChange={(val) => {
                  formik?.setFieldValue('residence', val, false)
                  // setTimeout(() => {
                  //   formik.validateField('residence')
                  // }, 1)
                }}
              />
            </Grid>
          )}
          {/* Residence Name */}
          <Grid item xs={6}>
            <Input
              label='Alamat Tempat Tinggal Saat Ini'
              placeholder='Masukkan Alamat Tempat Tinggal Saat Ini'
              name='residenceName'
              value={formik?.values?.residenceName}
              error={formik?.errors?.residenceName}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('residenceName', val, false)
              }}
            />
          </Grid>
          {/* Address */}
          <Grid item xs={6}>
            <Input
              label='Alamat sesuai KTP'
              placeholder='Masukkan Alamat sesuai KTP'
              name='address'
              value={formik?.values?.address}
              error={formik?.errors?.address}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('address', val, false)
              }}
            />
          </Grid>
          {/* Home Telephone Number */}
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='No. Telepon Rumah'
              placeholder='Masukkan No. Telepon Rumah'
              name='homeTelephoneNumber'
              value={formik?.values?.homeTelephoneNumber}
              error={formik?.errors?.homeTelephoneNumber}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('homeTelephoneNumber', val, false)
              }}
            />
          </Grid>
          {/* Mobile Phone */}
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='No. HP'
              placeholder='Masukkan No. HP'
              name='mobilePhone'
              value={formik?.values?.mobilePhone}
              error={formik?.errors?.mobilePhone}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('mobilePhone', val, false)
              }}
            />
          </Grid>
          {/* Office Address */}
          <Grid item xs={6}>
            <Input
              label='Alamat Kantor'
              placeholder='Masukkan Alamat Kantor'
              name='officeAddress'
              value={formik?.values?.officeAddress}
              error={formik?.errors?.officeAddress}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('officeAddress', val, false)
              }}
            />
          </Grid>
          {/* Office Phone Number */}
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='No. Telepon Kantor'
              placeholder='Masukkan No. Telepon Kantor'
              name='officeTelephoneNumber'
              value={formik?.values?.officeTelephoneNumber}
              error={formik?.errors?.officeTelephoneNumber}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('officeTelephoneNumber', val, false)
              }}
            />
          </Grid>
          {/* Email */}
          <Grid item xs={6}>
            <Input
              label={`Email ${!pagesType?.ASN ? '*' : ''}`}
              placeholder='Masukkan Email'
              name='email'
              value={formik?.values?.email}
              error={formik?.errors?.email}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('email', val, false)
                setTimeout(() => {
                  formik.validateField('email')
                }, 1)
              }}
            />
          </Grid>
          {/* Ofiicial Email */}
          {!pagesType?.OUTSOURCE && (
            <Grid item xs={6}>
              <Input
                label={`Email Dinas ${pagesType?.ASN ? '*' : ''}`}
                placeholder='Masukkan Email Dinas'
                name='officeEmail'
                value={formik?.values?.officeEmail}
                error={formik?.errors?.officeEmail}
                onChange={(e) => {
                  const val = e?.target?.value
                  formik?.setFieldValue('officeEmail', val, false)

                  if (pagesType?.ASN) {
                    setTimeout(() => {
                      formik.validateField('officeEmail')
                    }, 1)
                  }
                }}
              />
            </Grid>
          )}

          {/* Description */}
          {!pagesType?.ASN && (
            <Grid item xs={6}>
              <Input
                label='Keterangan'
                placeholder='Masukkan Keterangan'
                name='description'
                value={formik?.values?.description}
                error={formik?.errors?.description}
                onChange={(e) => {
                  const val = e?.target?.value
                  formik?.setFieldValue('description', val, false)
                }}
              />
            </Grid>
          )}

          {/* Emergency Contact */}
          <Grid item xs={6}>
            <Input
              label='Kontak Darurat(Nama, Nomor Handphone, Hubungan dengan pegawai) *'
              placeholder='Masukkan Kontak Darurat'
              name='emergencyContact'
              value={formik?.values?.emergencyContact}
              error={formik?.errors?.emergencyContact}
              onChange={(e) => {
                const val = e?.target?.value
                formik?.setFieldValue('emergencyContact', val, false)
                setTimeout(() => {
                  formik.validateField('emergencyContact')
                }, 1)
              }}
            />
          </Grid>
        </Grid>
      </CardAccordion>
    </form>
  )
})

EmployeeForm.propTypes = {
  options: PropTypes.object,
  pagesType: PropTypes.string.isRequired,
  isExpand: PropTypes.bool,
  setIsCreditNumber: PropTypes.func,
  onGetPositionType: PropTypes.func,
  onChangeHierarchies: PropTypes.func
}

export default EmployeeForm
