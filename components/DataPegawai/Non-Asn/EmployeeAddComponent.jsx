/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Button } from '@/components/shared'
import { Box } from '@mui/material'
import FormComponent from '../Form/FormComponent'
import moment from 'moment'
import {
  assesmentsOptions,
  competencesOptions,
  educationLevelOptions,
  educationStatusOptions,
  employeeEducationLevelOptions,
  employeeStatusOptions,
  genderOptions,
  leavesOptions,
  maritalStatuFamilysOptions,
  maritalStatusOptions,
  monthOptions,
  organizationOptions,
  periodCreditsOptions,
  relationshipStatusOptions,
  religionOptions,
  studyAreaOptions,
  talentPoolsOptions
} from 'libs/types/options'

const EmployeeAddComponent = ({
  employee,
  position,
  grade,
  echelon,
  institution,
  residence,
  employmentType,
  postEmployee = () => {},
  onFetchHierarchy = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikEmployeeRef = useRef(null)

  const [positions, setPositions] = useState([])
  const [isExpand, setIsExpand] = useState(false)

  const formikRef = useMemo(() => {
    return { formikEmployeeRef }
  }, [formikEmployeeRef])

  const handleMapping = (val, type) => {
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

  const options = useMemo(() => {
    const newPosition = positions
      ? positions.map((itm) => handleMapping(itm, ''))
      : []
    const newResidence = residence?.data
      ? handleMapping(residence?.data, '')
      : []
    const newEchelon = echelon?.options
      ? handleMapping(echelon?.options, '')
      : []
    const newGrade = grade?.options
      ? handleMapping(grade?.options, 'grades')
      : []
    const newInstitution = institution?.options
      ? handleMapping(institution?.options, '')
      : []
    const newEmploymentType = employmentType?.data
      ? handleMapping(employmentType?.data, 'employments')
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
      studyArea: studyAreaOptions
    }

    return dataOptions
  }, [positions, echelon, grade, institution, residence, employmentType])

  const handleGetValue = (type, val, idx) => {
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

  const handleFormatDate = (value, format) => {
    if (value) return moment(value).format(format)

    return ''
  }

  const handleSubmit = useCallback(async () => {
    const FormEmployee = formikEmployeeRef?.current

    const formsToValidate = [FormEmployee].filter(Boolean)

    if (!formsToValidate) return null

    try {
      await Promise.all(
        formsToValidate.map(async (form) => {
          const res = await form.validateForm()

          if (res?.errors && Object.keys(res?.errors).length > 0)
            throw new Error('Form not valid!')
        })
      )

      const refValidate = [formikEmployeeRef]

      const allFormsValid = refValidate.every(
        (form) =>
          form?.current?.errors &&
          Object.keys(form?.current?.errors).length === 0
      )

      if (allFormsValid) {
        const employee = FormEmployee?.values

        const position = employee?.positions.filter((itm) => itm?.name !== null)
        const positionLength = position.length
        const indexPosition = positionLength > 0 ? positionLength - 1 : 0
        const itemPosition =
          positionLength > 0 ? position[indexPosition]?.name : ''

        const formData = new FormData()

        // Employee
        formData.append('photo_profile', employee?.image || '')
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
          handleGetValue('religion', employee?.religion, null)
        )
        formData.append('gender', employee?.gender == 'Laki-Laki' ? 1 : 0)
        formData.append(
          'marital_status',
          handleGetValue('marital', employee?.maritalStatus, null)
        )
        formData.append(
          'employment_type_id',
          handleGetValue('employmentType', employee?.employmentType, null)
        )
        formData.append(
          'cpns_effective_date',
          handleFormatDate(employee?.dateStartedWork, 'YYYY-MM-DD')
        )
        formData.append(
          'position_id',
          handleGetValue('position', itemPosition, indexPosition)
        )
        formData.append(
          'position_effective_date',
          handleFormatDate(employee?.positionEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'grade_id',
          handleGetValue('grade', employee?.grade, null)
        )
        formData.append(
          'grade_effective_date',
          handleFormatDate(employee?.gradeEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'echelon_id',
          employee?.echelon
            ? handleGetValue('echelon', employee?.echelon, null)
            : ''
        )
        formData.append(
          'echelon_effective_date',
          handleFormatDate(employee?.echelonEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'institution_id',
          handleGetValue('institution', employee?.institution, null)
        )
        formData.append(
          'education_level',
          handleGetValue(
            'employeeEducationLevel',
            employee?.educationLevel,
            null
          )
        )
        formData.append('education_name', employee?.educationName)
        formData.append(
          'education_year',
          handleFormatDate(employee?.educationYear, 'YYYY')
        )
        formData.append(
          'employee_id_card_number',
          ''
          // employee?.employeeIdCardNumber
        )
        formData.append('employee_id_card', employee?.employeeIdCard || '')
        formData.append(
          'karisu_number',
          ''
          // employee?.karisu
        )
        formData.append('id_tax', employee?.taxId)
        formData.append(
          'employment_status',
          handleGetValue('employeeStatus', employee?.employmentStatus, null)
        )
        formData.append(
          'family_registration_number',
          employee?.familyRegistNumber
        )
        formData.append('id_number', employee?.idNumber)
        formData.append(
          'residence_id',
          employee?.residence
            ? handleGetValue('residence', employee?.residence, null)
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
        formData.append('description', employee?.description)
        formData.append(
          'quit_date',
          handleFormatDate(employee?.lastDateOfWork, 'YYYY-MM-DD')
        )
        formData.append(
          'years_of_service_total',
          ''
          // employee?.yearsOfServiceTotal?.year
        )
        formData.append(
          'month_of_service_total',
          ''
          // employee?.yearsOfServiceTotal?.month
        )
        formData.append(
          'years_of_service_rank',
          ''
          // employee?.yearsOfServiceRank?.year
        )
        formData.append(
          'month_of_service_rank',
          ''
          // employee?.yearsOfServiceRank?.month
        )
        formData.append('type', 2)

        // Educations
        formData.append('educations', '')
        // educations.map((item, index) => {
        //   formData.append(
        //     `educations[${index}][level]`,
        //     handleGetValue('employeeEducationLevel', item?.educationLevel)
        //   )
        //   formData.append(`educations[${index}][name]`, item?.educationName)
        //   formData.append(
        //     `educations[${index}][study_area]`,
        //     handleGetValue('studyArea', item?.educationArea, '')
        //   )
        //   formData.append(
        //     `educations[${index}][accreditation]`,
        //     item?.educationAccreditation
        //   )
        //   formData.append(`educations[${index}][faculty]`, item?.educationFaculty)
        //   formData.append(`educations[${index}][major]`, item?.educationMajor)
        //   formData.append(
        //     `educations[${index}][status]`,
        //     handleGetValue('educationStatus', item?.educationStatus)
        //   )
        //   formData.append(
        //     `educations[${index}][year_of_graduation]`,
        //     handleFormatDate(item?.educationYear, 'YYYY')
        //   )
        //   formData.append(
        //     `educations[${index}][description]`,
        //     item?.educationDescription
        //   )
        //   formData.append(
        //     `educations[${index}][degree_document]`,
        //     item?.educationCertificate || ''
        //   )
        //   formData.append(
        //     `educations[${index}][study_assignment_letter]`,
        //     item?.educationStudyAssignmentLetter || ''
        //   )
        //   formData.append(
        //     `educations[${index}][academic_title_letter]`,
        //     item?.edudcationAcademicTitleLetter || ''
        //   )
        // })

        // Families
        formData.append('families', '')
        // families.map((item, index) => {
        //   formData.append(
        //     `families[${index}][card_number]`,
        //     item?.familyRegistNumber
        //   )
        //   formData.append(`families[${index}][name]`, item?.name)
        //   formData.append(`families[${index}][id_number]`, item?.idNumber)
        //   formData.append(
        //     `families[${index}][gender]`,
        //     item?.gender == 'Laki-Laki' ? 1 : 0
        //   )
        //   formData.append(
        //     `families[${index}][religion]`,
        //     handleGetValue('religion', item?.religion)
        //   )
        //   formData.append(
        //     `families[${index}][place_of_birth]`,
        //     item?.placeOfBirth
        //   )
        //   formData.append(
        //     `families[${index}][date_of_birth]`,
        //     handleFormatDate(item?.dateOfBirth, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `families[${index}][name_of_father]`,
        //     item?.nameOfFather
        //   )
        //   formData.append(
        //     `families[${index}][name_of_mother]`,
        //     item?.nameOfMother
        //   )
        //   formData.append(
        //     `families[${index}][relationship_status]`,
        //     handleGetValue('relationshipStatus', item?.relationshipStatus)
        //   )
        //   formData.append(
        //     `families[${index}][education]`,
        //     handleGetValue('educationLevel', item?.educationLevel)
        //   )
        //   formData.append(`families[${index}][occupation]`, item?.occupation)
        //   formData.append(
        //     `families[${index}][occupation_description]`,
        //     item?.occupationDescription
        //   )
        //   formData.append(
        //     `families[${index}][marital_status]`,
        //     handleGetValue('maritalFamily', item?.maritalStatus)
        //   )
        //   formData.append(`families[${index}][mobile_phone]`, item?.mobilePhone)
        //   formData.append(
        //     `families[${index}][sequence_number]`,
        //     item?.sequenceNumber
        //   )
        // })

        // Leaves
        formData.append('leaves', '')
        // leaves.map((item, index) => {
        //   formData.append(
        //     `leaves[${index}][start_date]`,
        //     handleFormatDate(item?.period?.from, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `leaves[${index}][end_date]`,
        //     handleFormatDate(item?.period?.to, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `leaves[${index}][type]`,
        //     handleGetValue('leaves', item?.type)
        //   )
        //   formData.append(`leaves[${index}][number]`, item?.number)
        //   formData.append(`leaves[${index}][description]`, item?.description)
        //   formData.append(`leaves[${index}][letter]`, item?.leaveLetter || '')
        // })

        // Notes
        formData.append('notes', '')
        // notes.map((item, index) => {
        //   formData.append(`notes[${index}][description]`, item?.description)
        // })

        // Credits
        formData.append('credits', '')
        // credits.map((item, index) => {
        //   formData.append(`credits[${index}][position]`, item?.position)
        //   formData.append(
        //     `credits[${index}][period]`,
        //     handleGetValue('periodCredits', item?.period)
        //   )
        //   formData.append(`credits[${index}][year]`, item?.year)
        //   formData.append(`credits[${index}][score]`, item?.point)
        //   formData.append(
        //     `credits[${index}][start_month]`,
        //     item?.month?.start ? handleGetValue('months', item?.month?.start) : ''
        //   )
        //   formData.append(
        //     `credits[${index}][end_month]`,
        //     item?.month?.end ? handleGetValue('months', item?.month?.end) : ''
        //   )
        // })

        // Assesments
        formData.append('assessments', '')
        // assessments.map((item, index) => {
        //   formData.append(
        //     `assessments[${index}][event_date]`,
        //     handleFormatDate(item?.date, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `assessments[${index}][point]`,
        //     handleGetValue('assessments', item?.point)
        //   )
        //   formData.append(`assessments[${index}][organizer]`, item?.organizer)
        //   formData.append(
        //     `assessments[${index}][assessment_document]`,
        //     item?.certificate || ''
        //   )
        // })

        // Competences
        formData.append('competencies', '')
        // competences.map((item, index) => {
        //   formData.append(
        //     `competencies[${index}][event_date]`,
        //     handleFormatDate(item?.date, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `competencies[${index}][point]`,
        //     handleGetValue('competences', item?.point)
        //   )
        //   formData.append(`competencies[${index}][organizer]`, item?.organizer)
        //   formData.append(
        //     `competencies[${index}][competency_document]`,
        //     item?.certificate || ''
        //   )
        // })

        // Talent Pools
        formData.append('talents', '')
        // talentPools.map((item, index) => {
        //   formData.append(
        //     `talents[${index}][event_date]`,
        //     handleFormatDate(item?.date, 'YYYY-MM-DD')
        //   )
        //   formData.append(
        //     `talents[${index}][point]`,
        //     handleGetValue('talentPools', item?.point)
        //   )
        //   formData.append(`talents[${index}][organizer]`, item?.organizer)
        //   formData.append(
        //     `talents[${index}][talent_document]`,
        //     item?.certificate || ''
        //   )
        // })

        postEmployee(formData)
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
    positions,
    formikEmployeeRef
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

  useEffect(() => {
    if (Object.entries(employee?.errorForm).length > 0) {
      const err = employee?.errorForm || {}
      const mappedErrors = {}

      Object.entries(err).map(([key, value]) => {
        const val = Array.isArray(value) ? value : [value]
        const match = key.match(/^(\w+)\.(\d+)\.(\w+)$/)

        if (match) {
          const [_, parent, index, child] = match

          const childName = handleSetKeyForm(child)

          if (!mappedErrors[parent]) mappedErrors[parent] = []

          if (!mappedErrors[parent][index]) mappedErrors[parent][index] = {}

          mappedErrors[parent][index][childName] = val
        } else {
          if (!mappedErrors['employee']) mappedErrors['employee'] = {}

          mappedErrors['employee'][handleSetKeyForm(key)] = val[0]
        }
      })

      Object.entries(mappedErrors).forEach(([key, value]) => {
        if (key === 'employee' && formikEmployeeRef.current) {
          formikEmployeeRef.current.setErrors(value)
        }
      })
    }
  }, [employee?.errorForm])

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
      !employmentType?.loading
    onLoading(state)
  }, [position, echelon, grade, institution, residence, employmentType])

  useEffect(() => {
    const FormEmployee = formikEmployeeRef?.current
    FormEmployee?.setFieldValue('type', '2', false)
  }, [formikEmployeeRef])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Tambah Pegawai Non ASN'}
      action={
        <Box>
          <Button text='Simpan' color='primary' onClick={handleSubmit} />
        </Box>
      }
    >
      <FormComponent
        mode='add'
        pageType='NON_ASN'
        formikRef={formikRef}
        isExpand={isExpand}
        options={options}
        onGetPositionType={handleGetPositionType}
        onChangeHierarchies={handleChangeHierarchies}
      />
    </LayoutPages>
  )
}

EmployeeAddComponent.propTypes = {
  employee: PropTypes.object,
  position: PropTypes.object,
  echelon: PropTypes.object,
  grade: PropTypes.object,
  institution: PropTypes.object,
  residence: PropTypes.object,
  employmentType: PropTypes.object,
  postEmployee: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default EmployeeAddComponent
