/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, useFormik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import MasterDataEmployementTypeForm from './MasterDataEmployementTypeForm'
import { extractIdFromShortUuidUrl } from '@/utils'

const initValue = {
  name: '',
  type: null,
  status: false
}

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Jenis Pegawai tidak boleh kosong'),
  type: Yup.string().required('Pegawai tidak boleh kosong')
})

const MasterDataEmployementTypeEditComponent = ({
  employmentType,
  getEmploymentType = () => {},
  updateEmploymentType = () => {},
  clearEmploymentTypeState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const data = { type: ['ASN', 'NON ASN + PERBANTUAN', 'OUTSOURCING'] }
    return data
  }, [])

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        id: extractIdFromShortUuidUrl(router?.query),
        data: {
          name: values?.name,
          type: options['type'].findIndex((itm) => itm == values?.type) + 1,
          status: values?.status
        }
      }

      updateEmploymentType(payload)
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

  useEffect(() => {
    // Get Detail User
    const id = extractIdFromShortUuidUrl(router?.query)
    if (id) getEmploymentType(id)

    const clearState = () => {
      clearEmploymentTypeState()
      if (formikRef.current) {
        formikRef.current.resetForm()
      }
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearState)

    return () => {
      router.events.off('routeChangeComplete', clearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !employmentType?.loading &&
      Object.entries(employmentType?.detail).length > 0

    onLoading(state)
  }, [employmentType])

  useEffect(() => {
    const detail = employmentType?.detail

    if (detail) {
      formikRef.current?.setFieldValue('name', detail?.name, false)
      formikRef.current?.setFieldValue(
        'type',
        options['type'][detail?.type - 1],
        false
      )
      formikRef.current?.setFieldValue(
        'status',
        detail?.status == 1 ? true : false,
        false
      )
    }
  }, [employmentType?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Data Jenis Pegawai'}
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
            <MasterDataEmployementTypeForm
              options={options}
              formikRef={formikRef}
              {...formikProps}
            />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

MasterDataEmployementTypeEditComponent.propTypes = {
  employmentType: PropTypes.object,
  getEmploymentType: PropTypes.func,
  updateEmploymentType: PropTypes.func,
  onLoading: PropTypes.func,
  clearEmploymentTypeState: PropTypes.func
}

export default MasterDataEmployementTypeEditComponent
