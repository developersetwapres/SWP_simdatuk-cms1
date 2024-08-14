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
  employeeStatusOptions,
  employeeTypeOptions,
  employeeWorkBehaviorRatingOptions,
  genderOptions,
  maritalStatusOptions,
  periodCreditsOptions,
  periodOptions,
  positionDescOptions,
  predicateOptions,
  ratingOrganizationOptions,
  religionOptions,
  retirementAge,
  workingPeriodOptions
} from 'libs/types/options'
import { v4 as uuidv4 } from 'uuid'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { blobToJSON, dateTimeFormat } from '@/utils/index'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { ACTION_RESPONSER, SET_MODAL } from '@/store/constants'

const checkboxes = [
  {
    title: 'Data Diri',
    checkbox: 'personalData',
    children: [
      { name: 'isName', label: 'Nama' },
      { name: 'isNip', label: 'NIP/NRP' },
      { name: 'isBirthPlaceDate', label: 'Tempat, Tanggal Lahir' },
      { name: 'isAge', label: 'Umur' },
      { name: 'isReligion', label: 'Agama' },
      { name: 'isGender', label: 'Jenis Kelamin' },
      { name: 'isMaritalStatus', label: 'Status Perkawinan' },
      { name: 'isEmployeeType', label: 'Jenis Pegawai' },
      { name: 'isAssistanceType', label: 'Jenis Perbantuan' },
      { name: 'isOutsourcingType', label: 'Jenis Outsourcing' },
      { name: 'isDateCPNS', label: 'TMT CPNS' },
      { name: 'isDatePNS', label: 'TMT PNS' },
      { name: 'isStartDate', label: 'Tanggal Mulai Bekerja' },
      { name: 'isEndDate', label: 'Tanggal Terakhir Bekerja' },
      { name: 'isWorkDuration', label: 'Masa Kerja Keseluruhan' },
      { name: 'isGradeDuration', label: 'Masa Kerja Golongan' },
      { name: 'isPosition', label: 'Jabatan' },
      { name: 'isDatePosition', label: 'TMT Menjabat' },
      { name: 'isEchelons', label: 'Eselon' },
      { name: 'isEchelonDate', label: 'TMT Eselon' },
      { name: 'isGrade', label: 'Golongan' },
      { name: 'isGradeDate', label: 'TMT Golongan' },
      { name: 'isAgency', label: 'Instansi Induk' },
      { name: 'isNoWorker', label: 'No. Karpeg' },
      { name: 'isKarisu', label: 'No. Karisu' },
      { name: 'isNPWP', label: 'NPWP' },
      { name: 'isEmployeeStatus', label: 'Status Pegawai' },
      { name: 'isNoFamily', label: 'No. KK' },
      { name: 'isNIK', label: 'No. NIK' },
      { name: 'isComplex', label: 'Nama Komplek' },
      { name: 'isCurrentAddress', label: 'Alamat Tempat Tinggal Saat Ini' },
      { name: 'isHomeNumber', label: 'No. Telepon Rumah' },
      { name: 'isPhoneNumber', label: 'No. HP' },
      { name: 'isOfficeAddress', label: 'Alamat Kantor' },
      { name: 'isOfficeNumber', label: 'No. Telepon Kantor' },
      { name: 'isEmail', label: 'Email' },
      { name: 'isOfficeEmail', label: 'Email Dinas' },
      { name: 'isPositionDescription', label: 'Keterangan' },
      { name: 'isEmergencyContact', label: 'Kontak Darurat' },
      { name: 'isPensionCap', label: 'Batas Usia Pensiun' }
    ]
  },
  {
    title: 'Data Riwayat',
    checkbox: 'historyData',
    children: [
      { name: 'isEducationHistory', label: 'Riwayat Pendidikan' },
      { name: 'isPositionHistory', label: 'Riwayat Jabatan' },
      { name: 'isGradeHistory', label: 'Riwayat Golongan' },
      { name: 'isTrainingStructural', label: 'Riwayat Pelatihan Struktural' },
      { name: 'isTrainingFunctional', label: 'Riwayat Pelatihan Fungsional' },
      { name: 'isTrainingTechnique', label: 'Riwayat Pelatihan Teknis' },
      { name: 'isRecognition', label: 'Riwayat Penghargaan' },
      { name: 'isSKP', label: 'Riwayat SKP' },
      { name: 'isCredit', label: 'Riwayat Penetapan Angka Kredit Terakhir' },
      { name: 'isPerformance', label: 'Riwayat Penilaian Prestasi Kerja' },
      { name: 'isDisciplinary', label: 'Riwayat Hukuman Disiplin' },
      { name: 'isFamilyHistory', label: 'Keluarga' },
      { name: 'isLeave', label: 'Cuti' },
      { name: 'isNotes', label: 'Catatan' },
      { name: 'isAssessment', label: 'Hasil Assessment' },
      { name: 'isCompetency', label: 'Hasil Uji Kompetensi' },
      { name: 'isTalentPool', label: 'Hasil Talent Pool' }
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
  retirementYear: null,
  totalWorkingPeriod: null,
  gradeWorkingPeriod: null,
  employeeStatus: null,
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
  onLoading = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {},
  exportEmployees = () => {},
  exportEmployeesPreview = () => {},
  clearExportEmployeesState = () => {}
}) => {
  const formikRef = useRef()
  const dispatch = useDispatch()
  const [showPreview, setShowPreview] = useState(false)

  const convertKeyToPayload = (key) => {
    if (key === 'employeeType') return 'employee_type'

    if (key === 'echelon') return 'echelons'

    if (key === 'grade') return 'grades'

    if (key === 'positionDescription') return 'position_status'

    if (key === 'minAge') return 'min_age'

    if (key === 'maxAge') return 'max_age'

    if (key === 'maritalStatus') return 'marital_status'

    if (key === 'retirementLimitAge') return 'retirement_age'

    if (key === 'gradeWorkingPeriod') return 'grade_range'

    if (key === 'totalWorkingPeriod') return 'total_working_duration'

    if (key === 'assessmentPeriod') return 'target_period'

    if (key === 'skpYear') return 'target_year'

    if (key === 'workBehaviorRating') return 'work_behavior_rating'

    if (key === 'employeePerformancePredicate')
      return 'employee_performance_predicate'

    if (key === 'organizationalPerformanceAchievements')
      return 'organizational_performance_achievement'

    if (key === 'creditPeriod') return 'credit_period'

    if (key === 'creditYear') return 'credit_year'

    if (key === 'retirementYear') return 'retirement_year'

    if (key === 'employeeStatus') return 'employment_status'

    return key
  }

  const togglePreview = (values) => {
    if (!showPreview) {
      exportEmployeesPreview(getPayloadFromValues(values))
    } else {
      setShowPreview(false)
    }
  }

  const formKeyToOptionsKey = (key) => {
    if (key === 'employeeType') return 'employeeTypes'

    if (key === 'deputy') return 'deputies'

    if (key === 'positionDescription') return 'positionDescriptions'

    if (key === 'education') return 'educations'

    if (key === 'gender') return 'genders'

    if (key === 'maritalStatus') return 'maritalStatuses'

    if (key === 'retirementLimitAge') return 'retirementAges'

    if (key === 'totalWorkingPeriod' || key === 'gradeWorkingPeriod')
      return 'workingPeriods'

    if (key === 'assessmentPeriod') return 'periods'

    if (key === 'workBehaviorRating') return 'workBehaviors'

    if (key === 'employeeStatus') return 'employeeStatuses'

    if (key === 'employeePerformancePredicate') return 'workPredicates'

    if (key === 'organizationalPerformanceAchievements')
      return 'organizationalPerformances'

    if (key === 'creditPeriod') return 'creditPeriods'

    return ''
  }

  const getIDsByType = (key, value) => {
    if (key === 'assessmentPeriod' || key === 'retirementLimitAge') return value

    if (key === 'deputy') {
      const databaseIDStart = 37
      return value?.map((val) => {
        return (
          options[formKeyToOptionsKey(key)].findIndex((item) => item === val) +
          databaseIDStart
        )
      })
    }

    if (key === 'gradeWorkingPeriod' || key === 'totalWorkingPeriod') {
      return value?.map((i) => i?.replace(/[a-zA-Z\s]/g, ''))
    }

    if (key === 'gender') {
      return value?.map((g) => (g === 'Laki-Laki' ? 1 : 0))
    }

    if (key === 'echelon') {
      return echelon?.options
        ?.filter((item) => value?.includes(item?.name))
        ?.map((item) => item?.id)
    }

    if (key === 'grade') {
      return grade?.options
        ?.filter((item) => value?.includes(item?.name))
        ?.map((item) => item?.id)
    }

    if (Array.isArray(value)) {
      return value?.map((val) => {
        return (
          options[formKeyToOptionsKey(key)].findIndex((item) => item === val) +
          1
        )
      })
    }

    if (key === 'retirementYear') {
      return moment(value)?.format('YYYY')?.toString()
    }

    return value
  }

  const getPayloadFromValues = (values) => {
    const payload = {}

    Object.entries(values)
      .filter(
        ([key, value]) =>
          // Excludes unecessary items
          typeof value !== 'boolean' && key !== 'output'
      )
      .forEach(([key, value]) => {
        // Mapping checkboxes
        if (key === 'checkboxes') {
          value?.forEach((item) => {
            payload[item] = 1
          })
        } else if (Array.isArray(value) && value?.length > 0) {
          payload[convertKeyToPayload(key)] = getIDsByType(key, value)
        } else if (!!value && !Array.isArray(value)) {
          payload[convertKeyToPayload(key)] = getIDsByType(key, value)
        }
      })

    return payload
  }

  const canExport = (payload) => {
    if (!Object.values(payload)?.length) return false

    return Object.values(payload).every((i) => {
      if (Array.isArray(i)) return i?.length > 0

      return !!i
    })
  }

  const exportFile = (values) => {
    const payload = getPayloadFromValues(values)

    exportEmployees({
      type: values?.output,
      data: payload
    })
  }

  const options = useMemo(() => {
    return {
      employeeTypes: employeeTypeOptions,
      deputies: deputyOptions,
      positionDescriptions: positionDescOptions,
      educations: employeeEducationLevelOptions,
      genders: genderOptions,
      maritalStatuses: maritalStatusOptions,
      retirementAges: retirementAge,
      workingPeriods: workingPeriodOptions,
      periods: periodOptions,
      workBehaviors: employeeWorkBehaviorRatingOptions,
      workPredicates: predicateOptions,
      creditPeriods: periodCreditsOptions,
      organizationalPerformances: ratingOrganizationOptions,
      employeeStatuses: employeeStatusOptions,
      echelons: echelon?.options?.map((e) => e?.name) || [],
      grades: grade?.options?.map((e) => e?.name) || [],
      // Only For Response
      employeeStatusOptions: employeeStatusOptions,
      religionOptions: religionOptions
    }
  }, [echelon])

  const getFileName = (type) => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'DATA_PEGAWAI_'
    let ext = '.pdf'

    if (type?.includes('pdf')) {
      ext = '.pdf'
    } else if (type?.includes('sheet')) {
      ext = '.xlsx'
    } else {
      ext = '.csv'
    }

    return prefix + dateNow + ext
  }

  const getLabeledCheckboxes = (values) => {
    const cols = [
      {
        Header: 'No',
        width: 200,
        align: 'left'
      },
      ...checkboxes
        .flatMap((item) => item?.children)
        .filter((item) => values?.checkboxes?.includes(item?.name))
        .map((item) => ({
          Header: item?.label,
          width: 200,
          align: 'left'
        }))
    ]

    return cols
  }

  const getRows = (values) => {
    if (!exportEmployeeData?.preview) return []

    return exportEmployeeData?.preview?.data?.map((data, index) => {
      const currentPage =
        exportEmployeeData?.preview?.pagination?.current_page - 1

      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{currentPage * 10 + index + 1}</Typography>
        },
        ...checkboxes
          .flatMap((item) => item?.children)
          .filter((item) => values?.checkboxes?.includes(item?.name))
          .map((item) => ({
            Header: item?.label,
            align: 'left',
            verticalAlign: 'top',
            Cell: () => <Typography>{getRowItem(item?.label, data)}</Typography>
          }))
      ]
    })
  }

  const getRowItem = (label, response) => {
    const excludeTag = (val) => {
      return val.replace(/<\/?[^>]+(>|$)/g, '')
    }

    if (label === 'Nama') {
      return response?.name || '-'
    }

    if (label === 'NIP/NRP') {
      return `${response?.employee_id_number || '-'}/${
        response?.employee_registration_number || '-'
      }`
    }

    if (label === 'Tempat, Tanggal Lahir') {
      return `${response?.place_of_birth || '-'}, ${
        response?.date_of_birth || '-'
      }`
    }

    if (label === 'Tempat, Tanggal Lahir') {
      return `${response?.place_of_birth || '-'}, ${
        response?.date_of_birth || '-'
      }`
    }

    if (label === 'Umur') {
      return response?.age || '-'
    }

    if (label === 'Agama') {
      return options?.religionOptions[response?.religion - 1]
    }

    if (label === 'Jenis Kelamin') {
      return response?.gender === 1 ? 'Laki-Laki' : 'Perempuan'
    }

    if (label === 'Status Perkawinan') {
      return options.maritalStatuses[response?.maritalStatus - 1]
    }

    if (label === 'Jenis Pegawai') {
      return response?.employee_type ? excludeTag(response?.employee_type) : '-'
    }

    if (label === 'Jenis Perbantuan') {
      return response?.assistance_type
        ? excludeTag(response?.assistance_type)
        : '-'
    }

    if (label === 'Jenis Outsourcing') {
      return response?.outsource_type
        ? excludeTag(response?.outsource_type)
        : '-'
    }

    if (label === 'TMT CPNS') {
      return response?.cpns_effective_date || '-'
    }

    if (label === 'TMT PNS') {
      return response?.pns_effective_date || '-'
    }

    if (label === 'Tanggal Mulai Bekerja') {
      return response?.start_date || '-'
    }

    if (label === 'Tanggal Terakhir Bekerja') {
      return response?.retirement_effective_date || '-'
    }

    if (label === 'Masa Kerja Keseluruhan') {
      return `${response?.years_of_service_total || 0} Tahun, ${
        response?.month_of_service_total || 0
      } Bulan`
    }

    if (label === 'Masa Kerja Golongan') {
      return `${response?.years_of_service_rank || 0} Tahun, ${
        response?.month_of_service_rank || 0
      } Bulan`
    }

    if (label === 'Jabatan') {
      return response?.position_name || '-'
    }

    if (label === 'TMT Menjabat') {
      return response?.position_effective_date || '-'
    }

    if (label === 'Eselon') {
      return response?.echelons_name || '-'
    }

    if (label === 'TMT Eselon') {
      return response?.echelon_effective_date || '-'
    }

    if (label === 'Golongan') {
      return response?.grade_name || '-'
    }

    if (label === 'TMT Golongan') {
      return response?.grade_effective_date || '-'
    }

    if (label === 'Instansi Induk') {
      return response?.institution_name || '-'
    }

    if (label === 'No. Karpeg') {
      return response?.employee_id_card_number || '-'
    }

    if (label === 'No. Karisu') {
      return response?.karisu_number || '-'
    }

    if (label === 'NPWP') {
      return response?.id_tax || '-'
    }

    if (label === 'Status Pegawai') {
      return options.employeeStatusOptions[response?.employment_status - 1]
    }

    if (label === 'No. KK') {
      return response?.family_registration_number || '-'
    }

    if (label === 'No. NIK') {
      return response?.id_number || '-'
    }

    if (label === 'Nama Komplek') {
      return response?.residence_name || '-'
    }

    if (label === 'Alamat Tempat Tinggal Saat Ini') {
      return response?.current_address || '-'
    }

    if (label === 'No. Telepon Rumah') {
      return response?.home_phone_number || '-'
    }

    if (label === 'No. HP') {
      return response?.mobile_phone || '-'
    }

    if (label === 'Alamat Kantor') {
      return response?.office_address || '-'
    }

    if (label === 'No. Telepon Kantor') {
      return response?.office_phone_number || '-'
    }

    if (label === 'Email') {
      return response?.email || '-'
    }

    if (label === 'Email Dinas') {
      return response?.office_email || '-'
    }

    if (label === 'Keterangan') {
      return response?.description || '-'
    }

    if (label === 'Kontak Darurat') {
      return response?.emergency_contact || '-'
    }

    if (label === 'Batas Usia Pensiun') {
      return response?.pension_cap || '-'
    }

    // Riwayat

    if (label === 'Riwayat Pendidikan') {
      return <RenderHTMLList html={response?.education_history} />
    }

    if (label === 'Riwayat Jabatan') {
      return <RenderHTMLList html={response?.position_history} />
    }

    if (label === 'Riwayat Golongan') {
      return <RenderHTMLList html={response?.grade_history} />
    }

    if (label === 'Riwayat Pelatihan Fungsional') {
      return <RenderHTMLList html={response?.functional_training_history} />
    }

    if (label === 'Riwayat Pelatihan Teknis') {
      return <RenderHTMLList html={response?.technique_training_history} />
    }

    if (label === 'Riwayat Penghargaan') {
      return <RenderHTMLList html={response?.recognition_history} />
    }

    if (label === 'Riwayat SKP') {
      return <RenderHTMLList html={response?.skp_history} />
    }

    if (label === 'Riwayat Penetapan Angka Kredit Terakhir') {
      return <RenderHTMLList html={response?.credit_history} />
    }

    if (label === 'Riwayat Penilaian Prestasi Kerja') {
      return <RenderHTMLList html={response?.performance_history} />
    }

    if (label === 'Riwayat Hukuman Disiplin') {
      return <RenderHTMLList html={response?.disciplinary_history} />
    }

    if (label === 'Keluarga') {
      return <RenderHTMLList html={response?.family_history} />
    }

    if (label === 'Catatan') {
      return <RenderHTMLList html={response?.notes} />
    }

    if (label === 'Hasil Assessment') {
      return <RenderHTMLList html={response?.assessment_history} />
    }

    if (label === 'Hasil Uji Kompetensi') {
      return <RenderHTMLList html={response?.competency_history} />
    }

    if (label === 'Hasil Talent Pool') {
      return <RenderHTMLList html={response?.talent_pool_history} />
    }

    return '-'
  }

  const showErrorModal = async (errorBlob) => {
    const errors = await blobToJSON(errorBlob)

    if ([401, 403]?.includes(errors?.code)) {
      dispatch({
        type: ACTION_RESPONSER,
        payload: {
          code: errors?.code,
          message: errors?.message,
          redirect: '/profile'
        }
      })
    } else {
      dispatch({
        type: SET_MODAL,
        payload: {
          code: errors?.code,
          message: errors?.message || 'Terjadi Kesalahan'
        }
      })
    }
  }

  useEffect(() => {
    // PREVIEW
    if (exportEmployeeData?.preview?.data?.length > 0) {
      setShowPreview(true)
    }

    // EXPORT FILE
    if (exportEmployeeData?.employees) {
      const responseType = exportEmployeeData?.employees?.type
      let type = SaveAs.PDF

      if (responseType?.includes('pdf')) {
        type = SaveAs.PDF
      } else if (responseType?.includes('sheet')) {
        type = SaveAs.XLS
      } else {
        type = SaveAs.CSV
      }

      saveFile(exportEmployeeData?.employees, getFileName(responseType), type)

      clearExportEmployeesState()
    }

    // EXPORT FAILED
    if (exportEmployeeData?.error) {
      showErrorModal(exportEmployeeData?.error)
      clearExportEmployeesState()
    }
  }, [exportEmployeeData])

  useEffect(() => {
    const state = !(
      exportEmployeeData?.loading ||
      echelon?.loading ||
      grade?.loading
    )
    onLoading(state)
  }, [grade, echelon, exportEmployeeData])

  return (
    <Formik innerRef={formikRef} initialValues={InitValue} onSubmit={() => {}}>
      {({ values, resetForm = () => {}, setFieldValue = () => {} }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LayoutPages
            summary='Export Pegawai'
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  text='Reset'
                  color='danger'
                  onClick={() => resetForm()}
                  isBusy={
                    !values?.output || !canExport(getPayloadFromValues(values))
                  }
                />
                <Button
                  text='Export'
                  onClick={() => exportFile(values)}
                  isBusy={
                    !values?.output || !canExport(getPayloadFromValues(values))
                  }
                />
              </Box>
            }
          >
            <Paper sx={{ padding: 2 }}>
              <Typography fontSize='12' color='#895700' fontWeight='700'>
                Filter Data
              </Typography>
              <Divider
                sx={{ border: '1px solid #929292', margin: '10px 0px' }}
              />

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
                  <DatepickerYear
                    isClear
                    label='Tahun Usia Pensiun'
                    placeholder='Pilih Tahun Usia Pensiun'
                    name='retirementYear'
                    value={values?.retirementYear}
                    onChange={(val) => {
                      setFieldValue(`retirementYear`, val, false)
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

                <Grid item xs={6}>
                  <Autocomplete
                    options={employeeStatusOptions}
                    name='employeeStatus'
                    placeholder='Pilih Status Pegawai'
                    multiple={true}
                    label='Status Pegawai'
                    value={values?.employeeStatus || []}
                    onChange={(val) => {
                      setFieldValue('employeeStatus', val || [], false)
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
              <Divider
                sx={{ border: '1px solid #929292', margin: '10px 0px' }}
              />

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
                    options={employeeWorkBehaviorRatingOptions}
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
                      setFieldValue(
                        'employeePerformancePredicate',
                        val || [],
                        false
                      )
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
                      setFieldValue(
                        'organizationalPerformanceAchievements',
                        val || [],
                        false
                      )
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                fontSize='12'
                color='#895700'
                fontWeight='700'
                sx={{ marginTop: '20px' }}
              >
                Filter Angka Kredit Terakhir
              </Typography>
              <Divider
                sx={{ border: '1px solid #929292', margin: '10px 0px' }}
              />

              <Grid container direction='row' spacing={3} rowSpacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={periodCreditsOptions}
                    name='creditPeriod'
                    placeholder='Pilih Periode'
                    multiple={true}
                    label='Periode'
                    value={values?.creditPeriod || []}
                    onChange={(val) => {
                      setFieldValue('creditPeriod', val || [], false)
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Input
                    label='Tahun'
                    placeholder='Masukkan Tahun'
                    name='creditYear'
                    value={values?.creditYear}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('creditYear', val, false)
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ padding: 2 }}>
              <Typography fontSize='12' color='#895700' fontWeight='700'>
                Jenis File Export
              </Typography>
              <Divider
                sx={{ border: '1px solid #929292', margin: '10px 0px' }}
              />
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.output === 'csv'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'csv', false)
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
                        checked={values?.output === 'xlsx'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'xlsx', false)
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
                        checked={values?.output === 'pdf'}
                        onChange={(e) => {
                          const val = e?.target?.checked
                          if (val) {
                            setFieldValue('output', 'pdf', false)
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
              <Typography fontSize='12' color='#895700' fontWeight='700'>
                Hasil Export Data
              </Typography>
              <Divider
                sx={{ border: '1px solid #929292', margin: '10px 0px' }}
              />

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
                            const allItems = parent?.children?.map(
                              (i) => i?.name
                            )

                            if (checked) {
                              setFieldValue(
                                'checkboxes',
                                [...values?.checkboxes, ...allItems],
                                false
                              )
                            } else {
                              const itemsPerSection =
                                values?.checkboxes?.filter(
                                  (i) => !allItems?.includes(i)
                                )

                              setFieldValue(
                                'checkboxes',
                                itemsPerSection,
                                false
                              )
                            }

                            setShowPreview(false)
                            setFieldValue(parent?.checkbox, checked, false)
                          }}
                        />
                      }
                      label='Pilih Semua'
                    />
                  </Box>

                  <Grid container>
                    {parent?.children?.map((item) => (
                      <Grid item key={uuidv4()} xs={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={item?.name}
                              checked={values?.checkboxes.includes(item?.name)}
                              onChange={(e) => {
                                const checked = e?.target?.checked

                                if (checked) {
                                  setFieldValue(
                                    `checkboxes`,
                                    [...values?.checkboxes, item?.name],
                                    false
                                  )
                                } else {
                                  // Uncheck the select all
                                  setFieldValue(parent?.checkbox, false, false)
                                  // Individual children checkboxes
                                  const filterCheckboxes =
                                    values?.checkboxes?.filter(
                                      (i) => i !== item?.name
                                    )
                                  setFieldValue(
                                    `checkboxes`,
                                    filterCheckboxes,
                                    false
                                  )
                                }

                                setShowPreview(false)
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
                onClick={() => togglePreview(values)}
                sx={{ textTransform: 'none', marginTop: 3 }}
                disabled={values?.checkboxes?.length < 1}
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
                  columns={getLabeledCheckboxes(values)}
                  rows={getRows(values)}
                  pagination={exportEmployeeData?.preview?.pagination}
                  handlePagination={(page) =>
                    onPaginationChange(page, getPayloadFromValues(values))
                  }
                  handleRows={(page) =>
                    onRowsPerPageChange(page, getPayloadFromValues(values))
                  }
                />
              </Paper>
            </LayoutPages>
          )}
        </Box>
      )}
    </Formik>
  )
}

const RenderHTMLList = (data) => {
  if (!data?.html) return '-'

  return (
    <Box>
      <div dangerouslySetInnerHTML={{ __html: `<ol>${data?.html}</ol>` }} />
    </Box>
  )
}

ExportEmployeeComponent.propTypes = {
  echelon: PropTypes.object,
  grade: PropTypes.object,
  exportEmployeeData: PropTypes.object,
  onLoading: PropTypes.func,
  clearExportEmployeesState: PropTypes.func,
  exportEmployees: PropTypes.func,
  exportEmployeesPreview: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default ExportEmployeeComponent
