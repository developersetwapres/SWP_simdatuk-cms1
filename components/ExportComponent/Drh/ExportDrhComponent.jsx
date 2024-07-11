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
import { deputyOptions, retirementAge, workingPeriodOptions } from 'libs/types/options'

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
  onLoading = () => { }
}) => {
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEchelon =
      (echelon?.options && echelon?.options.map((itm) => itm?.name)) || []
    const newGrade =
      (grade?.options && grade?.options.map((itm) => itm?.name)) || []

    const data = {
      employeeType: ['ASN', 'Non ASN', 'Outsourcing'],
      gender: ['Laki-Laki', 'Perempuan'],
      educationHistory: [
        'SD/Sederajat',
        'SLTP/Sederajat',
        'SLTA/Sederajat',
        'Akademik/D3/S.Muda',
        'Diploma IV',
        'Strata I',
        'Strata II',
        'Strata III'
      ],
      maritalStatus: ['Belum Menikah', 'Menikah', 'Cerai', 'Janda', 'Duda'],
      organization: ['A', 'B', 'C'],
      deputy: deputyOptions,
      echelon: newEchelon,
      grade: newGrade,
      positionDesc: ['Mutasi', 'Promosi', 'Inpassing', 'Konversi'],
      age: [],
      retirementAge,
      totalWorkingTime: workingPeriodOptions,
      gradeWorkingTime: workingPeriodOptions
    }

    return data
  }, [echelon, grade])

  const handleGetValueID = (type, val) => {
    if (type == 'echelon') {
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
      case 'total_working_time':
        return 'total_working_time'
      case 'grade_working_time':
        return 'grade_working_time'
      default:
        return null
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = Object.fromEntries(
        Object.entries(values)
          .filter((itm) => itm[1].length > 0)
          .map((itm) => {
            const newValue = handleGetValueID(itm[0], itm[1])
            return [handleParseKey(itm[0]), newValue]
          })
      )
      console.log('PAYLOAD: ', payload)
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

  useEffect(() => {
    console.log('EXPORT: ', exportDRHData)
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
  onLoading: PropTypes.func
}

export default ExportDrhComponent
