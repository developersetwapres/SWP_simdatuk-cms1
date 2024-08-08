/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import ExportDrfForm from './ExportDrfForm'
import { Formik } from 'formik'
import {
  deputyOptions,
  employeeEducationLevelOptions,
  employeeStatusOptions,
  employeeTypeOptions,
  genderOptions,
  maritalStatusOptions,
  positionDescOptions,
  retirementAge,
  workingPeriodOptions
} from 'libs/types/options'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { blobToJSON, dateTimeFormat } from '@/utils/index'
import { useDispatch } from 'react-redux'
import { ACTION_RESPONSER, SET_MODAL } from '@/store/constants'
import moment from 'moment/moment'

const InitValue = {
  organization: [],
  employeeType: [],
  deputy: [],
  echelon: [],
  grade: [],
  positionDesc: [],
  educationHistory: [],
  gender: [],
  age: { min: '', max: '' },
  retirementAge: [],
  retirementYear: null,
  maritalStatus: [],
  totalWorkingTime: [],
  gradeWorkingTime: [],
  employeeStatus: []
}

const ExportDrhComponent = ({
  exportDRHData,
  echelon,
  grade,
  exportDRH = () => {},
  clearExportDrhState = () => {},
  onLoading = () => {}
}) => {
  const dispatch = useDispatch()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEchelon =
      (echelon?.options && echelon?.options.map((itm) => itm?.name)) || []
    const newGrade =
      (grade?.options && grade?.options.map((itm) => itm?.name)) || []

    const data = {
      employeeType: employeeTypeOptions,
      gender: genderOptions,
      educationHistory: employeeEducationLevelOptions,
      maritalStatus: maritalStatusOptions,
      deputy: deputyOptions,
      echelon: newEchelon,
      grade: newGrade,
      positionDesc: positionDescOptions,
      retirementAge,
      totalWorkingTime: workingPeriodOptions,
      gradeWorkingTime: workingPeriodOptions,
      employeeStatus: employeeStatusOptions
    }

    return data
  }, [echelon, grade])

  const handleGetValueID = (type, val) => {
    if (type === 'deputy') {
      const databaseIDStart = 37
      return val?.map((i) => {
        return options[type]?.findIndex((item) => item === i) + databaseIDStart
      })
    } else if (type === 'gender') {
      return val?.map((gender) => (gender === 'Laki-Laki' ? 1 : 0))
    } else if (type === 'totalWorkingTime' || type === 'gradeWorkingTime') {
      return val?.map((i) => i?.replace(/ |Tahun/g, ''))
    } else if (type == 'echelon') {
      const item = echelon?.options
        .filter((itm) => val.includes(itm?.name))
        .map((itm) => itm?.id)

      return item
    } else if (type == 'grade') {
      const item = grade?.options
        .filter((itm) => val.includes(itm?.name))
        .map((itm) => itm?.id)

      return item
    } else if (type == 'retirementAge') {
      return val
    } else {
      return val?.map((i) => {
        return options[type]?.findIndex((item) => item === i) + 1
      })
    }
  }

  const handleParseKey = (val) => {
    switch (val) {
      case 'organization':
        return 'organization'
      case 'employeeType':
        return 'employee_type'
      case 'deputy':
        return 'deputy'
      case 'echelon':
        return 'echelons'
      case 'grade':
        return 'grades'
      case 'positionDesc':
        return 'position_status'
      case 'educationHistory':
        return 'education'
      case 'gender':
        return 'gender'
      case 'age':
        return 'age'
      case 'retirementAge':
        return 'retirement_age'
      case 'maritalStatus':
        return 'marital_status'
      case 'totalWorkingTime':
        return 'total_working_duration'
      case 'gradeWorkingTime':
        return 'grade_range'
      case 'employeeStatus':
        return 'employment_status'
      case 'returementYear':
        return 'retirement_year'
      default:
        return null
    }
  }

  const handleSubmit = async (values) => {
    const payload = {
      ...Object.fromEntries(
        Object.entries(values)
          .filter((itm) => itm[1]?.length > 0)
          .map(([key, value]) => {
            const newValue = handleGetValueID(key, value)
            return [handleParseKey(key), newValue]
          })
      )
    }

    if (values?.retirementYear) {
      payload.retirement_year = moment(values?.retirementYear).format('YYYY')
    }

    if (values?.age?.max) {
      payload.max_age = parseInt(values?.age?.max)
    }

    if (values?.age?.min) {
      payload.min_age = parseInt(values?.age?.min)
    }

    exportDRH(payload)
  }

  const handleReset = () => {
    formikRef.current.resetForm()
  }

  const handleAction = (values) => {
    const state = Object.values(values).every((value) => {
      if (value instanceof Date) return value === null

      if (Array.isArray(value)) return value.length === 0

      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every((v) => v === '')
      }

      if (value === null) return true

      return false
    })

    return state
  }

  const getFileName = (type) => {
    const dateNow = dateTimeFormat(new Date())?.replace(' ', '_')
    const prefix = 'DATA_DRH_'
    let ext = '.pdf'

    if (type?.includes('pdf')) {
      ext = '.pdf'
    } else if (type?.includes('sheet')) {
      ext = '.xlsx'
    } else if (type?.includes('zip')) {
      ext = '.zip'
    } else {
      ext = '.csv'
    }

    return prefix + dateNow + ext
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
    // EXPORT
    if (exportDRHData?.data) {
      const responseType = exportDRHData?.data?.type
      let type = SaveAs.PDF

      if (responseType?.includes('pdf')) {
        type = SaveAs.PDF
      } else if (responseType?.includes('sheet')) {
        type = SaveAs.XLS
      } else if (responseType?.includes('zip')) {
        type = SaveAs.ZIP
      } else {
        type = SaveAs.CSV
      }

      saveFile(exportDRHData?.data, getFileName(responseType), type)

      clearExportDrhState()
    }
    // EXPORT FAILED
    if (exportDRHData?.error) {
      showErrorModal(exportDRHData?.error)
      clearExportDrhState()
    }
  }, [exportDRHData])

  useEffect(() => {
    const state = !(
      echelon?.loading ||
      grade?.loading ||
      exportDRHData?.loading
    )
    onLoading(state)
  }, [echelon, grade, exportDRHData])

  return (
    <Formik innerRef={formikRef} initialValues={InitValue} onSubmit={() => {}}>
      {(formikProps) => (
        <LayoutPages
          summary='Export DRH'
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                text='Reset'
                color='danger'
                sx={{ width: '65px', height: '43px' }}
                isBusy={handleAction(formikProps?.values)}
                onClick={handleReset}
              />
              <Button
                text='Export'
                sx={{ width: '65px', height: '43px' }}
                isBusy={handleAction(formikProps?.values)}
                onClick={() => handleSubmit(formikProps?.values)}
              />
            </Box>
          }
        >
          <Card>
            <ExportDrfForm options={options} {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}
ExportDrhComponent.propTypes = {
  echelon: PropTypes.object,
  grade: PropTypes.object,
  exportDRHData: PropTypes.object,
  exportDRH: PropTypes.func,
  clearExportDrhState: PropTypes.func,
  onLoading: PropTypes.func
}

export default ExportDrhComponent
