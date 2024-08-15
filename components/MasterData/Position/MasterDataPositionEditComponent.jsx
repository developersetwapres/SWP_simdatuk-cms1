/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import MasterDataPositionForm from './MasterDataPositionForm'
import { entityOptions, positionTypeOptions } from 'libs/types/options'

const InitValue = {
  show: false,
  showOnPetaJabatan: false,
  entity: null,
  name: '',
  order: null,
  position: null,
  echelons: [
    {
      name: null,
      quantity: ''
    }
  ],
  parent: [{ name: null }]
}

const FormSchema = Yup.object().shape({
  show: Yup.boolean(),
  showOnPetaJabatan: Yup.boolean(),
  entity: Yup.string().required('Tipe Entitas tidak boleh kosong'),
  name: Yup.string().required('Nama Jabatan tidak boleh kosong'),
  order: Yup.string().required('Urutan tidak boleh kosong'),
  position: Yup.string()
    .nullable()
    .test('required', 'Nama Jabatan tidak boleh kosong', function (value) {
      const { entity } = this.parent

      if (entity === 'Orang' && !value) return false

      return true
    }),
  echelons: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .nullable()
        .test('required', 'Echelon tidak boleh kosong', function (value) {
          const { show, entity, position } = this?.from[1]?.value

          if (
            show &&
            entity === 'Orang' &&
            (!position || position !== 'Outsourcing') &&
            !value
          ) {
            return false
          }

          return true
        }),
      quantity: Yup.string()
        .nullable()
        .test(
          'required',
          'Jumlah yang diperlukan tidak boleh kosong',
          function (value) {
            const { entity } = this?.from[1]?.value

            if (entity === 'Orang' && !value) return false

            return true
          }
        )
    })
  )
})
const MasterDataPositionEditComponent = ({
  echelon,
  position,
  getPosition = () => {},
  updatePosition = () => {},
  onFetchHierarchy = () => {},
  clearPositionState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [positions, setPositions] = useState([])

  const handleMapping = (type, val) => {
    if (type == 'positions') {
      const detail = position?.detail
      const hierarchies = detail?.hierarchies || []

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
      let arr = []

      val.map((itm) => {
        arr.push(itm?.name)
      })

      return arr
    }
  }

  const options = useMemo(() => {
    const newPositions = positions ? handleMapping('positions', positions) : []
    const newEchelons = echelon?.options
      ? handleMapping('echelons', echelon?.options)
      : []
    const newOrders = position?.orders
      ? position?.orders.map((itm) => {
          return `${itm}`
        })
      : []

    const dataOptions = {
      echelons: newEchelons,
      orders: newOrders,
      positions: newPositions,
      positionType: positionTypeOptions,
      entity: entityOptions
    }

    return dataOptions
  }, [echelon, positions])

  const handleGetValue = (type, value, idx) => {
    if (type == 'parent') {
      const data = positions[idx]
      const item = data.find((itm) => itm?.name == value)?.id

      return item
    } else if (type == 'echelon') {
      const item = echelon?.options.find((itm) => itm?.name == value)?.id

      return item
    } else {
      const item = options[type].findIndex((itm) => itm == value) + 1

      return item
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const id = atob(router?.query?.id)
      const echelonsDetail = position?.detail?.echelons

      const type = values?.position
      const echelons = values?.echelons
      const parents = values?.parent
        .map((itm) => itm?.name)
        .filter((itm) => itm !== null)
      const isParents = parents.length > 0
      const indexParent = parents?.length - 1
      const parent = isParents && parents[indexParent]
      const entity = handleGetValue('entity', values?.entity, '')
      const isShow = values?.show
      const showOnPetaJabatan = values?.showOnPetaJabatan ? 1 : 0

      const deletedEchelon = echelonsDetail
        .filter((item) => !echelons.some((itm) => itm?.name == item?.name))
        .map((itm) => itm?.id)

      const payload = {
        id,
        data: {
          name: values.name,
          parent_id: isParents
            ? handleGetValue('parent', parent, indexParent)
            : null,
          available: echelons[0]?.quantity || 0,
          type: type ? handleGetValue('positionType', type, '') : 1,
          entity,
          order: values?.order,
          deleted_echelon_id: deletedEchelon,
          status: showOnPetaJabatan,
          position_echelons: isShow
            ? echelons.map((itm) => {
                return {
                  id:
                    echelonsDetail.find((item) => item?.name == itm?.name)
                      ?.id || null,
                  echelon_id: handleGetValue('echelon', itm?.name, ''),
                  available: itm?.quantity
                }
              })
            : []
        }
      }
      updatePosition(payload)
    } catch (err) {
      if (!err.inner || err.inner.length === 0) {
        return
      }

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

  const handleChangeHierarchies = (val, type) => {
    const datas = val.filter((itm) => itm?.name !== null)

    if (datas.length > 0) {
      const length = datas?.length
      const index = length - 1
      const item = datas[index]?.name
      const dataPosition = positions[index] || []
      const lengthPositions = positions.length

      if (length < lengthPositions) {
        const newPositions = positions.slice(0, length + 1)
        setPositions(newPositions)
      }

      if (dataPosition.length > 0) {
        const itemId = dataPosition.find((itm) => itm?.name == item)?.id
        onFetchHierarchy(itemId, type)
      }
    } else {
      const newPositions = positions.length > 0 ? positions.slice(0, 1) : []
      setPositions(newPositions)
    }
  }

  const handleFetchHierarchies = (positionType) => {
    if (positionType) {
      const type = positionType !== 'Outsourcing' ? [1, 2] : [3]
      onFetchHierarchy('', type)
      setPositions([])
    } else {
      setPositions([])
    }
  }

  const handleSetDefaultValue = (detail) => {
    const hierarchies = detail?.hierarchies || []
    const echelons = detail?.echelons || []
    const echelon = echelons ? echelons[0] : []
    const isShow = echelon?.name ? true : false
    const isShowingOnPetaJabatan = detail?.status === 1

    formikRef.current?.setFieldValue('show', isShow, false)
    formikRef.current?.setFieldValue(
      'showOnPetaJabatan',
      isShowingOnPetaJabatan,
      false
    )
    formikRef.current?.setFieldValue('name', detail?.name, false)
    formikRef.current?.setFieldValue('entity', detail?.entity?.name, false)
    formikRef.current?.setFieldValue('order', `${detail?.order}`, false)
    formikRef.current?.setFieldValue('position', detail?.type?.name, false)

    handleFetchHierarchies(detail?.type?.name)

    echelons.map((itm, idx) => {
      formikRef.current?.setFieldValue(
        `echelons[${idx}].name`,
        itm?.name,
        false
      )
      formikRef.current?.setFieldValue(
        `echelons[${idx}].quantity`,
        itm?.available,
        false
      )
    })

    hierarchies.map((itm, idx) => {
      onFetchHierarchy(
        itm?.id,
        detail?.type?.name !== 'Outsourcing' ? [1, 2] : [3]
      )
      formikRef.current?.setFieldValue(`parent[${idx}].name`, itm?.name, false)
    })
  }

  useEffect(() => {
    const handleClear = () => {
      if (formikRef.current) formikRef.current.resetForm()
      clearPositionState()
    }

    // Get Detail User
    const id = router?.query?.id
    if (id) {
      getPosition(atob(id))
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClear)

    return () => {
      router.events.off('routeChangeComplete', handleClear)
    }
  }, [router])

  useEffect(() => {
    const state = !echelon?.loading
    onLoading(state)
  }, [echelon])

  useEffect(() => {
    const detail = position?.detail
    if (detail) {
      if (formikRef.current) formikRef.current.resetForm()

      setTimeout(() => {
        handleSetDefaultValue(detail)
      }, 100)
    }
  }, [position?.detail])

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

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Data Jabatan'}
          handleBack={() => router.back()}
          action={
            <Box>
              <Button
                text='Simpan'
                onClick={() => handleSubmit(formikProps?.values)}
              />
            </Box>
          }
        >
          <Card>
            <MasterDataPositionForm
              options={options}
              formikRef={formikRef}
              isPositionsLoading={positions?.loading}
              onChangeHierarchies={handleChangeHierarchies}
              onFetchHierarchy={handleFetchHierarchies}
              {...formikProps}
            />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

MasterDataPositionEditComponent.propTypes = {
  echelon: PropTypes.object,
  position: PropTypes.object,
  getPosition: PropTypes.func,
  updatePosition: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  clearPositionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataPositionEditComponent
