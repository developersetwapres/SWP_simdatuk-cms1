/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
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

const initValue = {
  name: '',
  type: null,
  status: false
}

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Jenis Pegawai tidak boleh kosong'),
  type: Yup.string().required('Pegawai tidak boleh kosong')
})

const MasterDataEmployementTypeAddComponent = ({
  employmentType,
  postEmploymentType = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const data = { type: ['ASN', 'NON ASN', 'OUTSOURCE'] }
    return data
  }, [])

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        name: values?.name,
        type: options['type'].findIndex((itm) => itm == values?.type) + 1,
        status: values?.status
      }

      postEmploymentType(payload)
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
    const state = !employmentType?.loading
    onLoading(state)
  }, [employmentType])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Data Jenis Pegawai'}
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

MasterDataEmployementTypeAddComponent.propTypes = {
  employmentType: PropTypes.object,
  postEmploymentType: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataEmployementTypeAddComponent
