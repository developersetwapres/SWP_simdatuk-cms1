/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import MasterDataInstitutionForm from './MasterDataInstitutionForm'

const InitValue = {
  name: ''
}

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Nama Instansi tidak boleh kosong')
})

const MasterDataInstitutionAddComponent = ({
  institution,
  onLoading = () => {},
  postInstitution = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        name: values.name
      }

      postInstitution(payload)
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
    const state = !institution?.loading
    onLoading(state)
  }, [institution])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Data Instansi'}
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
            <MasterDataInstitutionForm formikRef={formikRef} {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

MasterDataInstitutionAddComponent.propTypes = {
  institution: PropTypes.object,
  onLoading: PropTypes.func,
  postInstitution: PropTypes.func
}

export default MasterDataInstitutionAddComponent
