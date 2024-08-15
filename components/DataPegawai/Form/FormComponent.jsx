/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useMemo } from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import EmployeeForm from './EmployeeForm'
import EducationForm from './EducationForm'
import FamilyForm from './FamilyForm'
import PaidLeaveForm from './PaidLeaveForm'
import NotesForm from './NotesForm'
import AssessmentForm from './AssessmentForm'
import CompetenceTestForm from './CompetenceTestForm'
import TalentPoolForm from './TalentPoolForm'
import PositionForm from './PositionForm'
import TypeForm from './TypeForm'
import StructuralTrainingForm from './StructuralTrainingForm'
import FunctionalTrainingForm from './FunctionalTrainingForm'
import TechnicalTrainingForm from './TechnicalTrainingForm'
import AwardForm from './AwardForm'
import SKPForm from './SKPForm'
import DisciplinaryForm from './DisciplinaryForm'
import PerformanceForm from './PerformanceForm'
import CreditsForm from './CreditsForm'
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
}

const FormComponent = (props) => {
  const {
    mode,
    pageType,
    formikProps,
    onGetPositionType,
    errorsForm,
    options
  } = props

  const isEdit = useMemo(() => {
    return mode == 'edit'
  }, [mode])

  const isCreditNumber = useMemo(() => {
    const positions = formikProps?.values?.employee?.positions || []
    const positionsFilter = positions.filter((itm) => itm?.name !== null)

    if (positionsFilter.length > 0 && pageType == 'ASN') {
      const index = positionsFilter.length - 1
      const item = positionsFilter[index]
      const type = onGetPositionType(item?.name, index)
      const state = type == 'fungsional'

      return state
    }

    return false
  }, [
    formikProps?.values?.employee?.positions,
    formikProps?.values,
    options?.positions
  ])

  const handleSetKeyForm = (val) => {
    switch (val) {
      case 'photo_profile':
        return 'image'
      case 'name':
        return 'name'
      case 'title_prefix':
        return 'titlePrefix'
      case 'title_suffix':
        return 'titleSuffix'
      case 'employee_id_number':
        return 'nip'
      case 'employee_registration_number':
        return 'nrp'
      case 'place_of_birth':
        return 'placeOfBirth'
      case 'date_of_birth':
        return 'dateOfBirth'
      case 'religion':
        return 'religion'
      case 'gender':
        return 'gender'
      case 'marital_status':
        return 'maritalStatus'
      case 'employment_type_id':
        return 'employmentType'
      case 'cpns_effective_date':
        return 'dateStartedWork'
      case 'position_id':
        return 'positions'
      case 'position_effective_date':
        return 'positionEffectiveDate'
      case 'grade_id':
        return 'grade'
      case 'grade_effective_date':
        return 'gradeEffectiveDate'
      case 'echelon_id':
        return 'echelon'
      case 'echelon_effective_date':
        return 'echelonEffectiveDate'
      case 'institution_id':
        return 'institution'
      case 'level':
      case 'education':
      case 'education_level':
        return 'educationLevel'
      case 'name':
      case 'education_name':
        return 'educationName'
      case 'year_of_graduation':
      case 'education_year':
        return 'educationYear'
      case 'employee_id_card_number':
        return 'employeeIdCardNumber'
      case 'employee_id_card':
        return 'employeeIdCard'
      case 'karisu_number':
        return 'karisu'
      case 'id_tax':
        return 'taxId'
      case 'employment_status':
        return 'employmentStatus'
      case 'card_number':
      case 'family_registration_number':
        return 'familyRegistNumber'
      case 'id_number':
        return 'idNumber'
      case 'residence_id':
        return 'residence'
      case 'residence_description':
        return 'residenceName'
      case 'current_address':
        return 'address'
      case 'home_phone_number':
        return 'homeTelephoneNumber'
      case 'mobile_phone':
        return 'mobilePhone'
      case 'office_address':
        return 'officeAddress'
      case 'office_phone_number':
        return 'officeTelephoneNumber'
      case 'email':
        return 'email'
      case 'office_email':
        return 'officeEmail'
      case 'emergency_contact':
        return 'emergencyContact'
      case 'description':
        return 'description'
      case 'score':
      case 'point':
        return 'point'
      case 'faculty':
        return 'educationFaculty'
      case 'major':
        return 'educationMajor'
      case 'status':
        return 'educationStatus'
      case 'degree_document':
        return 'educationCertificate'
      case 'name_of_father':
        return 'nameOfFather'
      case 'name_of_mother':
        return 'nameOfMother'
      case 'relationship_status':
        return 'relationshipStatus'
      case 'ocupation':
        return 'ocupation'
      case 'ocupation_description':
        return 'ocupationDescription'
      case 'degree_document':
        return 'educationCertificate'
      case 'sequence_number':
        return 'sequenceNumber'
      case 'start_date':
        return 'startDate'
      case 'end_date':
        return 'endDate'
      case 'type':
        return 'type'
      case 'number':
        return 'number'
      case 'leave_letter':
        return 'leaveLetter'
      case 'position':
        return 'position'
      case 'period':
        return 'period'
      case 'year':
        return 'year'
      case 'assessment_date':
        return 'date'
      case 'assessment_document':
        return 'certificate'
      case 'organizer':
        return 'organizer'
      default:
        return null
    }
  }

  const handleSetErrorsForm = (errors) => {
    const mappedErrors = {}

    Object.entries(errors).map(([key, value]) => {
      const val = value[0]
      const match = key.match(/^(\w+)(\[(\d+)\])?\.(\w+)$/)

      if (match) {
        const [_, parent, , index, child] = match

        const childName = handleSetKeyForm(child)

        if (!mappedErrors[parent]) {
          mappedErrors[parent] = index !== undefined ? [] : {}
        }

        if (index !== undefined) {
          if (!mappedErrors[parent][index]) {
            mappedErrors[parent][index] = {}
          }
          mappedErrors[parent][index][childName] = val
        } else {
          mappedErrors[parent][childName] = val
        }
      } else {
        if (!mappedErrors['employee']) {
          mappedErrors['employee'] = {}
        }
        mappedErrors['employee'][handleSetKeyForm(key)] = val
      }
    })

    formikProps.setErrors(mappedErrors)
  }

  useEffect(() => {
    if (Object.entries(errorsForm).length > 0) handleSetErrorsForm(errorsForm)
  }, [errorsForm])

  if (pageType == 'OUTSOURCING') {
    return (
      <Box sx={containerStyles}>
        {/* Employee */}
        <EmployeeForm {...props} {...formikProps} />
        {/* Education */}
        <EducationForm {...props} {...formikProps} />
        {/* Notes */}
        <NotesForm {...props} {...formikProps} />
      </Box>
    )
  }

  return (
    <Box sx={containerStyles}>
      {/* Employee */}
      <EmployeeForm {...props} {...formikProps} />
      {/* Education */}
      <EducationForm {...props} {...formikProps} />

      {isEdit && (
        <>
          {/* Position */}
          <PositionForm {...props} {...formikProps} />
          {/* Type/Grade */}
          <TypeForm {...props} {...formikProps} />
          {/* Structural Training */}
          <StructuralTrainingForm {...props} {...formikProps} />
          {/* Functional Training */}
          <FunctionalTrainingForm {...props} {...formikProps} />
          {/* Technic Traning */}
          <TechnicalTrainingForm {...props} {...formikProps} />
          {/* Award */}
          <AwardForm {...props} {...formikProps} />
          {/* SKP */}
          <SKPForm {...props} {...formikProps} />
        </>
      )}

      {/* Credit Number */}
      {isCreditNumber && <CreditsForm {...props} {...formikProps} />}

      {isEdit && (
        <>
          {/* Performance */}
          <PerformanceForm {...props} {...formikProps} />
          {/* Disciplinary */}
          <DisciplinaryForm {...props} {...formikProps} />
        </>
      )}

      {/* Family */}
      <FamilyForm {...props} {...formikProps} />
      {/* Paid Leave */}
      <PaidLeaveForm {...props} {...formikProps} />
      {/* Notes */}
      {accessGranted(PermissionsIDs.NOTES, Access.READ) && (
        <NotesForm {...props} {...formikProps} />
      )}
      {/* Assesment */}
      <AssessmentForm {...props} {...formikProps} />
      {/* Competence */}
      <CompetenceTestForm {...props} {...formikProps} />
      {/* Talent Pool */}
      {accessGranted(PermissionsIDs.TALENT_POOL, Access.READ) && (
        <TalentPoolForm {...props} {...formikProps} />
      )}
    </Box>
  )
}

FormComponent.propTypes = {
  mode: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  formikRef: PropTypes.any,
  formikProps: PropTypes.any,
  options: PropTypes.object,
  errorsForm: PropTypes.object,
  onGetPositionType: PropTypes.func
}

export default FormComponent
