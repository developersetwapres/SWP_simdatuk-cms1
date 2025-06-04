/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
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

const MasterDataInstitutionEditComponent = ({
  institution,
  onLoading = () => {},
  getInstitution = () => {},
  updateInstitution = () => {},
  clearInstitutionState = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        id: atob(router?.query?.id),
        data: {
          name: values.name
        }
      }

      updateInstitution(payload)
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
    const id = router?.query?.id
    if (id) getInstitution(atob(id))

    const clearState = () => {
      clearInstitutionState()
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
      !institution?.loading && Object.entries(institution?.detail).length > 0

    onLoading(state)
  }, [institution])

  useEffect(() => {
    const detail = institution?.detail

    if (detail) {
      formikRef.current?.setFieldValue('name', detail?.name, false)
    }
  }, [institution?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Data Instansi'}
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

MasterDataInstitutionEditComponent.propTypes = {
  institution: PropTypes.object,
  onLoading: PropTypes.func,
  getInstitution: PropTypes.func,
  updateInstitution: PropTypes.func,
  clearInstitutionState: PropTypes.func
}

export default MasterDataInstitutionEditComponent
