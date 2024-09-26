/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Input } from '@/components/shared'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Autocomplete } from '@/components/shared'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

const EmployeeForm = ({
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
  pageType,
  isExpand,
  onChangeHierarchies = () => {}
}) => {
  const pagesType = useMemo(() => {
    const data = {
      asn: pageType == 'ASN',
      nonAsn: pageType == 'NON_ASN',
      outsource: pageType == 'OUTSOURCING'
    }

    return data
  }, [pageType])

  const isLastDate = useMemo(() => {
    const employee = values?.employee
    const status = employee?.employmentStatus
    return (
      status !== null &&
      status !== 'Aktif' &&
      status !== 'Aktif Perbantuan Setneg' &&
      status !== 'Hukuman Disiplin'
    )
  }, [values?.employee])

  const isResidenceName = useMemo(() => {
    const employee = values?.employee
    const residence = employee?.residence

    return residence && residence.toLowerCase() == 'luar komplek'
  }, [values?.employee])

  const isPositions = useMemo(() => {
    // const valuePositions = values?.employee?.positions

    // if (valuePositions.length > 1) {
    //   return values?.employee?.positions
    //     .filter((itm) => itm?.name)
    //     .every((itm) => itm?.name !== null)
    // }

    // return false

    if (
      !values?.employee?.employmentStatus ||
      values?.employee?.employmentStatus == 'Aktif' ||
      values?.employee?.employmentStatus == 'Aktif Perbantuan Setneg'
    )
      return true

    return false
  }, [values?.employee?.employmentStatus])

  useEffect(() => {
    const datas = values?.employee?.positions || []
    const hierarchiesNull = datas.filter((itm) => itm?.name == null)

    onChangeHierarchies(datas)

    if (hierarchiesNull.length == 0) {
      const newValues = [...datas, { name: null }]
      setFieldValue(`employee.positions`, newValues, false)
    }
  }, [values?.employee?.positions])

  return (
    <CardAccordion
      title='Data Pegawai'
      isExpand={isExpand}
      defaultExpanded={true}
    >
      <Grid container spacing={3} sx={{ marginBottom: '10px' }}>
        {/* Image Profile */}
        <Grid item xs={12}>
          <UploadFile
            label='Foto Profil'
            maxSize={2}
            dataUnit='MB'
            formatFile={['.png', '.jpg']}
            dimension={{ width: '350', height: '500' }}
            name={'employee.image'}
            value={values?.employee?.image}
            error={errors?.employee?.image}
            onDelete={() => {
              setFieldValue('employee.image', null, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.image')
              }, 1)
            }}
            onChange={(val) => {
              setFieldValue('employee.image', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.image')
              }, 1)
            }}
          />
        </Grid>
        {/* Name */}
        <Grid item xs={6}>
          <Input
            label='Nama *'
            placeholder='Masukkan Nama'
            name='employee.name'
            value={values?.employee?.name}
            error={errors?.employee?.name}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.name')
              }, 1)
            }}
          />
        </Grid>

        {/* Prefix / Suffix */}
        {!pagesType?.outsource && (
          <>
            {/* Prefix */}
            <Grid item xs={6}>
              <Input
                label='Nama Gelar Depan'
                placeholder='Masukkan Nama Gelar Depan'
                name='employee.titlePrefix'
                value={values?.employee?.titlePrefix}
                error={errors?.employee?.titlePrefix}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('employee.titlePrefix', val, false)
                }}
              />
            </Grid>
            {/* Suffix */}
            <Grid item xs={6}>
              <Input
                label='Nama Gelar Belakang'
                placeholder='Masukkan Nama Gelar Belakang'
                name='employee.titleSuffix'
                value={values?.employee?.titleSuffix}
                error={errors?.employee?.titleSuffix}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('employee.titleSuffix', val, false)
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
            name='employee.nip'
            value={values?.employee?.nip}
            error={errors?.employee?.nip}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.nip', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.nip')
              }, 1)
            }}
          />
        </Grid>

        {/* NRP */}
        {!pagesType?.outsource && (
          <Grid item xs={6}>
            <Input
              type='number'
              inputProps={{ min: '0' }}
              label='NRP'
              placeholder='Masukkan NRP'
              name='employee.nrp'
              value={values?.employee?.nrp}
              error={errors?.employee?.nrp}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('employee.nrp', val, false)
              }}
            />
          </Grid>
        )}

        {/* Place of Birth */}
        <Grid item xs={6}>
          <Input
            label='Tempat Lahir *'
            placeholder='Masukkan Tempat Lahir'
            name='employee.placeOfBirth'
            value={values?.employee?.placeOfBirth}
            error={errors?.employee?.placeOfBirth}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.placeOfBirth', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.placeOfBirth')
              }, 1)
            }}
          />
        </Grid>
        {/* Date of Birth */}
        <Grid item xs={6}>
          <DatePickerDay
            label='Tanggal Lahir *'
            placeholder='dd-mm-yyyy'
            name={'employee.dateOfBirth'}
            value={values?.employee?.dateOfBirth}
            error={errors?.employee?.dateOfBirth}
            onChange={(val) => {
              setFieldValue('employee.dateOfBirth', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.dateOfBirth')
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
            name='employee.religion'
            value={values?.employee?.religion}
            error={errors?.employee?.religion}
            onChange={(val) => {
              setFieldValue('employee.religion', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.religion')
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
            name='employee.gender'
            value={values?.employee?.gender}
            error={errors?.employee?.gender}
            onChange={(val) => {
              setFieldValue('employee.gender', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.gender')
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
            name='employee.maritalStatus'
            value={values?.employee?.maritalStatus}
            error={errors?.employee?.maritalStatus}
            onChange={(val) => {
              setFieldValue('employee.maritalStatus', val, false)
              // setTimeout(() => {
              //   formikRef.current.validateField('employee.maritalStatus')
              // }, 1)
            }}
          />
        </Grid>
        {pagesType?.asn && (
          <>
            {/* Marriage Date */}
            <Grid item xs={6}>
              <DatePickerDay
                label='Tanggal Perkawinan'
                placeholder='dd-mm-yyyy'
                name={'employee.marriageDate'}
                value={values?.employee?.marriageDate}
                error={errors?.employee?.marriageDate}
                onChange={(val) => {
                  setFieldValue('employee.marriageDate', val, false)
                  // setTimeout(() => {
                  //   formikRef.current.validateField('employee.marriageDate')
                  // }, 1)
                }}
              />
            </Grid>
            {/* Marriage Description */}
            <Grid item xs={6}>
              <Input
                label='Keterangan Perkawinan'
                placeholder='Masukkan Keterangan Perkawinan'
                name='employee.marriageDesc'
                value={values?.employee?.marriageDesc}
                error={errors?.employee?.marriageDesc}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue('employee.marriageDesc', val, false)
                  // setTimeout(() => {
                  //   formikRef.current.validateField('employee.marriageDesc')
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
              pagesType?.asn
                ? 'Pegawai'
                : pagesType?.nonAsn
                ? 'Perbantuan'
                : 'Outsourcing'
            }`}
            label={`Jenis ${
              pagesType?.asn
                ? 'Pegawai'
                : pagesType?.nonAsn
                ? 'Perbantuan'
                : 'Outsourcing'
            } *`}
            name='employee.employmentType'
            value={values?.employee?.employmentType}
            error={errors?.employee?.employmentType}
            onChange={(val) => {
              setFieldValue('employee.employmentType', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.employmentType')
              }, 1)
            }}
          />
        </Grid>
        {/* Date Started Work */}
        <Grid item xs={6}>
          <DatePickerDay
            label={
              pagesType?.asn
                ? 'TMT CPNS *'
                : pagesType?.nonAsn
                ? 'Tanggal Mulai Bekerja di Sekretariat Wakil Presiden'
                : 'Tanggal Mulai Bekerja'
            }
            placeholder='dd-mm-yyyy'
            name={'employee.dateStartedWork'}
            value={values?.employee?.dateStartedWork}
            error={errors?.employee?.dateStartedWork}
            onChange={(val) => {
              setFieldValue('employee.dateStartedWork', val, false)

              if (pagesType?.asn) {
                setTimeout(() => {
                  formikRef.current.validateField('employee.dateStartedWork')
                }, 1)
              }
            }}
          />
        </Grid>
        {/* PNS Effective Date */}
        {pagesType?.asn && (
          <Grid item xs={6}>
            <DatePickerDay
              label={'TMT PNS'}
              placeholder='dd-mm-yyyy'
              name={'employee.pnsEffectiveDate'}
              value={values?.employee?.pnsEffectiveDate}
              error={errors?.employee?.pnsEffectiveDate}
              onChange={(val) => {
                setFieldValue('employee.pnsEffectiveDate', val, false)
              }}
            />
          </Grid>
        )}
        {/* Position */}
        <Grid container item xs={6} spacing={3}>
          {values?.employee?.positions &&
            values?.employee?.positions.map((itm, idx) => (
              <Grid item xs={12} key={idx}>
                <Autocomplete
                  options={options?.positions[idx] || []}
                  placeholder='Pilih Jabatan'
                  label={idx == 0 ? `Jabatan ${isPositions ? '*' : ''}` : null}
                  name={`employee.positions[${idx}].name`}
                  value={itm?.name}
                  error={
                    errors?.employee?.positions &&
                    errors?.employee?.positions[idx]?.name
                  }
                  onChange={(val) => {
                    const data = values?.employee?.positions
                    const dataSlice = data.slice(0, idx)
                    const newData = [...dataSlice, { name: val || null }]

                    if (val) {
                      newData.push({ name: null })
                    }

                    setFieldValue(`employee.positions`, newData, false)

                    setTimeout(() => {
                      formikRef.current.validateField(`employee.positions`)
                    }, 1)
                  }}
                />
              </Grid>
            ))}
        </Grid>
        {/* TMT Position */}
        <Grid item xs={6}>
          <DatePickerDay
            label={`TMT Menjabat *`}
            placeholder='dd-mm-yyyy'
            name='employee.positionEffectiveDate'
            value={values?.employee?.positionEffectiveDate}
            error={errors?.employee?.positionEffectiveDate}
            onChange={(val) => {
              setFieldValue('employee.positionEffectiveDate', val, false)
              setTimeout(() => {
                formikRef.current.validateField(
                  'employee.positionEffectiveDate'
                )
              }, 1)
            }}
          />
        </Grid>

        {!pagesType?.outsource && (
          <>
            {/* Grade */}
            <Grid item xs={6}>
              <Autocomplete
                options={options?.grade}
                placeholder='Pilih Golongan / Pangkat'
                label={`Golongan / Pangkat ${pagesType?.asn ? '*' : ''}`}
                name='employee.grade'
                value={values?.employee?.grade}
                error={errors?.employee?.grade}
                onChange={(val) => {
                  setFieldValue('employee.grade', val, false)

                  if (pagesType?.asn) {
                    setTimeout(() => {
                      formikRef.current.validateField('employee.grade')
                    }, 1)
                  }
                }}
              />
            </Grid>
            {/* TMT Grade */}
            <Grid item xs={6}>
              <DatePickerDay
                label={`TMT Golongan / Pangkat ${pagesType?.asn ? '*' : ''}`}
                placeholder='dd-mm-yyyy'
                name='employee.gradeEffectiveDate'
                value={values?.employee?.gradeEffectiveDate}
                error={errors?.employee?.gradeEffectiveDate}
                onChange={(val) => {
                  setFieldValue('employee.gradeEffectiveDate', val, false)

                  if (pagesType?.asn) {
                    setTimeout(() => {
                      formikRef.current.validateField(
                        'employee.gradeEffectiveDate'
                      )
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
                name='employee.echelon'
                value={values?.employee?.echelon}
                error={errors?.employee?.echelon}
                onChange={(val) => {
                  setFieldValue('employee.echelon', val, false)
                }}
              />
            </Grid>
            {/* TMT Echelon */}
            <Grid item xs={6}>
              <DatePickerDay
                label='TMT Eselon'
                placeholder='dd-mm-yyyy'
                name='employee.echelonEffectiveDate'
                value={values?.employee?.echelonEffectiveDate}
                error={errors?.employee?.echelonEffectiveDate}
                onChange={(val) => {
                  setFieldValue('employee.echelonEffectiveDate', val, false)
                }}
              />
            </Grid>
          </>
        )}

        {/* Years of Service */}
        {pagesType?.asn && (
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
                    name='employee.yearsOfServiceTotal.year'
                    value={values?.employee?.yearsOfServiceTotal?.year}
                    error={errors?.employee?.yearsOfServiceTotal?.year}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        'employee.yearsOfServiceTotal.year',
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
                    name='employee.yearsOfServiceTotal.month'
                    value={values?.employee?.yearsOfServiceTotal?.month}
                    error={errors?.employee?.yearsOfServiceTotal?.month}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        'employee.yearsOfServiceTotal.month',
                        val,
                        false
                      )
                      setTimeout(() => {
                        formikRef.current.validateField(
                          'employee.yearsOfServiceTotal.month'
                        )
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
                    name='employee.yearsOfServiceRank.year'
                    value={values?.employee?.yearsOfServiceRank?.year}
                    error={errors?.employee?.yearsOfServiceRank?.year}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        'employee.yearsOfServiceRank.year',
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
                    name='employee.yearsOfServiceRank.month'
                    value={values?.employee?.yearsOfServiceRank?.month}
                    error={errors?.employee?.yearsOfServiceRank?.month}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        'employee.yearsOfServiceRank.month',
                        val,
                        false
                      )
                      setTimeout(() => {
                        formikRef.current.validateField(
                          'employee.yearsOfServiceRank.month'
                        )
                      }, 1)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Agency */}
        {!pagesType?.outsource && (
          <Grid item xs={6}>
            <Autocomplete
              options={options?.institution}
              placeholder='Pilih Instansi Induk'
              label='Instansi Induk'
              name='employee.institution'
              value={values?.employee?.institution}
              error={errors?.employee?.institution}
              onChange={(val) => {
                setFieldValue('employee.institution', val, false)
                // setTimeout(() => {
                //   formikRef.current.validateField('employee.institution')
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
            name={`employee.educationLevel`}
            value={values?.employee?.educationLevel}
            error={errors?.employee && errors?.employee.educationLevel}
            onChange={(val) => {
              setFieldValue(`employee.educationLevel`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`employee.educationLevel`)
              }, 1)
            }}
          />
        </Grid>
        {/* Education Name */}
        <Grid item xs={6}>
          <Input
            label='Nama Sekolah/Universitas'
            placeholder='Masukkan Nama Sekolah/Universitas'
            name={`employee.educationName`}
            value={values?.employee?.educationName}
            error={errors?.employee && errors?.employee.educationName}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`employee.educationName`, val, false)
              // setTimeout(() => {
              //   formikRef.current.validateField(`employee.educationName`)
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
            nname={`employee.educationYear`}
            value={values?.employee?.educationYear}
            error={errors?.employee && errors?.employee.educationYear}
            onChange={(val) => {
              setFieldValue(`employee.educationYear`, val, false)
              // setTimeout(() => {
              //   formikRef.current.validateField(`employee.educationYear`)
              // }, 1)
            }}
          />
        </Grid>

        {/* Employee Id Card Number */}
        {pagesType?.asn && (
          <Grid item xs={6}>
            <Input
              label='No. Karpeg'
              placeholder='Masukkan No. Karpeg'
              name='employee.employeeIdCardNumber'
              value={values?.employee?.employeeIdCardNumber}
              error={errors?.employee?.employeeIdCardNumber}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('employee.employeeIdCardNumber', val, false)
                setTimeout(() => {
                  formikRef.current.validateField(
                    'employee.employeeIdCardNumber'
                  )
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
              name='employee.employeeIdCard'
              value={values?.employee?.employeeIdCard}
              error={errors?.employee?.employeeIdCard}
              onDelete={() =>
                setFieldValue('employee.employeeIdCard', null, false)
              }
              onChange={(val) => {
                setFieldValue('employee.employeeIdCard', val, false)
                setTimeout(() => {
                  formikRef.current.validateField('employee.employeeIdCard')
                }, 1)
              }}
            />
          </Grid>
        )}

        {/* Karisu */}
        {pagesType?.asn && (
          <Grid item xs={6}>
            <Input
              label='No. Kartu Istri / Kartu Suami'
              placeholder='Masukkan No. Kartu Istri / Kartu Suami'
              name='employee.karisu'
              value={values?.employee?.karisu}
              error={errors?.employee?.karisu}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('employee.karisu', val, false)
                setTimeout(() => {
                  formikRef.current.validateField('employee.karisu')
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
            name='employee.taxId'
            value={values?.employee?.taxId}
            error={errors?.employee?.taxId}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.taxId', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.taxId')
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
            name='employee.employmentStatus'
            value={values?.employee?.employmentStatus}
            error={errors?.employee?.employmentStatus}
            onChange={(val) => {
              setFieldValue('employee.employmentStatus', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.employmentStatus')
              }, 1)

              if (
                val == 'Aktif' ||
                val == 'Aktif Perbantuan Setneg' ||
                val == 'Hukuman Disiplin'
              ) {
                setFieldValue('employee.lastDateOfWork', '', false)
              }
            }}
          />
        </Grid>
        {/* Employee Status */}
        {isLastDate && (
          <Grid item xs={6}>
            <DatePickerDay
              label='Tanggal Terakhir Bekerja'
              placeholder='dd-mm-yyyy'
              name={'employee.lastDateOfWork'}
              value={values?.employee?.lastDateOfWork}
              error={errors?.employee?.lastDateOfWork}
              onChange={(val) => {
                setFieldValue('employee.lastDateOfWork', val, false)
                // setTimeout(() => {
                //   formikRef.current.validateField('employee.lastDateOfWork')
                // }, 1)
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
            name='employee.familyRegistNumber'
            value={values?.employee?.familyRegistNumber}
            error={errors?.employee?.familyRegistNumber}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.familyRegistNumber', val, false)
              // setTimeout(() => {
              //   formikRef.current.validateField('employee.familyRegistNumber')
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
            name='employee.idNumber'
            value={values?.employee?.idNumber}
            error={errors?.employee?.idNumber}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.idNumber', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.idNumber')
              }, 1)
            }}
          />
        </Grid>
        {/* Residence */}
        {pagesType?.asn && (
          <Grid item xs={6}>
            <Autocomplete
              options={options?.residence}
              placeholder='Pilih Komplek'
              label='Komplek'
              name='employee.residence'
              value={values?.employee?.residence}
              error={errors?.employee?.residence}
              onChange={(val) => {
                setFieldValue('employee.residence', val, false)
                // setTimeout(() => {
                //   formikRef.current.validateField('employee.residence')
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
            name='employee.residenceName'
            value={values?.employee?.residenceName}
            error={errors?.employee?.residenceName}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.residenceName', val, false)
            }}
          />
        </Grid>
        {/* Address */}
        <Grid item xs={6}>
          <Input
            label='Alamat sesuai KTP'
            placeholder='Masukkan Alamat sesuai KTP'
            name='employee.address'
            value={values?.employee?.address}
            error={errors?.employee?.address}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.address', val, false)
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
            name='employee.homeTelephoneNumber'
            value={values?.employee?.homeTelephoneNumber}
            error={errors?.employee?.homeTelephoneNumber}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.homeTelephoneNumber', val, false)
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
            name='employee.mobilePhone'
            value={values?.employee?.mobilePhone}
            error={errors?.employee?.mobilePhone}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.mobilePhone', val, false)
            }}
          />
        </Grid>
        {/* Office Address */}
        <Grid item xs={6}>
          <Input
            label='Alamat Kantor'
            placeholder='Masukkan Alamat Kantor'
            name='employee.officeAddress'
            value={values?.employee?.officeAddress}
            error={errors?.employee?.officeAddress}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.officeAddress', val, false)
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
            name='employee.officeTelephoneNumber'
            value={values?.employee?.officeTelephoneNumber}
            error={errors?.employee?.officeTelephoneNumber}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.officeTelephoneNumber', val, false)
            }}
          />
        </Grid>
        {/* Email */}
        <Grid item xs={6}>
          <Input
            label={`Email ${!pagesType?.asn ? '*' : ''}`}
            placeholder='Masukkan Email'
            name='employee.email'
            value={values?.employee?.email}
            error={errors?.employee?.email}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.email', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.email')
              }, 1)
            }}
          />
        </Grid>
        {/* Ofiicial Email */}
        {!pagesType?.outsource && (
          <Grid item xs={6}>
            <Input
              label={`Email Dinas ${pagesType?.asn ? '*' : ''}`}
              placeholder='Masukkan Email Dinas'
              name='employee.officeEmail'
              value={values?.employee?.officeEmail}
              error={errors?.employee?.officeEmail}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('employee.officeEmail', val, false)

                if (pagesType?.asn) {
                  setTimeout(() => {
                    formikRef.current.validateField('employee.officeEmail')
                  }, 1)
                }
              }}
            />
          </Grid>
        )}

        {/* Description */}
        {!pagesType?.asn && (
          <Grid item xs={6}>
            <Input
              label='Keterangan'
              placeholder='Masukkan Keterangan'
              name='employee.description'
              value={values?.employee?.description}
              error={errors?.employee?.description}
              onChange={(e) => {
                const val = e?.target?.value
                setFieldValue('employee.description', val, false)
              }}
            />
          </Grid>
        )}

        {/* Emergency Contact */}
        <Grid item xs={6}>
          <Input
            label='Kontak Darurat(Nama, Nomor Handphone, Hubungan dengan pegawai) *'
            placeholder='Masukkan Kontak Darurat'
            name='employee.emergencyContact'
            value={values?.employee?.emergencyContact}
            error={errors?.employee?.emergencyContact}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('employee.emergencyContact', val, false)
              setTimeout(() => {
                formikRef.current.validateField('employee.emergencyContact')
              }, 1)
            }}
          />
        </Grid>
      </Grid>
    </CardAccordion>
  )
}

EmployeeForm.propTypes = {
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
  pageType: PropTypes.string.isRequired,
  isExpand: PropTypes.bool,
  onChangeHierarchies: PropTypes.func
}

export default EmployeeForm
