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
  const formikPositionsRef = useRef(null)

  const [positions, setPositions] = useState([])
  const [isExpand, setIsExpand] = useState(false)

  const formikRef = useMemo(() => {
    return {
      formikEmployeeRef,
      formikPositionsRef
    }
  }, [formikEmployeeRef, formikPositionsRef])

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
    const FormPositions = formikPositionsRef?.current

    const formsToValidate = [FormEmployee, FormPositions].filter(Boolean)

    if (!formsToValidate) return null

    try {
      await Promise.all(
        formsToValidate.map(async (form) => {
          const res = await form.validateForm()

          if (res?.errors && Object.keys(res?.errors).length > 0)
            throw new Error('Form not valid!')
        })
      )

      const refValidate = [formikEmployeeRef, formikPositionsRef]

      const allFormsValid = refValidate.every(
        (form) =>
          form?.current?.errors &&
          Object.keys(form?.current?.errors).length === 0
      )

      if (allFormsValid) {
        const employee = FormEmployee?.values
        const positions = FormPositions?.values?.positions || []

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
          handleGetValueID('religion', employee?.religion, null)
        )
        formData.append('gender', employee?.gender == 'Laki-Laki' ? 1 : 0)
        formData.append(
          'marital_status',
          handleGetValueID('marital', employee?.maritalStatus, null)
        )
        formData.append(
          'employment_type_id',
          handleGetValueID('employmentType', employee?.employmentType, null)
        )
        formData.append(
          'cpns_effective_date',
          handleFormatDate(employee?.dateStartedWork, 'YYYY-MM-DD')
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
          handleGetValueID('grade', employee?.grade, null)
        )
        formData.append(
          'grade_effective_date',
          handleFormatDate(employee?.gradeEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'echelon_id',
          employee?.echelon
            ? handleGetValueID('echelon', employee?.echelon, null)
            : ''
        )
        formData.append(
          'echelon_effective_date',
          handleFormatDate(employee?.echelonEffectiveDate, 'YYYY-MM-DD')
        )
        formData.append(
          'institution_id',
          handleGetValueID('institution', employee?.institution, null)
        )
        formData.append(
          'education_level',
          handleGetValueID(
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
        formData.append(
          'employee_id_card',
          !employee?.employeeIdCard ||
            typeof employee?.employeeIdCard == 'string'
            ? ''
            : employee?.employeeIdCard
        )
        formData.append(
          'karisu_number',
          ''
          // employee?.karisu
        )
        formData.append('id_tax', employee?.taxId)
        formData.append(
          'employment_status',
          handleGetValueID('employeeStatus', employee?.employmentStatus, null)
        )
        formData.append(
          'family_registration_number',
          employee?.familyRegistNumber
        )
        formData.append('id_number', employee?.idNumber)
        formData.append(
          'residence_id',
          employee?.residence
            ? handleGetValueID('residence', employee?.residence, null)
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
          'delete_employee_id_card',
          employee?.employeeIdCard ? 0 : 1
        )
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

        // History Positions
        if (positions.length > 0) {
          positions.map((item, index) => {
            formData.append(`positions[${index}][id]`, item?.id || '')
            formData.append(`positions[${index}][position]`, item?.position)
            formData.append(
              `positions[${index}][group_id]`,
              handleGetValueID('group', item?.group)
            )
            formData.append(
              `positions[${index}][echelon]`,
              item?.level ? handleGetValueID('echelon', item?.level) : ''
            )
            formData.append(
              `positions[${index}][position_status]`,
              item?.description
                ? handleGetValueID('positionDescription', item?.description)
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
                ? handleGetValueID('decreeType', item?.decreeType)
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
              item?.terminationDecree
            )
            formData.append(
              `positions[${index}][type_of_termination_decree]`,
              item?.terminationDecreeType
                ? handleGetValueID('decreeType', item?.terminationDecreeType)
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
          formData.append(`positions`, '')
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
    formikPositionsRef
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
    formikPositionsRef?.current?.resetForm()
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
      !group?.loading &&
      !employmentType?.loading
    onLoading(state)
  }, [
    position,
    echelon,
    grade,
    institution,
    residence,
    decree,
    disciplinary,
    group,
    employmentType
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
      const FormPositions = formikPositionsRef?.current

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
      const educationYear = detail?.education_year
        ? moment(detail?.education_year, 'YYYY').toDate()
        : null
      const quitDate = detail?.quit_date
        ? moment(detail?.quit_date, 'DD-MM-YYYY').toDate()
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
        handleGetValue('marital', detail?.marital_status),
        false
      )
      FormEmployee?.setFieldValue(
        'employmentType',
        handleGetValue('employmentType', detail?.employment_type_id),
        false
      )
      FormEmployee?.setFieldValue('dateStartedWork', cpnsEffectiveDate, false)
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
      summary={'Edit Pegawai Non ASN'}
      action={
        <Box>
          <Button text='Simpan' color='primary' onClick={handleSubmit} />
        </Box>
      }
    >
      <FormComponent
        mode='edit'
        pageType='NON_ASN'
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
