/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import FormComponent from '../Form/FormComponent'
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
  maritalStatuFamilysOptions,
  studyAreaOptions
} from 'libs/types/options'

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
  const formikEmployeeRef = useRef(null)
  const formikEducationsRef = useRef(null)
  const formikFamiliesRef = useRef(null)
  const formikLeavesRef = useRef(null)
  const formikNotesRef = useRef(null)
  const formikCreditsRef = useRef(null)
  const formikAssessmentsRef = useRef(null)
  const formikCompetencesRef = useRef(null)
  const formikTalentsRef = useRef(null)

  const formikPositionsRef = useRef(null)
  const formikGradesRef = useRef(null)
  const formikTrainingStructuralsRef = useRef(null)
  const formikTrainingFungsionalsRef = useRef(null)
  const formikTrainingTechnicalsRef = useRef(null)
  const formikRecognitionsRef = useRef(null)
  const formikTargetsRef = useRef(null)
  const formikPerformancesRef = useRef(null)
  const formikDisciplinariesRef = useRef(null)

  const [positions, setPositions] = useState([])
  const [isExpand, setIsExpand] = useState(false)

  const formikRef = useMemo(() => {
    return {
      formikEmployeeRef,
      formikEducationsRef,
      formikFamiliesRef,
      formikLeavesRef,
      formikNotesRef,
      formikCreditsRef,
      formikAssessmentsRef,
      formikCompetencesRef,
      formikTalentsRef,
      formikPositionsRef,
      formikGradesRef,
      formikTrainingStructuralsRef,
      formikTrainingFungsionalsRef,
      formikTrainingTechnicalsRef,
      formikRecognitionsRef,
      formikTargetsRef,
      formikPerformancesRef,
      formikDisciplinariesRef
    }
  }, [
    formikEmployeeRef,
    formikEducationsRef,
    formikFamiliesRef,
    formikLeavesRef,
    formikNotesRef,
    formikCreditsRef,
    formikAssessmentsRef,
    formikCompetencesRef,
    formikTalentsRef,
    formikPositionsRef,
    formikGradesRef,
    formikTrainingStructuralsRef,
    formikTrainingFungsionalsRef,
    formikTrainingTechnicalsRef,
    formikRecognitionsRef,
    formikTargetsRef,
    formikPerformancesRef,
    formikDisciplinariesRef
  ])

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
        if (type == 'grades') {
          arr.push(`${itm?.name} ${itm?.code}`)
        }

        if (type == 'employments' && itm?.status) {
          arr.push(itm?.name)
        }

        if (type !== 'grades' && type !== 'employments') {
          arr.push(itm?.name)
        }
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
      performancesType: ppkDescOptions,
      studyArea: studyAreaOptions
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

  const handleGetValueID = (type, val, idx) => {
    if (val) {
      if (type == 'position') {
        const dataPosition = positions[idx]
        const item = dataPosition.find((itm) => itm?.name == val)
        return item?.id
      } else if (type == 'grade') {
        const idItm =
          grade?.options &&
          grade?.options.find((itm) => `${itm?.name} ${itm?.code}` == val)?.id
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
      return ''
    }
  }

  const handleGetValue = (type, val) => {
    if ((val || val >= 0) && val !== null) {
      if (type == 'grade') {
        const item =
          grade?.options && grade?.options.find((itm) => itm?.id == val)

        return `${item?.name} ${item?.code}`
      } else if (type == 'echelon') {
        const item =
          echelon?.options &&
          echelon?.options.find((itm) => itm?.id == val)?.name
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
    } else {
      return null
    }
  }

  const handleFormatDate = (value, format) => {
    if (value) return moment(value).format(format)

    return ''
  }

  const handleSubmit = useCallback(async () => {
    const FormEmployee = formikEmployeeRef?.current
    const FormEducations = formikEducationsRef?.current
    const FormFamilies = formikFamiliesRef?.current
    const FormLeaves = formikLeavesRef?.current
    const FormNotes = formikNotesRef?.current
    const FormCredits = formikCreditsRef?.current
    const FormAssessments = formikAssessmentsRef?.current
    const FormCompetences = formikCompetencesRef?.current
    const FormTalents = formikTalentsRef?.current

    const FormPositions = formikPositionsRef?.current
    const FormGrades = formikGradesRef?.current
    const FormTrainingStructurals = formikTrainingStructuralsRef?.current
    const FormTrainingFungsionals = formikTrainingFungsionalsRef?.current
    const FormTrainingTechnicals = formikTrainingTechnicalsRef?.current
    const FormRecognitions = formikRecognitionsRef?.current
    const FormTargets = formikTargetsRef?.current
    const FormPerformances = formikPerformancesRef?.current
    const FormDisciplinaries = formikDisciplinariesRef?.current

    const formsToValidate = [
      FormEmployee,
      FormEducations,
      FormAssessments,
      FormCompetences,
      FormTalents,
      FormFamilies,
      FormLeaves,
      FormNotes,
      FormPositions,
      FormGrades,
      FormTrainingStructurals,
      FormTrainingFungsionals,
      FormTrainingTechnicals,
      FormRecognitions,
      FormTargets,
      FormPerformances,
      FormDisciplinaries
    ].filter(Boolean)

    if (!formsToValidate) return null

    try {
      await Promise.all(
        formsToValidate.map(async (form) => {
          const res = await form.validateForm()

          if (res?.errors && Object.keys(res?.errors).length > 0)
            throw new Error('Form not valid!')
        })
      )

      const refValidate = [
        formikEmployeeRef,
        formikEducationsRef,
        formikFamiliesRef,
        formikLeavesRef,
        formikNotesRef,
        formikAssessmentsRef,
        formikCompetencesRef,
        formikTalentsRef,
        formikPositionsRef,
        formikGradesRef,
        formikTrainingStructuralsRef,
        formikTrainingFungsionalsRef,
        formikTrainingTechnicalsRef,
        formikRecognitionsRef,
        formikTargetsRef,
        formikPerformancesRef,
        formikDisciplinariesRef
      ]

      const allFormsValid = refValidate.every(
        (form) =>
          form?.current?.errors &&
          Object.keys(form?.current?.errors).length === 0
      )

      if (allFormsValid) {
        const employee = FormEmployee?.values
        const educations = FormEducations?.values?.educations || []
        const families = FormFamilies?.values?.families || []
        const leaves = FormLeaves?.values?.leaves || []
        const notes = FormNotes?.values?.notes || []
        const assessments = FormAssessments?.values?.assessments || []
        const competences = FormCompetences?.values?.competences || []
        const talents = FormTalents?.values?.talentPools || []
        const positions = FormPositions?.values?.positions || []
        const grades = FormGrades?.values?.grades || []
        const structurals =
          FormTrainingStructurals?.values?.trainingStructurals || []
        const functionals =
          FormTrainingFungsionals?.values?.trainingFungsionals || []
        const technicals =
          FormTrainingTechnicals?.values?.trainingTechnicals || []
        // const recognitions = FormRecognitions?.values?.recognitions || []
        const targets = FormTargets?.values?.targets || []
        const performances = FormPerformances?.values?.performances || []
        const disciplinaries = FormDisciplinaries?.values?.disciplinaries || []

        const emptyArray = ''

        const id = atob(router?.query?.id)

        const position = employee?.positions.filter((itm) => itm?.name !== null)
        const positionLength = position.length
        const indexPosition = positionLength > 0 ? positionLength - 1 : 0
        const itemPosition =
          positionLength > 0 ? position[indexPosition]?.name : ''

        const formData = new FormData()

        // Employee
        formData.append(
          'photo_profile',
          !employee?.image || typeof employee?.image == 'string'
            ? ''
            : employee?.image
        )
        formData.append('name', employee?.name)
        formData.append('title_prefix', employee?.titlePrefix)
        formData.append('title_suffix', employee?.titleSuffix)
        formData.append('employee_id_number', employee?.nip)
        formData.append('employee_registration_number', employee?.nrp)
        formData.append('place_of_birth', employee?.placeOfBirth)
        formData.append(
          'date_of_birth',
          handleFormatDate(employee?.dateOfBirth, 'YYYY-MM-DD')
        )
        formData.append(
          'religion',
          handleGetValueID('religion', employee?.religion, '')
        )
        formData.append('gender', employee?.gender == 'Laki-Laki' ? 1 : 0)
        formData.append(
          'marital_status',
          handleGetValueID('marital', employee?.maritalStatus, '')
        )
        formData.append(
          'marriage_date',
          handleFormatDate(employee?.marriageDate, 'YYYY-MM-DD')
        )
        formData.append('marriage_description', employee?.marriageDesc)
        formData.append(
          'employment_type_id',
          handleGetValueID('employmentType', employee?.employmentType, '')
        )
        formData.append(
          'cpns_effective_date',
          handleFormatDate(employee?.dateStartedWork, 'YYYY-MM-DD')
        )
        formData.append(
          'pns_effective_date',
          handleFormatDate(employee?.pnsEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'position_id',
          positionLength > 0
            ? handleGetValueID('position', itemPosition, indexPosition)
            : ''
        )
        formData.append(
          'position_effective_date',
          handleFormatDate(employee?.positionEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'grade_id',
          handleGetValueID('grade', employee?.grade, '')
        )
        formData.append(
          'grade_effective_date',
          handleFormatDate(employee?.gradeEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'echelon_id',
          employee?.echelon
            ? handleGetValueID('echelon', employee?.echelon, '')
            : ''
        )
        formData.append(
          'echelon_effective_date',
          handleFormatDate(employee?.echelonEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'institution_id',
          handleGetValueID('institution', employee?.institution, '')
        )
        formData.append(
          'education_level',
          handleGetValueID(
            'employeeEducationLevel',
            employee?.educationLevel,
            ''
          )
        )
        formData.append('education_name', employee?.educationName)
        formData.append(
          'education_year',
          handleFormatDate(employee?.educationYear, 'YYYY')
        )
        formData.append(
          'employee_id_card_number',
          employee?.employeeIdCardNumber
        )
        formData.append(
          'employee_id_card',
          !employee?.employeeIdCard ||
            typeof employee?.employeeIdCard == 'string'
            ? ''
            : employee?.employeeIdCard
        )
        formData.append('karisu_number', employee?.karisu)
        formData.append('id_tax', employee?.taxId)
        formData.append(
          'employment_status',
          handleGetValueID('employeeStatus', employee?.employmentStatus, '')
        )
        formData.append(
          'family_registration_number',
          employee?.familyRegistNumber
        )
        formData.append('id_number', employee?.idNumber)
        formData.append(
          'residence_id',
          employee?.residence
            ? handleGetValueID('residence', employee?.residence, '')
            : ''
        )
        formData.append('residence_description', employee?.residenceName)
        formData.append('current_address', employee?.address)
        formData.append('home_phone_number', employee?.homeTelephoneNumber)
        formData.append('mobile_phone', employee?.mobilePhone)
        formData.append('office_address', employee?.officeAddress)
        formData.append('office_phone_number', employee?.officeTelephoneNumber)
        formData.append('email', employee?.email)
        formData.append('office_email', employee?.officeEmail)
        formData.append('emergency_contact', employee?.emergencyContact)
        formData.append('description', '')
        formData.append(
          'delete_employee_id_card',
          employee?.employeeIdCard ? 0 : 1
        )
        formData.append(
          'quit_date',
          handleFormatDate(employee?.lastDateOfWork, 'YYYY-MM-DD')
        )
        formData.append(
          'years_of_service_total',
          employee?.yearsOfServiceTotal?.year
        )
        formData.append(
          'month_of_service_total',
          employee?.yearsOfServiceTotal?.month
        )
        formData.append(
          'years_of_service_rank',
          employee?.yearsOfServiceRank?.year
        )
        formData.append(
          'month_of_service_rank',
          employee?.yearsOfServiceRank?.month
        )
        formData.append('type', 1)

        // Educations
        if (educations.length > 0) {
          educations.map((item, index) => {
            formData.append(`educations[${index}][id]`, item?.id || '')
            formData.append(
              `educations[${index}][level]`,
              handleGetValueID(
                'employeeEducationLevel',
                item?.educationLevel,
                ''
              )
            )
            formData.append(`educations[${index}][name]`, item?.educationName)
            formData.append(
              `educations[${index}][study_area]`,
              handleGetValueID('studyArea', item?.educationArea, '')
            )
            formData.append(
              `educations[${index}][accreditation]`,
              item?.educationAccreditation
            )
            formData.append(
              `educations[${index}][faculty]`,
              item?.educationFaculty
            )
            formData.append(`educations[${index}][major]`, item?.educationMajor)
            // formData.append(
            //   `educations[${index}][status]`,
            //   handleGetValueID('educationStatus', item?.educationStatus, '')
            // )
            formData.append(
              `educations[${index}][year_of_graduation]`,
              handleFormatDate(item?.educationYear, 'YYYY')
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
            formData.append(
              `educations[${index}][study_assignment_letter]`,
              !item?.educationStudyAssignmentLetter ||
                typeof item?.educationStudyAssignmentLetter == 'string'
                ? ''
                : item?.educationStudyAssignmentLetter
            )
            formData.append(
              `educations[${index}][delete_study_assignment_letter]`,
              item?.educationStudyAssignmentLetter ? 0 : 1
            )
            formData.append(
              `educations[${index}][academic_title_letter]`,
              !item?.edudcationAcademicTitleLetter ||
                typeof item?.edudcationAcademicTitleLetter == 'string'
                ? ''
                : item?.edudcationAcademicTitleLetter
            )
            formData.append(
              `educations[${index}][delete_academic_title_letter]`,
              item?.edudcationAcademicTitleLetter ? 0 : 1
            )
          })
        } else {
          formData.append(`educations`, emptyArray)
        }

        // Families
        if (families.length > 0) {
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
              handleGetValueID('religion', item?.religion, '')
            )
            formData.append(
              `families[${index}][place_of_birth]`,
              item?.placeOfBirth
            )
            formData.append(
              `families[${index}][date_of_birth]`,
              handleFormatDate(item?.dateOfBirth, 'YYYY-MM-DD')
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
              handleGetValueID(
                'relationshipStatus',
                item?.relationshipStatus,
                ''
              )
            )
            formData.append(
              `families[${index}][education]`,
              handleGetValueID('educationLevel', item?.educationLevel, '')
            )
            formData.append(`families[${index}][occupation]`, item?.occupation)
            formData.append(
              `families[${index}][occupation_description]`,
              item?.occupationDescription
            )
            formData.append(
              `families[${index}][marital_status]`,
              handleGetValueID('maritalFamily', item?.maritalStatus, '')
            )
            formData.append(
              `families[${index}][marriage_other_notes]`,
              item?.marriageOther
            )
            formData.append(
              `families[${index}][mobile_phone]`,
              item?.mobilePhone
            )
            formData.append(
              `families[${index}][sequence_number]`,
              item?.sequenceNumber
            )
          })
        } else {
          formData.append(`families`, emptyArray)
        }

        // Leaves
        if (leaves.length > 0) {
          leaves.map((item, index) => {
            formData.append(`leaves[${index}][id]`, item?.id || '')
            formData.append(
              `leaves[${index}][start_date]`,
              handleFormatDate(item?.period?.from, 'YYYY-MM-DD')
            )
            formData.append(
              `leaves[${index}][end_date]`,
              handleFormatDate(item?.period?.to, 'YYYY-MM-DD')
            )
            formData.append(
              `leaves[${index}][type]`,
              handleGetValueID('leaves', item?.type, '')
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
        } else {
          formData.append(`leaves`, emptyArray)
        }

        // Notes
        if (notes.length > 0) {
          notes.map((item, index) => {
            formData.append(`notes[${index}][id]`, item?.id || '')
            formData.append(`notes[${index}][description]`, item?.description)
          })
        } else {
          formData.append(`notes`, emptyArray)
        }

        // Assesments
        if (assessments.length > 0) {
          assessments.map((item, index) => {
            formData.append(`assessments[${index}][id]`, item?.id || '')
            formData.append(
              `assessments[${index}][event_date]`,
              handleFormatDate(item?.date, 'YYYY-MM-DD')
            )
            formData.append(
              `assessments[${index}][point]`,
              handleGetValueID('assessments', item?.point, '')
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
        } else {
          formData.append(`assessments`, emptyArray)
        }

        // Competences
        if (competences.length > 0) {
          competences.map((item, index) => {
            formData.append(`competencies[${index}][id]`, item?.id || '')
            formData.append(
              `competencies[${index}][event_date]`,
              handleFormatDate(item?.date, 'YYYY-MM-DD')
            )
            formData.append(
              `competencies[${index}][point]`,
              handleGetValueID('competences', item?.point, '')
            )
            formData.append(
              `competencies[${index}][organizer]`,
              item?.organizer
            )
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
        } else {
          formData.append(`competencies`, emptyArray)
        }

        // Talent Pools
        if (talents.length > 0) {
          talents.map((item, index) => {
            formData.append(`talents[${index}][id]`, item?.id || '')
            formData.append(
              `talents[${index}][event_date]`,
              handleFormatDate(item?.date, 'YYYY-MM-DD')
            )
            formData.append(
              `talents[${index}][point]`,
              handleGetValueID('talentPools', item?.point, '')
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
        } else {
          formData.append(`talents`, emptyArray)
        }

        // History Positions
        if (positions.length > 0) {
          positions.map((item, index) => {
            formData.append(`positions[${index}][id]`, item?.id || '')
            formData.append(`positions[${index}][position]`, item?.position)
            formData.append(
              `positions[${index}][group_id]`,
              handleGetValueID('group', item?.group, '')
            )
            formData.append(
              `positions[${index}][echelon]`,
              item?.level ? handleGetValueID('echelon', item?.level, '') : ''
            )
            formData.append(
              `positions[${index}][position_status]`,
              item?.description
                ? handleGetValueID('positionDescription', item?.description, '')
                : ''
            )
            formData.append(
              `positions[${index}][effective_date]`,
              handleFormatDate(item?.effectiveDate, 'YYYY-MM-DD')
            )
            formData.append(`positions[${index}][decree]`, item?.decree)
            formData.append(
              `positions[${index}][decree_document]`,
              !item?.decreeDocument || typeof item?.decreeDocument == 'string'
                ? ''
                : item?.decreeDocument
            )
            formData.append(
              `positions[${index}][type_of_decree]`,
              item?.decreeType
                ? handleGetValueID('decreeType', item?.decreeType, '')
                : ''
            )
            formData.append(
              `positions[${index}][decree_number]`,
              item?.decreeNumber
            )
            formData.append(
              `positions[${index}][decree_date]`,
              handleFormatDate(item?.decreeDate, 'YYYY-MM-DD')
            )
            formData.append(
              `positions[${index}][termination_date]`,
              handleFormatDate(item?.terminationDate, 'YYYY-MM-DD')
            )
            formData.append(
              `positions[${index}][termination_decree]`,
              item?.terminationDecree || ''
            )
            formData.append(
              `positions[${index}][type_of_termination_decree]`,
              item?.terminationDecreeType
                ? handleGetValueID(
                    'decreeType',
                    item?.terminationDecreeType,
                    ''
                  )
                : ''
            )
            formData.append(
              `positions[${index}][termination_decree_number]`,
              item?.terminationDecreeNumber
            )
            formData.append(
              `positions[${index}][termination_decree_date]`,
              handleFormatDate(item?.terminationDecreeDate, 'YYYY-MM-DD')
            )
            formData.append(
              `positions[${index}][status]`,
              item?.status == 'Aktif' ? 1 : 0
            )
            formData.append(
              `positions[${index}][delete_decree_document]`,
              values?.decreeDocument ? 0 : 1
            )
          })
        } else {
          formData.append(`positions`, emptyArray)
        }

        // History Grades
        if (grades.length > 0) {
          grades.map((item, index) => {
            formData.append(`grades[${index}][id]`, item?.id || '')
            formData.append(
              `grades[${index}][grade_id]`,
              handleGetValueID('grade', item?.grade, '')
            )
            formData.append(
              `grades[${index}][effective_date]`,
              handleFormatDate(item?.effectiveDate, 'YYYY-MM-DD')
            )
            formData.append(`grades[${index}][decree_name]`, item?.decree)
            formData.append(
              `grades[${index}][decree_document]`,
              !item?.decreeDocument || typeof item?.decreeDocument == 'string'
                ? ''
                : item?.decreeDocument
            )
            formData.append(
              `grades[${index}][type_of_decree]`,
              item?.decreeType
                ? handleGetValueID('decreeType', item?.decreeType, '')
                : ''
            )
            formData.append(
              `grades[${index}][decree_number]`,
              item?.decreeNumber
            )
            formData.append(
              `grades[${index}][decree_date]`,
              handleFormatDate(item?.decreeDate, 'YYYY-MM-DD')
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
        } else {
          formData.append(`grades`, emptyArray)
        }

        // History Structurals Trainigns
        if (structurals.length > 0) {
          structurals.map((item, index) => {
            formData.append(`structurals[${index}][id]`, item?.id || '')
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
        } else {
          formData.append(`structurals`, emptyArray)
        }

        // History Functionals Trainigns
        if (functionals.length > 0) {
          functionals.map((item, index) => {
            formData.append(`functionals[${index}][id]`, item?.id || '')
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
        } else {
          formData.append(`functionals`, emptyArray)
        }

        // History Technicals Trainigns
        if (technicals.length > 0) {
          technicals.map((item, index) => {
            formData.append(`technicals[${index}][id]`, item?.id || '')
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
        } else {
          formData.append(`technicals`, emptyArray)
        }

        // History Targets
        if (targets.length > 0) {
          targets.map((item, index) => {
            formData.append(`targets[${index}][id]`, item?.id || '')
            formData.append(
              `targets[${index}][work_behavior_rating]`,
              handleGetValueID('workBehavior', item?.workBehavior, '')
            )
            formData.append(
              `targets[${index}][employee_performance_predicate]`,
              handleGetValueID('performance', item?.performance, '')
            )
            formData.append(
              `targets[${index}][organizational_performance_achievement]`,
              handleGetValueID(
                'performanceAchievement',
                item?.performanceAchievement,
                ''
              )
            )
          })
        } else {
          formData.append(`targets`, emptyArray)
        }

        // History Performances
        if (performances.length > 0) {
          performances.map((item, index) => {
            formData.append(`performances[${index}][id]`, item?.id || '')
            formData.append(
              `performances[${index}][work_performance_score]`,
              item?.point
            )
            formData.append(
              `performances[${index}][description]`,
              handleGetValueID('performancesType', item?.description, '')
            )
          })
        } else {
          formData.append(`performances`, emptyArray)
        }

        // History Disciplinaries
        if (disciplinaries.length > 0) {
          disciplinaries.map((item, index) => {
            formData.append(`disciplinaries[${index}][id]`, item?.id || '')
            formData.append(`disciplinaries[${index}][grade]`, item?.grade)
            formData.append(
              `disciplinaries[${index}][position]`,
              item?.position
            )
            formData.append(
              `disciplinaries[${index}][disciplinary_id]`,
              handleGetValueID('discipleType', item?.discipleType, '')
            )
            formData.append(
              `disciplinaries[${index}][decree_number]`,
              item?.decreeNumber
            )
            formData.append(
              `disciplinaries[${index}][date_of_decree]`,
              handleFormatDate(item?.decreeDate, 'YYYY-MM-DD')
            )
            formData.append(
              `disciplinaries[${index}][start_date]`,
              handleFormatDate(item?.discipleDate?.from, 'YYYY-MM-DD')
            )
            formData.append(
              `disciplinaries[${index}][end_date]`,
              handleFormatDate(item?.discipleDate?.to, 'YYYY-MM-DD')
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
        } else {
          formData.append(`disciplinaries`, emptyArray)
        }

        // Credits
        if (FormCredits) {
          await FormCredits.validateForm()

          if (FormCredits?.isValid) {
            const credits = FormCredits?.values?.credits || []

            if (credits.length > 0) {
              credits.map((item, index) => {
                formData.append(`credits[${index}][id]`, item?.id || '')
                formData.append(`credits[${index}][position]`, item?.position)
                formData.append(
                  `credits[${index}][period]`,
                  handleGetValueID('periodCredits', item?.period, '')
                )
                formData.append(`credits[${index}][year]`, item?.year)
                formData.append(`credits[${index}][score]`, item?.point)
                formData.append(
                  `credits[${index}][start_month]`,
                  item?.month?.start
                    ? handleGetValueID('months', item?.month?.start, '')
                    : ''
                )
                formData.append(
                  `credits[${index}][end_month]`,
                  item?.month?.end
                    ? handleGetValueID('months', item?.month?.end, '')
                    : ''
                )
              })
            } else {
              formData.append(`credits`, emptyArray)
            }
          }
        }

        const payload = {
          id,
          data: formData
        }

        updateEmployee(payload)
      }
    } catch (err) {
      setIsExpand(true)
      setTimeout(() => setIsExpand(false), 500)
    }
  }, [
    position,
    grade,
    echelon,
    institution,
    residence,
    employmentType,
    decree,
    disciplinary,
    group,
    positions,
    formikEmployeeRef,
    formikEducationsRef,
    formikFamiliesRef,
    formikLeavesRef,
    formikNotesRef,
    formikAssessmentsRef,
    formikCompetencesRef,
    formikTalentsRef,
    formikPositionsRef,
    formikGradesRef,
    formikTrainingStructuralsRef,
    formikTrainingFungsionalsRef,
    formikTrainingTechnicalsRef,
    formikRecognitionsRef,
    formikTargetsRef,
    formikPerformancesRef,
    formikDisciplinariesRef
  ])

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

    formikEmployeeRef?.current?.resetForm()
    formikEducationsRef?.current?.resetForm()
    formikFamiliesRef?.current?.resetForm()
    formikLeavesRef?.current?.resetForm()
    formikNotesRef?.current?.resetForm()
    formikCreditsRef?.current?.resetForm()
    formikAssessmentsRef?.current?.resetForm()
    formikCompetencesRef?.current?.resetForm()
    formikTalentsRef?.current?.resetForm()
    formikPositionsRef?.current?.resetForm()
    formikGradesRef?.current?.resetForm()
    formikTrainingStructuralsRef?.current?.resetForm()
    formikTrainingFungsionalsRef?.current?.resetForm()
    formikTrainingTechnicalsRef?.current?.resetForm()
    formikRecognitionsRef?.current?.resetForm()
    formikTargetsRef?.current?.resetForm()
    formikPerformancesRef?.current?.resetForm()
    formikDisciplinariesRef?.current?.resetForm()
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
      !group?.loading
    onLoading(state)
  }, [
    position,
    echelon,
    grade,
    institution,
    residence,
    decree,
    disciplinary,
    group
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

    const handleSetCountServiceValue = (val) => {
      return val !== null ? val.toString() : ''
    }

    if (Object.entries(detail).length > 0) {
      const FormEmployee = formikEmployeeRef?.current
      const FormEducations = formikEducationsRef?.current
      const FormFamilies = formikFamiliesRef?.current
      const FormLeaves = formikLeavesRef?.current
      const FormNotes = formikNotesRef?.current
      const FormCredits = formikCreditsRef?.current
      const FormAssessments = formikAssessmentsRef?.current
      const FormCompetences = formikCompetencesRef?.current
      const FormTalents = formikTalentsRef?.current

      const FormPositions = formikPositionsRef?.current
      const FormGrades = formikGradesRef?.current
      const FormTrainingStructurals = formikTrainingStructuralsRef?.current
      const FormTrainingFungsionals = formikTrainingFungsionalsRef?.current
      const FormTrainingTechnicals = formikTrainingTechnicalsRef?.current
      const FormRecognitions = formikRecognitionsRef?.current
      const FormTargets = formikTargetsRef?.current
      const FormPerformances = formikPerformancesRef?.current
      const FormDisciplinaries = formikDisciplinariesRef?.current

      const newPosition = detail?.position.map((itm, idx) => {
        if (itm?.parent_id) onFetchHierarchy(itm?.parent_id)
        if (idx == detail?.position.length - 1) onFetchHierarchy(itm?.id)
        return { name: itm?.name }
      })
      const dateOfBirth = detail?.date_of_birth
        ? moment(detail?.date_of_birth, 'DD-MM-YYYY').toDate()
        : ''
      const positionEffectiveDate = detail?.position_effective_date
        ? moment(detail?.position_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const gradeEffectiveDate = detail?.grade_effective_date
        ? moment(detail?.grade_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const echelonEffectiveDate = detail?.echelon_effective_date
        ? moment(detail?.echelon_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const cpnsEffectiveDate = detail?.cpns_effective_date
        ? moment(detail?.cpns_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const pnsEffectiveDate = detail?.pns_effective_date
        ? moment(detail?.pns_effective_date, 'DD-MM-YYYY').toDate()
        : ''
      const educationYear = detail?.education_year
        ? moment(detail?.education_year, 'YYYY').toDate()
        : null
      const quitDate = detail?.quit_date
        ? moment(detail?.quit_date, 'DD-MM-YYYY').toDate()
        : ''
      const marriageDate = detail?.marriage_date
        ? moment(detail?.marriage_date, 'DD-MM-YYYY').toDate()
        : ''

      // Employee
      FormEmployee?.setFieldValue(
        'image',
        handleSplitFile(detail?.photo_profile),
        false
      )
      FormEmployee?.setFieldValue('name', detail?.name || '', false)
      FormEmployee?.setFieldValue(
        'titlePrefix',
        detail?.title_prefix || '',
        false
      )
      FormEmployee?.setFieldValue(
        'titleSuffix',
        detail?.title_suffix || '',
        false
      )
      FormEmployee?.setFieldValue(
        'nip',
        detail?.employee_id_number || '',
        false
      )
      FormEmployee?.setFieldValue('nik', detail?.id_number || '', false)
      FormEmployee?.setFieldValue(
        'nrp',
        detail?.employee_registration_number || '',
        false
      )
      FormEmployee?.setFieldValue(
        'placeOfBirth',
        detail?.place_of_birth || '',
        false
      )
      FormEmployee?.setFieldValue('dateOfBirth', dateOfBirth, false)
      FormEmployee?.setFieldValue(
        'religion',
        handleGetValue('religion', detail?.religion),
        false
      )
      FormEmployee?.setFieldValue(
        'gender',
        handleGetValue(
          'gender',
          detail?.gender !== null && detail?.gender >= 0
            ? detail?.gender == 1
              ? 1
              : 2
            : null
        ),
        false
      )
      FormEmployee?.setFieldValue(
        'maritalStatus',
        detail?.marital_status
          ? handleGetValue('marital', detail?.marital_status)
          : null,
        false
      )
      FormEmployee?.setFieldValue('marriageDate', marriageDate, false)
      FormEmployee?.setFieldValue(
        'marriageDesc',
        detail?.marriage_description || '',
        false
      )
      FormEmployee?.setFieldValue(
        'employmentType',
        detail?.employment_type_id
          ? handleGetValue('employmentType', detail?.employment_type_id)
          : null,
        false
      )
      FormEmployee?.setFieldValue('dateStartedWork', cpnsEffectiveDate, false)
      FormEmployee?.setFieldValue('pnsEffectiveDate', pnsEffectiveDate, false)
      FormEmployee?.setFieldValue(`positions`, newPosition, false)
      FormEmployee?.setFieldValue(
        'positionEffectiveDate',
        positionEffectiveDate,
        false
      )
      FormEmployee?.setFieldValue(
        'grade',
        handleGetValue('grade', detail?.grade_id),
        false
      )
      FormEmployee?.setFieldValue(
        'gradeEffectiveDate',
        gradeEffectiveDate,
        false
      )
      FormEmployee?.setFieldValue(
        'echelon',
        handleGetValue('echelon', detail?.echelon_id),
        false
      )
      FormEmployee?.setFieldValue(
        'echelonEffectiveDate',
        echelonEffectiveDate,
        false
      )
      FormEmployee?.setFieldValue(
        'educationLevel',
        handleGetValue('employeeEducationLevel', detail?.education_level),
        false
      )
      FormEmployee?.setFieldValue(
        'educationName',
        detail?.education_name || '',
        false
      )
      FormEmployee?.setFieldValue('educationYear', educationYear, false)
      FormEmployee?.setFieldValue(
        'institution',
        detail?.institution_name || null,
        false
      )
      FormEmployee?.setFieldValue(
        'employeeIdCardNumber',
        detail?.employee_id_card_number || '',
        false
      )
      FormEmployee?.setFieldValue(
        'employeeIdCard',
        handleSplitFile(detail?.employee_id_card),
        false
      )
      FormEmployee?.setFieldValue('karisu', detail?.karisu_number || '', false)
      FormEmployee?.setFieldValue('taxId', detail?.id_tax || '', false)
      FormEmployee?.setFieldValue(
        'employmentStatus',
        handleGetValue('employeeStatus', detail?.employment_status),
        false
      )
      FormEmployee?.setFieldValue('lastDateOfWork', quitDate, false)
      FormEmployee?.setFieldValue(
        'familyRegistNumber',
        detail?.family_registration_number || '',
        false
      )
      FormEmployee?.setFieldValue('idNumber', detail?.id_number || '', false)
      FormEmployee?.setFieldValue(
        'residence',
        handleGetValue('residence', detail?.residence_id),
        false
      )
      FormEmployee?.setFieldValue(
        'residenceName',
        detail?.residence_description || '',
        false
      )
      FormEmployee?.setFieldValue(
        'address',
        detail?.current_address || '',
        false
      )
      FormEmployee?.setFieldValue(
        'homeTelephoneNumber',
        detail?.home_phone_number || '',
        false
      )
      FormEmployee?.setFieldValue(
        'mobilePhone',
        detail?.mobile_phone || '',
        false
      )
      FormEmployee?.setFieldValue(
        'officeAddress',
        detail?.office_address || '',
        false
      )
      FormEmployee?.setFieldValue(
        'officeTelephoneNumber',
        detail?.office_phone_number || '',
        false
      )
      FormEmployee?.setFieldValue(
        'officeEmail',
        detail?.office_email || '',
        false
      )
      FormEmployee?.setFieldValue('email', detail?.email || '', false)
      FormEmployee?.setFieldValue(
        'emergencyContact',
        detail?.emergency_contact || '',
        false
      )
      FormEmployee?.setFieldValue(
        'description',
        detail?.description || '',
        false
      )
      FormEmployee?.setFieldValue(
        'yearsOfServiceTotal.year',
        handleSetCountServiceValue(detail?.years_of_service_total),
        false
      )
      FormEmployee?.setFieldValue(
        'yearsOfServiceTotal.month',
        handleSetCountServiceValue(detail?.month_of_service_total),
        false
      )
      FormEmployee?.setFieldValue(
        'yearsOfServiceRank.year',
        handleSetCountServiceValue(detail?.years_of_service_rank),
        false
      )
      FormEmployee?.setFieldValue(
        'yearsOfServiceRank.month',
        handleSetCountServiceValue(detail?.month_of_service_rank),
        false
      )

      // Educations
      detail?.educations.map((itm, idx) => {
        const educationsYear = itm?.year_of_graduation
          ? moment(itm?.year_of_graduation, 'YYYY').toDate()
          : null

        FormEducations?.setFieldValue(
          `educations[${idx}].id`,
          itm?.id || null,
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationLevel`,
          handleGetValue('employeeEducationLevel', itm?.level),
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationName`,
          itm?.name || '',
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationArea`,
          handleGetValue('studyArea', itm?.study_area),
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationAccreditation`,
          itm?.accreditation || '',
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationFaculty`,
          itm?.faculty || '',
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationMajor`,
          itm?.major || '',
          false
        )
        // FormEducations?.setFieldValue(
        //   `educations[${idx}].educationStatus`,
        //   handleGetValue('educationStatus', itm?.status),
        //   false
        // )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationYear`,
          educationsYear,
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationDescription`,
          itm?.description || '',
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationCertificate`,
          handleSplitFile(itm?.degree_document),
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].educationStudyAssignmentLetter`,
          handleSplitFile(itm?.study_assignment_letter),
          false
        )
        FormEducations?.setFieldValue(
          `educations[${idx}].edudcationAcademicTitleLetter`,
          handleSplitFile(itm?.academic_title_letter),
          false
        )
      })

      // History Positions
      detail?.positions.map((itm, idx) => {
        const positionsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const positionsEffectiveDate = itm?.effective_date
          ? moment(itm?.effective_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsTerminationDate = itm?.termination_date
          ? moment(itm?.termination_date, 'DD-MM-YYYY').toDate()
          : ''
        const positionsTerminationDecreeDate = itm?.termination_decree_date
          ? moment(itm?.termination_decree_date, 'DD-MM-YYYY').toDate()
          : ''

        FormPositions?.setFieldValue(
          `positions[${idx}].id`,
          itm?.id || null,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].year`,
          positionsYear,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].position`,
          itm?.position || '',
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].group`,
          handleGetValue('group', itm?.group_id),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].level`,
          handleGetValue('echelon', itm?.echelon),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].description`,
          handleGetValue('positionDescription', itm?.position_status),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].effectiveDate`,
          positionsEffectiveDate,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].decree`,
          itm?.decree || '',
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].decreeDocument`,
          handleSplitFile(itm?.decree_document),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].decreeType`,
          handleGetValue('decree', itm?.type_decree_id),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].decreeDate`,
          positionsDecreeDate,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].terminationDate`,
          positionsTerminationDate,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].terminationDecree`,
          itm?.termination_decree,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].terminationDecreeType`,
          handleGetValue('decree', itm?.type_termination_decree_id),
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].terminationDecreeNumber`,
          itm?.termination_decree_number || '',
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].terminationDecreeDate`,
          positionsTerminationDecreeDate,
          false
        )
        FormPositions?.setFieldValue(
          `positions[${idx}].status`,
          handleGetValue(
            'status',
            itm?.status !== null && itm?.status >= 0
              ? itm?.status == 0
                ? 2
                : 1
              : null
          ),
          false
        )
      })

      // History Grades
      detail?.grades.map((itm, idx) => {
        const gradesYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const gradesEffectiveDate = itm?.effective_date
          ? moment(itm?.effective_date, 'DD-MM-YYYY')
          : ''
        const gradesDecreeDate = itm?.decree_date
          ? moment(itm?.decree_date, 'DD-MM-YYYY')
          : ''

        FormGrades?.setFieldValue(`grades[${idx}].id`, itm?.id || null, false)
        FormGrades?.setFieldValue(
          `grades[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormGrades?.setFieldValue(`grades[${idx}].year`, gradesYear, false)
        FormGrades?.setFieldValue(
          `grades[${idx}].grade`,
          handleGetValue('grade', itm?.grade_id),
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].effectiveDate`,
          gradesEffectiveDate,
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].decree`,
          itm?.decree_name || '',
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].decreeDocument`,
          handleSplitFile(itm?.decree_document),
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].decreeType`,
          handleGetValue('decree', itm?.type_of_decree),
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].decreeNumber`,
          itm?.decree_number || null,
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].decreeDate`,
          gradesDecreeDate,
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].description`,
          itm?.description || '',
          false
        )
        FormGrades?.setFieldValue(
          `grades[${idx}].status`,
          handleGetValue(
            'status',
            itm?.status !== null && itm?.status >= 0
              ? itm?.status == 0
                ? 2
                : 1
              : null
          ),
          false
        )
      })

      // History Structurals Trainings
      detail?.structurals.map((itm, idx) => {
        const structuralsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const structuralsDate = itm?.start_date
          ? moment(itm?.start_date, 'DD-MM-YYYY').toDate()
          : null

        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].id`,
          itm?.id || null,
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].year`,
          structuralsYear,
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].level`,
          itm?.level || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].date`,
          structuralsDate,
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].link`,
          itm?.link || '',
          false
        )
        FormTrainingStructurals?.setFieldValue(
          `trainingStructurals[${idx}].certificate`,
          handleSplitFile(itm?.certificate),
          false
        )
      })

      // History Functionals Trainings
      detail?.functionals.map((itm, idx) => {
        const functionalsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const functionalsDate = itm?.start_date
          ? moment(itm?.start_date, 'DD-MM-YYYY').toDate()
          : null

        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].id`,
          itm?.id || null,
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].year`,
          functionalsYear,
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].level`,
          itm?.level || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].date`,
          functionalsDate,
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].link`,
          itm?.link || '',
          false
        )
        FormTrainingFungsionals?.setFieldValue(
          `trainingFungsionals[${idx}].certificate`,
          handleSplitFile(itm?.certificate),
          false
        )
      })

      // History Technicals Trainings
      detail?.technicals.map((itm, idx) => {
        const functionalsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const functionalsDate = itm?.start_date
          ? moment(itm?.start_date, 'DD-MM-YYYY').toDate()
          : null

        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].id`,
          itm?.id || null,
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].year`,
          functionalsYear,
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].trainingName`,
          itm?.name || '',
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].number`,
          itm?.reference_number || '',
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].date`,
          functionalsDate,
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].duration`,
          itm?.duration || '',
          false
        )
        FormTrainingTechnicals?.setFieldValue(
          `trainingTechnicals[${idx}].link`,
          itm?.link || '',
          false
        )
        FormTrainingTechnicals?.setFieldValue(
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
          ? moment(itm?.decree_date, 'DD-MM-YYYY').toDate()
          : ''
        // const recognitionsReceiptDate = itm?.date_of_receipt
        //   ? moment(itm?.date_of_receipt, 'DD-MM-YYYY').toDate()
        //   : ''

        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].id`,
          itm?.id || null,
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].year`,
          recognitionsYear,
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].name`,
          itm?.recognition_name || '',
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].description`,
          itm?.description || '',
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].decreeType`,
          handleGetValue('decree', itm?.type_of_decree),
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].decreeDate`,
          recognitionsDecreeDate,
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].decreeYear`,
          itm?.decree_year || '',
          false
        )
        FormRecognitions?.setFieldValue(
          `recognitions[${idx}].institution`,
          itm?.awarding_institution || '',
          false
        )
        // FormRecognitions?.setFieldValue(
        //   `recognitions[${idx}].receiptDate`,
        //   recognitionsReceiptDate,
        //   false
        // )
      })

      // History Targets
      detail?.targets.map((itm, idx) => {
        const targetsYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null
        const targetsAssessmentYear = itm?.year
          ? moment(itm?.year, 'YYYY').toDate()
          : null

        FormTargets?.setFieldValue(`targets[${idx}].id`, itm?.id || null, false)
        FormTargets?.setFieldValue(
          `targets[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormTargets?.setFieldValue(`targets[${idx}].year`, targetsYear, false)
        FormTargets?.setFieldValue(
          `targets[${idx}].appraisal`,
          handleGetValue('period', itm?.appraisal_period),
          false
        )
        FormTargets?.setFieldValue(
          `targets[${idx}].assessmentYear`,
          targetsAssessmentYear,
          false
        )
        FormTargets?.setFieldValue(
          `targets[${idx}].workBehavior`,
          handleGetValue('workBehavior', itm?.work_behavior_rating),
          false
        )
        FormTargets?.setFieldValue(
          `targets[${idx}].performance`,
          handleGetValue('performance', itm?.employee_performance_predicate),
          false
        )
        FormTargets?.setFieldValue(
          `targets[${idx}].performanceAchievement`,
          handleGetValue(
            'performanceAchievement',
            itm?.organizational_performance_achievement
          ),
          false
        )
      })

      // History Performances
      detail?.performances.map((itm, idx) => {
        const performancesYear = itm?.period_year
          ? moment(itm?.period_year, 'YYYY').toDate()
          : null

        FormPerformances?.setFieldValue(
          `performances[${idx}].id`,
          itm?.id || null,
          false
        )
        FormPerformances?.setFieldValue(
          `performances[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormPerformances?.setFieldValue(
          `performances[${idx}].year`,
          performancesYear,
          false
        )
        FormPerformances?.setFieldValue(
          `performances[${idx}].appraisal`,
          itm?.performance_period || '',
          false
        )
        FormPerformances?.setFieldValue(
          `performances[${idx}].point`,
          itm?.work_performance_score || '',
          false
        )
        FormPerformances?.setFieldValue(
          `performances[${idx}].description`,
          handleGetValue('performancesType', itm?.description),
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

        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].id`,
          itm?.id || null,
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].month`,
          handleGetValue('months', itm?.period_month),
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].year`,
          disciplinariesYear,
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].grade`,
          itm?.grade || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].position`,
          itm?.position || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].discipleType`,
          handleGetValue('disciplinary', itm?.disciplinary_id),
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].discipleLevel`,
          itm?.disciplinary_description || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].allowanceDeducation`,
          itm?.performance_allowance_deduction || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].allowanceDuration`,
          itm?.performance_allowance_duration || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].decreeNumber`,
          itm?.decree_number || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].decreeDate`,
          disciplinariesDecreeDate,
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].discipleDate`,
          itm?.start_date && itm?.end_date
            ? {
                from: disciplinariesDiscipleStartDate,
                to: disciplinariesDiscipleEndDate
              }
            : null,
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].status`,
          itm?.status == 1 ? 'Aktif' : 'Tidak Aktif',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].validity`,
          itm?.validity_period || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficial`,
          itm?.authorizing_officer || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficial`,
          itm?.authorizing_officer || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].authorizedOfficialName`,
          itm?.name_of_authorizing_officer || '',
          false
        )
        FormDisciplinaries?.setFieldValue(
          `disciplinaries[${idx}].description`,
          itm?.description || '',
          false
        )
      })

      // Families
      detail?.families.map((itm, idx) => {
        const familiesDateOfBirth = itm?.date_of_birth
          ? moment(itm?.date_of_birth, 'DD-MM-YYYY').toDate()
          : ''

        FormFamilies?.setFieldValue(
          `families[${idx}].id`,
          itm?.id || null,
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].familyRegistNumber`,
          itm?.card_number || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].name`,
          itm?.name || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].idNumber`,
          itm?.id_number || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].gender`,
          handleGetValue(
            'gender',
            itm?.gender !== null && itm?.gender >= 0
              ? itm?.gender == 1
                ? 1
                : 2
              : null
          ),
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].religion`,
          handleGetValue('religion', itm?.religion),
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].placeOfBirth`,
          itm?.place_of_birth || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].dateOfBirth`,
          familiesDateOfBirth,
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].nameOfFather`,
          itm?.name_of_father || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].nameOfMother`,
          itm?.name_of_mother || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].relationshipStatus`,
          handleGetValue('relationshipStatus', itm?.relationship_status),
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].educationLevel`,
          handleGetValue('educationLevel', itm?.education),
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].occupation`,
          itm?.occupation || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].occupationDescription`,
          itm?.occupation_description || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].maritalStatus`,
          handleGetValue('maritalFamily', itm?.marital_status),
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].marriageOther`,
          itm?.marriage_other_notes || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].mobilePhone`,
          itm?.mobile_phone || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].mobilePhone`,
          itm?.mobile_phone || '',
          false
        )
        FormFamilies?.setFieldValue(
          `families[${idx}].sequenceNumber`,
          itm?.sequence_number || '',
          false
        )
      })

      // Leaves
      detail?.leaves.map((itm, idx) => {
        const leavesStartDate = itm?.start_date
          ? moment(itm?.start_date, 'DD-MM-YYYY').toDate()
          : ''
        const leavesEndDate = itm?.end_date
          ? moment(itm?.end_date, 'DD-MM-YYYY').toDate()
          : ''

        FormLeaves?.setFieldValue(`leaves[${idx}].id`, itm?.id || null, false)
        FormLeaves?.setFieldValue(
          `leaves[${idx}].period`,
          itm?.start_date && itm?.end_date
            ? {
                from: leavesStartDate,
                to: leavesEndDate
              }
            : null,
          false
        )
        FormLeaves?.setFieldValue(
          `leaves[${idx}].type`,
          handleGetValue('leaves', itm?.type),
          false
        )
        FormLeaves?.setFieldValue(
          `leaves[${idx}].number`,
          itm?.number || '',
          false
        )
        FormLeaves?.setFieldValue(
          `leaves[${idx}].description`,
          itm?.description || '',
          false
        )
        FormLeaves?.setFieldValue(
          `leaves[${idx}].leaveLetter`,
          handleSplitFile(itm?.leaveLetter),
          false
        )
      })

      // Notes
      detail?.notes.map((itm, idx) => {
        FormNotes?.setFieldValue(`notes[${idx}].id`, itm?.id || null, false)
        FormNotes?.setFieldValue(
          `notes[${idx}].description`,
          itm?.description || '',
          false
        )
      })

      // Assesments
      detail?.assessments.map((itm, idx) => {
        const assessmentsDate = itm?.event_date
          ? moment(itm?.event_date, 'DD-MM-YYYY').toDate()
          : ''

        FormAssessments?.setFieldValue(
          `assessments[${idx}].id`,
          itm?.id || null,
          false
        )
        FormAssessments?.setFieldValue(
          `assessments[${idx}].date`,
          assessmentsDate,
          false
        )
        FormAssessments?.setFieldValue(
          `assessments[${idx}].point`,
          handleGetValue('assessments', itm?.point),
          false
        )
        FormAssessments?.setFieldValue(
          `assessments[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        FormAssessments?.setFieldValue(
          `assessments[${idx}].certificate`,
          handleSplitFile(itm?.assessment_document),
          false
        )
      })

      // Competences
      detail?.competencies.map((itm, idx) => {
        const competencesDate = itm?.event_date
          ? moment(itm?.event_date, 'DD-MM-YYYY').toDate()
          : ''

        FormCompetences?.setFieldValue(
          `competences[${idx}].id`,
          itm?.id || null,
          false
        )
        FormCompetences?.setFieldValue(
          `competences[${idx}].date`,
          competencesDate,
          false
        )
        FormCompetences?.setFieldValue(
          `competences[${idx}].point`,
          handleGetValue('competences', itm?.point),
          false
        )
        FormCompetences?.setFieldValue(
          `competences[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        FormCompetences?.setFieldValue(
          `competences[${idx}].certificate`,
          handleSplitFile(itm?.competency_document),
          false
        )
      })

      // Talent Pools
      detail?.talents.map((itm, idx) => {
        const talentsDate = itm?.event_date
          ? moment(itm?.event_date, 'DD-MM-YYYY').toDate()
          : ''

        FormTalents?.setFieldValue(
          `talentPools[${idx}].id`,
          itm?.id || null,
          false
        )
        FormTalents?.setFieldValue(
          `talentPools[${idx}].date`,
          talentsDate,
          false
        )
        FormTalents?.setFieldValue(
          `talentPools[${idx}].point`,
          handleGetValue('talentPools', itm?.point),
          false
        )
        FormTalents?.setFieldValue(
          `talentPools[${idx}].organizer`,
          itm?.organizer || '',
          false
        )
        FormTalents?.setFieldValue(
          `talentPools[${idx}].certificate`,
          handleSplitFile(itm?.talent_document),
          false
        )
      })

      // Credits
      detail?.credits.map((itm, idx) => {
        const creditsMonthStart = handleGetValue('months', itm?.start_month)
        const creditsMonthEnd = handleGetValue('months', itm?.end_month)
        const creditsMonth = {
          start: creditsMonthStart,
          end: creditsMonthEnd
        }

        FormCredits?.setFieldValue(`credits[${idx}].id`, itm?.id || null, false)
        FormCredits?.setFieldValue(
          `credits[${idx}].position`,
          itm?.position || '',
          false
        )
        FormCredits?.setFieldValue(
          `credits[${idx}].period`,
          handleGetValue('periodCredits', itm?.period),
          false
        )
        FormCredits?.setFieldValue(`credits[${idx}].year`, itm?.year, false)
        FormCredits?.setFieldValue(
          `credits[${idx}].point`,
          itm?.score || '',
          false
        )
        FormCredits?.setFieldValue(`credits[${idx}].month`, creditsMonth, false)
      })
    }
  }, [
    employee?.detail,
    grade,
    echelon,
    institution,
    residence,
    employmentType,
    decree,
    disciplinary,
    group
  ])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Edit Pegawai ASN'}
      action={
        <Box>
          <Button text='Simpan' color='primary' onClick={handleSubmit} />
        </Box>
      }
    >
      <FormComponent
        mode='edit'
        pageType='ASN'
        formikRef={formikRef}
        isExpand={isExpand}
        options={options}
        errorsForm={errorsForm}
        onGetPositionType={handleGetPositionType}
        onChangeHierarchies={handleChangeHierarchies}
      />
    </LayoutPages>
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
