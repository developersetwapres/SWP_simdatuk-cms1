/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import ExportDrfForm from './ExportDrfForm'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  deputyOptions,
  educationLevelOptions,
  employeeTypeOptions,
  genderOptions,
  maritalStatusOptions,
  positionDescOptions,
  retirementAge,
  workingPeriodOptions
} from 'libs/types/options'
import { SaveAs, saveFile } from '@/utils/fileSaver'
import { dateTimeFormat } from '@/utils/index'

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
  maritalStatus: [],
  totalWorkingTime: [],
  gradeWorkingTime: []
}

const FormSchema = Yup.object().shape({
  age: Yup.object().shape({
    min: Yup.string()
      .nullable()
      .test('min', 'Umur minimal tidak boleh kosong', function (value) {
        const { max } = this.parent
        if (max && !value) return false
        return true
      }),
    max: Yup.string()
      .nullable()
      .test('max', 'Umur maksimal tidak boleh kosong', function (value) {
        const { min } = this.parent
        if (min && !value) return false
        return true
      })
  })
})

const ExportDrhComponent = ({
  exportDRHData,
  echelon,
  grade,
  exportDRH = () => { },
  clearExportDrhState = () => { },
  onLoading = () => { }
}) => {
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEchelon =
      (echelon?.options && echelon?.options.map((itm) => itm?.name)) || []
    const newGrade =
      (grade?.options && grade?.options.map((itm) => itm?.name)) || []

    const data = {
      employeeType: employeeTypeOptions,
      gender: genderOptions,
      educationHistory: educationLevelOptions,
      maritalStatus: maritalStatusOptions,
      deputy: deputyOptions,
      echelon: newEchelon,
      grade: newGrade,
      positionDesc: positionDescOptions,
      retirementAge,
      totalWorkingTime: workingPeriodOptions,
      gradeWorkingTime: workingPeriodOptions
    }

    return data
  }, [echelon, grade])

  const handleGetValueID = (type, val) => {
    if (type === 'gender') {
      return val?.map(gender => gender === 'Laki-Laki' ? 1 : 0)
    } else if (
      type === 'totalWorkingTime' ||
      type === 'gradeWorkingTime'
    ) {
      return val?.map(i => i?.replace(/ |Tahun/g, ''))
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
    } else {
      const index = options[type]
        .map((itm, idx) => {
          if (val.includes(itm)) return idx + 1
        })
        .filter((itm) => itm !== undefined)

      return index
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
        return 'job_description'
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
      default:
        return null
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        ...Object.fromEntries(
          Object.entries(values)
            .filter((itm) =>
              itm[1]?.length > 0
            )
            .map(([key, value]) => {
              const newValue = handleGetValueID(key, value)
              return [handleParseKey(key), newValue]
            })
        )
      }

      if (values?.age?.max) {
        payload.max_age = parseInt(values?.age?.max)
      }

      if (values?.age?.min) {
        payload.min_age = parseInt(values?.age?.min)
      }

      exportDRH(payload)
    } catch (err) {
      if (!err.inner || err.inner.length === 0) return

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

  const handleReset = () => {
    formikRef.current.resetForm()
  }

  const handleAction = (values) => {
    const state = Object.values(values).every((value) => {
      if (Array.isArray(value)) {
        return value.length === 0
      } else if (typeof value === 'object' && value !== null) {
        return Object.values(value).every((v) => v === '')
      } else {
        return value === ''
      }
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

  useEffect(() => {
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

      saveFile(
        exportDRHData?.data,
        getFileName(responseType),
        type
      )

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
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
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
