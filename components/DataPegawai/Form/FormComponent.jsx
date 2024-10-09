/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from 'react'
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
  const { formikRef, mode, pageType } = props

  const [isCreditNumber, setIsCreditNumber] = useState(false)

  const isEdit = useMemo(() => {
    return mode == 'edit'
  }, [mode])

  const PagesType = useMemo(() => {
    return {
      ASN: pageType == 'ASN',
      NONASN: pageType == 'NON_ASN',
      OUTSOURCE: pageType == 'OUTSOURCING'
    }
  }, [pageType])

  if (PagesType?.NONASN) {
    return (
      <Box sx={containerStyles}>
        {/* Employee */}
        <EmployeeForm
          ref={formikRef?.formikEmployeeRef}
          setIsCreditNumber={setIsCreditNumber}
          pagesType={PagesType}
          {...props}
        />
        {/* Position */}
        {isEdit && (
          <PositionForm ref={formikRef?.formikPositionsRef} {...props} />
        )}
      </Box>
    )
  }

  if (PagesType?.OUTSOURCE) {
    return (
      <Box sx={containerStyles}>
        {/* Employee */}
        <EmployeeForm
          ref={formikRef?.formikEmployeeRef}
          setIsCreditNumber={setIsCreditNumber}
          pagesType={PagesType}
          {...props}
        />
        {/* Education */}
        <EducationForm ref={formikRef?.formikEducationsRef} {...props} />
        {isEdit && (
          <>
            {/* Position */}
            <PositionForm ref={formikRef?.formikPositionsRef} {...props} />
            {/* Technic Traning */}
            <TechnicalTrainingForm
              ref={formikRef?.formikTrainingTechnicalsRef}
              {...props}
            />
          </>
        )}
        {/* Family */}
        <FamilyForm ref={formikRef?.formikFamiliesRef} {...props} />
        {/* Notes */}
        {accessGranted(PermissionsIDs.NOTES, Access.READ) && (
          <NotesForm ref={formikRef?.formikNotesRef} {...props} />
        )}
      </Box>
    )
  }

  return (
    <Box sx={containerStyles}>
      {/* Employee */}
      <EmployeeForm
        ref={formikRef?.formikEmployeeRef}
        setIsCreditNumber={setIsCreditNumber}
        pagesType={PagesType}
        {...props}
      />
      {/* Education */}
      <EducationForm ref={formikRef?.formikEducationsRef} {...props} />

      {isEdit && (
        <>
          {/* Position */}
          <PositionForm ref={formikRef?.formikPositionsRef} {...props} />
          {/* Type/Grade */}
          <TypeForm ref={formikRef?.formikGradesRef} {...props} />
          {/* Structural Training */}
          <StructuralTrainingForm
            ref={formikRef?.formikTrainingStructuralsRef}
            {...props}
          />
          {/* Functional Training */}
          <FunctionalTrainingForm
            ref={formikRef?.formikTrainingFungsionalsRef}
            {...props}
          />
          {/* Technic Traning */}
          <TechnicalTrainingForm
            ref={formikRef?.formikTrainingTechnicalsRef}
            {...props}
          />
          {/* Award */}
          <AwardForm ref={formikRef?.formikRecognitionsRef} {...props} />
          {/* SKP */}
          <SKPForm ref={formikRef?.formikTargetsRef} {...props} />
        </>
      )}

      {/* Credit Number */}
      {isCreditNumber && (
        <CreditsForm ref={formikRef?.formikCreditsRef} {...props} />
      )}

      {isEdit && (
        <>
          {/* Performance */}
          <PerformanceForm ref={formikRef?.formikPerformancesRef} {...props} />
          {/* Disciplinary */}
          <DisciplinaryForm
            ref={formikRef?.formikDisciplinariesRef}
            {...props}
          />
        </>
      )}

      {/* Family */}
      <FamilyForm ref={formikRef?.formikFamiliesRef} {...props} />
      {/* Paid Leave */}
      <PaidLeaveForm ref={formikRef?.formikLeavesRef} {...props} />
      {/* Notes */}
      {accessGranted(PermissionsIDs.NOTES, Access.READ) && (
        <NotesForm ref={formikRef?.formikNotesRef} {...props} />
      )}
      {/* Assesment */}
      <AssessmentForm ref={formikRef?.formikAssessmentsRef} {...props} />
      {/* Competence */}
      <CompetenceTestForm ref={formikRef?.formikCompetencesRef} {...props} />
      {/* Talent Pool */}
      {accessGranted(PermissionsIDs.TALENT_POOL, Access.READ) && (
        <TalentPoolForm ref={formikRef?.formikTalentsRef} {...props} />
      )}
    </Box>
  )
}

FormComponent.propTypes = {
  mode: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  formikRef: PropTypes.object
}

export default FormComponent
