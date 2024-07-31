/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
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
  show: true,
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

const MasterDataPositionAddComponent = ({
  echelon,
  position,
  postPosition = () => {},
  onFetchHierarchy = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [positions, setPositions] = useState([])

  const handleMapping = (val) => {
    const arr = []

    val.map((itm) => {
      arr.push(itm?.name)
    })

    return arr
  }

  const options = useMemo(() => {
    const newPositions = positions
      ? positions.map((itm) => handleMapping(itm))
      : []
    const newEchelons = echelon?.options ? handleMapping(echelon?.options) : []
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

  const handleGetValue = (type, value) => {
    if (type == 'parent') {
      const data = positions[positions.length - (positions.length > 1 ? 2 : 1)]
      const item = data.find((itm) => itm?.name == value)

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

      const position = values?.position
      const echelons = values?.echelons
      const parents = values?.parent
        .map((itm) => itm?.name)
        .filter((itm) => itm !== null)
      const isParents = parents.length > 0
      const parent = isParents && parents[parents?.length - 1]
      const entity = handleGetValue('entity', values?.entity)
      const isShow = values?.show
      const showOnPetaJabatan = values?.showOnPetaJabatan ? 1 : 0

      const payload = {
        name: values.name,
        parent_id: isParents ? handleGetValue('parent', parent)?.id : null,
        available: echelons[0]?.quantity || 0,
        type: position ? handleGetValue('positionType', position) : 1,
        entity,
        order: values?.order,
        status: showOnPetaJabatan,
        position_echelons: isShow
          ? echelons.map((itm) => {
              return {
                echelon_id: handleGetValue('echelon', itm?.name),
                available: itm?.quantity
              }
            })
          : []
      }
      postPosition(payload)
    } catch (err) {
      console.log('err', err)
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
      const dataPosition = positions[index]
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
    const state = !echelon?.loading
    onLoading(state)
  }, [echelon])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Data Jabatan'}
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

MasterDataPositionAddComponent.propTypes = {
  echelon: PropTypes.object,
  position: PropTypes.object,
  postPosition: PropTypes.func,
  onFetchHierarchy: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataPositionAddComponent
