/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import MasterDataUserForm from './MasterDataUserForm'
import { extractIdFromShortUuidUrl } from '@/utils'

const InitValue = {
  username: '',
  email: '',
  name: '',
  role: ''
}

const FormSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Username harus memiliki minimal 6 karakter')
    .required('Username tidak boleh kosong'),
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email tidak boleh kosong'),
  name: Yup.string().required('Nama/NIP tidak boleh kosong'),
  role: Yup.string().required('Role Pengguna tidak boleh kosong')
})

const MasterDataUserEditComponent = ({
  user,
  role,
  employee,
  getUser = () => {},
  updateUser = () => {},
  clearUserState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    let options = {}

    // Mapping options roles
    if (role?.data)
      options = {
        ...options,
        roles: role?.data.map((itm) => {
          return itm?.name
        })
      }

    // Mapping options employees
    if (employee?.data)
      options = {
        ...options,
        employees: employee?.data.map((itm) => {
          return `${itm?.name} - ${itm?.employee_id_number}`
        })
      }

    return options
  }, [role, employee])

  const filterData = (val, type) => {
    if (type == 'roles') {
      return role?.data?.filter((itm) => itm?.name == val)[0]?.id
    } else {
      const newVal = val.split(' - ')[0]
      return employee?.data?.filter((itm) => itm?.name == newVal)[0]?.id
    }
  }

  const handleClearState = () => {
    clearUserState()
    formikRef.current.resetForm()
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const id = extractIdFromShortUuidUrl(router?.query)
      const payload = {
        user_id: filterData(values?.name, 'employee'),
        role_id: filterData(values?.role, 'roles'),
        username: values?.username,
        email: values?.email
      }

      updateUser(id, payload)
    } catch (err) {
      if (!err.inner || err.inner.length === 0) return

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
    if (id) getUser(id)
  }, [router])

  useEffect(() => {
    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const detail = user?.detail
    if (detail) {
      formikRef.current?.setFieldValue('username', detail?.username, false)
      formikRef.current?.setFieldValue('email', detail?.email, false)
      formikRef.current?.setFieldValue(
        'name',
        `${detail?.name} - ${detail?.employee_id_number}`,
        false
      )
      formikRef.current?.setFieldValue('role', detail?.role?.name, false)
    }
  }, [user?.detail])

  useEffect(() => {
    const state = !user?.loading && !role?.loading && !employee?.loading
    onLoading(state)
  }, [user?.loading, role?.loading, employee?.loading])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Data Pengguna'}
          handleBack={() => router.back()}
          action={
            <Box>
              <Button
                text='Simpan'
                isBusy={user?.loading}
                onClick={() => handleSubmit(formikProps?.values)}
              />
            </Box>
          }
        >
          <Card>
            <MasterDataUserForm
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

MasterDataUserEditComponent.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
  employee: PropTypes.object,
  getUser: PropTypes.func,
  updateUser: PropTypes.func,
  clearUserState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataUserEditComponent
