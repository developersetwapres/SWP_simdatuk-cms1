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

const MasterDataUserAddComponent = ({
  user,
  role,
  employee,
  postUser = () => {},
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

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const payload = {
        user_id: filterData(values?.name, 'employee'),
        role_id: filterData(values?.role, 'roles'),
        username: values?.username,
        email: values?.email
      }

      postUser(payload)
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
    const state = !role?.loading && !employee?.loading
    onLoading(state)
  }, [role, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Data Pengguna'}
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

MasterDataUserAddComponent.propTypes = {
  user: PropTypes.object,
  role: PropTypes.object,
  employee: PropTypes.object,
  postUser: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataUserAddComponent
