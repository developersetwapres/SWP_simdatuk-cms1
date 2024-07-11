/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Checkbox,
  Button as MuiButton
} from '@mui/material'
import { Autocomplete, Input } from '@/components/shared'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Formik } from 'formik'
import {
  deputyOptions,
  employeeEducationLevelOptions,
  employeeTypeOptions,
  genderOptions,
  maritalStatusOptions,
  periodOptions,
  positionDescOptions,
  predicateOptions,
  ratingOptions,
  ratingOrganizationOptions,
  retirementAge,
  workingPeriodOptions
} from 'libs/types/options'
import { v4 as uuidv4 } from 'uuid'

const checkboxes = [
  {
    title: 'Data Diri',
    checkbox: 'personalData',
    children: [
      { name: 'name', label: 'Nama' },
      { name: 'registrationNumber', label: 'NIP/NRP' },
      { name: 'birthInfo', label: 'Tempat, Tanggal Lahir' },
      { name: 'age', label: 'Umur' },
      { name: 'religion', label: 'Agama' },
      { name: 'gender', label: 'Jenis Kelamin' },
      { name: 'maritalStatus', label: 'Status Perkawinan' },
      { name: 'employeeType', label: 'Jenis Pegawai' },
      { name: 'assistanceType', label: 'Jenis Perbantuan' },
      { name: 'outsourcingType', label: 'Jenis Outsourcing' },
      { name: 'cpnsEffectiveDate', label: 'TMT CPNS' },
      { name: 'firstDateOfWorking', label: 'Tanggal Mulai Bekerja' },
      { name: 'lastDateOfWorking', label: 'Tanggal Terakhir Bekerja' },
      { name: 'totalWorkingPeriod', label: 'Masa Kerja Keseluruhan' },
      { name: 'groupWorkingPeriod', label: 'Masa Kerja Golongan' },
      { name: 'position', label: 'Jabatan' },
      { name: 'positionEffectiveDate', label: 'TMT Menjabat' },
      { name: 'grade', label: 'Golongan' },
      { name: 'gradeEffectiveDate', label: 'TMT Golongan' },
      { name: 'parentOrganization', label: 'Instansi Induk' },
      { name: 'employeeCardNumber', label: 'No. Karpeg' },
      { name: 'employeePartnerCard', label: 'No. Karisu' },
      { name: 'taxNumber', label: 'NPWP' },
      { name: 'employmentStatus', label: 'Status Pegawai' },
      { name: 'familyCardNumber', label: 'No. KK' },
      { name: 'identityNumber', label: 'No. NIK' },
      { name: 'residence', label: 'Nama Komplek' },
      { name: 'domicile', label: 'Alamat Tempat Tinggal Saat Ini' },
      { name: 'homePhoneNumber', label: 'No. Telepon Rumah' },
      { name: 'phoneNumber', label: 'No. HP' },
      { name: 'office', label: 'Alamat Kantor' },
      { name: 'officePhone', label: 'No. Telepon Kantor' },
      { name: 'email', label: 'Email' },
      { name: 'workEmail', label: 'Email Dinas' },
      { name: 'description', label: 'Keterangan' },
      { name: 'emergencyContact', label: 'Kontak Darurat' },
      { name: 'retirementLimitAge', label: 'Batas Usia Pensiun' }
    ]
  },
  {
    title: 'Data Riwayat',
    checkbox: 'historyData',
    children: [
      { name: 'educationHistory', label: 'Riwayat Pendidikan' },
      { name: 'positionHistory', label: 'Riwayat Jabatan' },
      { name: 'gradeHistory', label: 'Riwayat Golongan' },
      { name: 'structuralHistory', label: 'Riwayat Pelatihan Struktural' },
      { name: 'functionalHistory', label: 'Riwayat Pelatihan Fungsional' },
      { name: 'technicalHistory', label: 'Riwayat Pelatihan Teknis' },
      { name: 'awardHistory', label: 'Riwayat Penghargaan' },
      { name: 'skpHistory', label: 'Riwayat SKP' },
      { name: 'paktHistory', label: 'Riwayat Penetapan Angka Kredit Terakhir' },
      { name: 'recognitionHistory', label: 'Riwayat Penilaian Prestasi Kerja' },
      { name: 'disciplinaryHistory', label: 'Riwayat Hukuman Disiplin' },
      { name: 'familyHistory', label: 'Keluarga' },
      { name: 'leaveHistory', label: 'Cuti' },
      { name: 'notesHistory', label: 'Catatan' },
      { name: 'assessmentHistory', label: 'Hasil Assessment' },
      { name: 'competenceHistory', label: 'Hasil Uji Kompetensi' },
      { name: 'talentHistory', label: 'Hasil Talent Pool' }
    ]
  }
]

const InitValue = {
  // Data
  employeeType: null,
  deputy: null,
  echelon: null,
  grade: null,
  positionDescription: null,
  education: null,
  gender: null,
  minAge: null,
  maxAge: null,
  maritalStatus: null,
  retirementLimitAge: null,
  totalWorkingPeriod: null,
  gradeWorkingPeriod: null,
  // SKP
  assessmentPeriod: null,
  skpYear: null,
  workBehaviorRating: null,
  employeePerformancePredicate: null,
  organizationalPerformanceAchievements: null,
  // Angka Kredit Terakhir
  creditPeriod: null,
  creditYear: null,
  // Output
  output: null,
  // Checkboxes
  checkboxes: []
}

const ExportEmployeeComponent = ({
  grade,
  echelon,
  exportEmployeeData,
  onLoading = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { },
  clearExportEmployeesState = () => { }
}) => {
  const formikRef = useRef()
  const [showPreview, setShowPreview] = useState(false)

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  const exportFile = (values) => {
    console.log('VALUES: ', values)
  }

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'No',
        width: 600,
        align: 'left'
      },
      {
        Header: 'Nama',
        width: 600,
        align: 'left'
      }
    ]
    return col
  }, [exportEmployeeData])

  const rows = useMemo(() => {
    const dataMapping = [].map((item) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        }
      ]
    })

    return dataMapping
  }, [exportEmployeeData])

  const options = useMemo(() => {
    return {
      echelons: echelon?.options?.map(e => e?.name) || [],
      grades: grade?.options?.map(e => e?.name) || []
    }
  }, [echelon])

  useEffect(() => {
    const state = !(
      exportEmployeeData?.loading ||
      echelon?.loading ||
      grade?.loading
    )
    onLoading(state)
  }, [
    grade,
    echelon,
    exportEmployeeData
  ])

  return (
    <Formik innerRef={formikRef} initialValues={InitValue} onSubmit={() => { }}>
      {({ values, resetForm = () => { }, setFieldValue = () => { } }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LayoutPages
            summary='Export Pegawai'
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button text='Reset' color='danger' onClick={() => resetForm()} />
                <Button text='Export' onClick={() => exportFile(values)} />
              </Box>
            }
          >
            <Paper sx={{ padding: 2 }}>
              <Typography fontSize='12' color='#895700' fontWeight='700'>
                Filter Data
              </Typography>
              <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

              <Grid container direction='row' spacing={3} rowSpacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={employeeTypeOptions}
                    name='employeeType'
                    placeholder='Pilih Pegawai'
                    multiple={true}
                    label='Pegawai'
                    value={values?.employeeType || []}
                    onChange={(val) => {
                      setFieldValue('employeeType', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={deputyOptions}
                    name='deputy'
                    placeholder='Pilih Deputi'
                    multiple={true}
                    label='Deputi'
                    value={values.deputy || []}
                    onChange={(val) => {
                      setFieldValue('deputy', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.echelons}
                    name='echelon'
                    placeholder='Pilih Eselon'
                    multiple={true}
                    label='Eselon'
                    value={values?.echelon || []}
                    onChange={(val) => {
                      setFieldValue('echelon', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={options?.grades}
                    name='grade'
                    placeholder='Pilih Golongan'
                    multiple={true}
                    label='Golongan'
                    value={values?.grade || []}
                    onChange={(val) => {
                      setFieldValue('grade', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={positionDescOptions}
                    name='positionDescription'
                    placeholder='Pilih Keterangan Jabatan'
                    multiple={true}
                    label='Keterangan Jabatan'
                    value={values?.positionDescription || []}
                    onChange={(val) => {
                      setFieldValue('positionDescription', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={employeeEducationLevelOptions}
                    name='education'
                    placeholder='Pilih Riwayat Pendidikan'
                    multiple={true}
                    label='Riwayat Pendidikan'
                    value={values?.education || []}
                    onChange={(val) => {
                      setFieldValue('education', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={genderOptions}
                    name='gender'
                    placeholder='Pilih Jenis Kelamin'
                    multiple={true}
                    label='Jenis Kelamin'
                    value={values?.gender || []}
                    onChange={(val) => {
                      setFieldValue('gender', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Input
                    label='Umur Minimum'
                    placeholder='Masukkan Umur Minimum'
                    name='minAge'
                    value={values?.minAge}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('minAge', val, false)
                    }}
                    inputProps={{
                      min: 0
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Input
                    label='Umur Maksimum'
                    placeholder='Masukkan Umur Maksimum'
                    name='maxAge'
                    value={values?.maxAge}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('maxAge', val, false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={maritalStatusOptions}
                    name='maritalStatus'
                    placeholder='Pilih Status Perkawinan'
                    multiple={true}
                    label='Status Perkawinan'
                    value={values?.maritalStatus || []}
                    onChange={(val) => {
                      setFieldValue('maritalStatus', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={retirementAge}
                    name='retirementLimitAge'
                    placeholder='Pilih Batas Usia Pensiun'
                    multiple={true}
                    label='Batas Usia Pensiun'
                    value={values?.retirementLimitAge || []}
                    onChange={(val) => {
                      setFieldValue('retirementLimitAge', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={workingPeriodOptions}
                    name='totalWorkingPeriod'
                    placeholder='Pilih Masa Kerja Keseluruhan'
                    multiple={true}
                    label='Masa Kerja Keseluruhan'
                    value={values?.totalWorkingPeriod || []}
                    onChange={(val) => {
                      setFieldValue('totalWorkingPeriod', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={workingPeriodOptions}
                    name='gradeWorkingPeriod'
                    placeholder='Pilih Masa Kerja Golongan'
                    multiple={true}
                    label='Masa Kerja Golongan'
                    value={values?.gradeWorkingPeriod || []}
                    onChange={(val) => {
                      setFieldValue('gradeWorkingPeriod', val || [], false)
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                fontSize='12'
                color='#895700'
                fontWeight='700'
                sx={{
                  marginTop: '20px'
                }}
              >
                Filter SKP
              </Typography>
              <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

              <Grid container direction='row' spacing={3} rowSpacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={periodOptions}
                    name='assessmentPeriod'
                    placeholder='Pilih Periode Penilaian'
                    multiple={true}
                    label='Periode Penilaian'
                    value={values?.assessmentPeriod || []}
                    onChange={(val) => {
                      setFieldValue('assessmentPeriod', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Input
                    label='Tahun'
                    placeholder='Masukkan Tahun'
                    name='skpYear'
                    value={values?.skpYear}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('skpYear', val, false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={ratingOptions}
                    name='workBehaviorRating'
                    placeholder='Pilih Rating Perilaku Kerja'
                    multiple={true}
                    label='Rating Perilaku Kerja'
                    value={values?.workBehaviorRating || []}
                    onChange={(val) => {
                      setFieldValue('workBehaviorRating', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={predicateOptions}
                    name='employeePerformancePredicate'
                    placeholder='Pilih Predikat Kinerja Pegawai'
                    multiple={true}
                    label='Predikat Kinerja Pegawai'
                    value={values?.employeePerformancePredicate || []}
                    onChange={(val) => {
                      setFieldValue('employeePerformancePredicate', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    options={ratingOrganizationOptions}
                    name='organizationalPerformanceAchievements'
                    placeholder='Pilih Capaian Kinerja Organisasi'
                    multiple={true}
                    label='Capaian Kinerja Organisasi'
                    value={values?.organizationalPerformanceAchievements || []}
                    onChange={(val) => {
                      setFieldValue('organizationalPerformanceAchievements', val || [], false)
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ padding: 2 }}>
              <Typography fontSize='12' color='#895700' fontWeight='700'>
                Jenis File Export
              </Typography>
              <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.output === 'CSV'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'CSV', false)
                          } else {
                            setFieldValue('output', null, false)
                          }
                        }}
                      />
                    }
                    label='CSV'
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.output === 'XLSX'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'XLSX', false)
                          } else {
                            setFieldValue('output', null, false)
                          }
                        }}
                      />
                    }
                    label='XLSX'
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.output === 'PDF'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'PDF', false)
                          } else {
                            setFieldValue('output', null, false)
                          }
                        }}
                      />
                    }
                    label='PDF'
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ padding: 2 }}>
              <Typography
                fontSize='12'
                color='#895700'
                fontWeight='700'
              >
                Hasil Export Data
              </Typography>
              <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

              {checkboxes?.map((parent, idx) => (
                <Box
                  key={uuidv4()}
                  sx={{
                    border: '1px solid #000',
                    borderRadius: 1,
                    padding: '0px 6px',
                    marginTop: idx > 0 ? '12px' : ''
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontWeight='700'>{parent?.title}</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={parent?.checkbox}
                          checked={values[parent?.checkbox]}
                          onChange={(e) => {
                            const checked = e?.target?.checked

                            if (checked) {
                              const allItems = parent?.children?.map(i => i?.name)
                              setFieldValue('checkboxes', allItems, false)
                            } else {
                              setFieldValue('checkboxes', [], false)
                            }

                            setFieldValue(parent?.checkbox, checked, false)
                          }}
                        />
                      }
                      label='Pilih Semua'
                    />
                  </Box>

                  <Grid container>
                    {parent?.children?.map((item) => (
                      <Grid
                        item
                        key={uuidv4()}
                        xs={4}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={item?.name}
                              checked={values?.checkboxes.includes(item?.name)}
                              onChange={(e) => {
                                const checked = e?.target?.checked

                                if (checked) {
                                  setFieldValue(`checkboxes`, [...values?.checkboxes, item?.name], false)
                                } else {
                                  const filterCheckboxes = values?.checkboxes?.filter(i => i !== item?.name)
                                  setFieldValue(`checkboxes`, filterCheckboxes, false)
                                }
                              }}
                            />
                          }
                          label={item?.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}

              <MuiButton
                component='label'
                color='sidatukDraweBase'
                variant='contained'
                onClick={togglePreview}
                sx={{ textTransform: 'none', marginTop: 3 }}
              >
                Lihat Preview
              </MuiButton>
            </Paper>
          </LayoutPages>

          {showPreview && (
            <LayoutPages>
              <Paper>
                <Table
                  divider
                  title='Preview Data'
                  columns={columns}
                  rows={rows}
                  pagination={exportEmployeeData?.pagination}
                  handlePagination={onPaginationChange}
                  handleRows={onRowsPerPageChange}
                />
              </Paper>
            </LayoutPages>
          )}
        </Box>
      )}
    </Formik>
  )
}

ExportEmployeeComponent.propTypes = {
  echelon: PropTypes.object,
  grade: PropTypes.object,
  exportEmployeeData: PropTypes.object,
  onLoading: PropTypes.func,
  clearExportEmployeesState: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default ExportEmployeeComponent
