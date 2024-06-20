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
import RiwayatGolonganForm from './RiwayatGolonganForm'
import moment from 'moment'
import { monthOptions } from 'libs/types/options'

const InitValue = {
  namaGolongan: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      golongan: null,
      tmt: '',
      noSk: ''
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaGolongan: Yup.string().required('Nama Golongan tidak boleh kosong'),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array()
    .of(
      Yup.object().shape({
        nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
        golongan: Yup.string().required('Golongan tidak boleh kosong'),
        tmt: Yup.string().required('TMT Pegawai tidak boleh kosong')
      })
    )
    .test('is-unique', 'Nama Pegawai harus unik', function (values) {
      const names = new Map()
      const duplicateNames = new Set()

      values.forEach((pegawai, index) => {
        const { nama } = pegawai
        if (names.has(nama)) {
          duplicateNames.add({ nama, index })
        } else {
          names.set(nama, index)
        }
      })

      if (duplicateNames.size > 0) {
        const errors = []
        duplicateNames.forEach((item) => {
          errors.push(
            new Yup.ValidationError(
              `Nama Pegawai tidak boleh sama`,
              null,
              `pegawai[${item.index}].nama`
            )
          )
        })
        throw new Yup.ValidationError(errors)
      }

      return true
    })
})

const RiwayatGolonganAddComponent = ({
  grade,
  employee,
  postGrade = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newGrade = grade?.options?.map((itm) => itm?.name)
    const newEmployee = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })

    const data = {
      month: monthOptions || [],
      golongan: newGrade || [],
      employee: newEmployee || []
    }

    return data
  }, [employee, grade])

  const handleGetValueId = (val, type) => {
    if (type == 'employee') {
      const dataFilter = employee?.data.find(
        (itm) => itm?.name == val.split(' - ')[0]
      )
      return dataFilter?.id
    } else if (type == 'grade') {
      const dataFilter = grade?.options.find((itm) => itm?.name == val)
      return dataFilter?.id
    } else {
      const index = options['month'].findIndex((itm) => itm == val)
      return index + 1
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const users = values?.pegawai.map((itm) => {
        return {
          id: handleGetValueId(itm?.nama, 'employee'),
          user_id: handleGetValueId(itm?.nama, 'employee'),
          grade_id: handleGetValueId(itm?.golongan, 'grade'),
          effective_date: moment(itm?.tmt).format('YYYY-MM-DD'),
          decree_number: itm?.noSk,
          status: 1
        }
      })

      const payload = {
        name: values?.namaGolongan,
        period_month: handleGetValueId(values?.periode?.bulan, 'month'),
        period_year: moment(values?.periode?.tahun).format('YYYY'),
        users
      }

      postGrade(payload)
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
    const state = !grade?.loading && !employee?.loading
    onLoading(state)
  }, [grade, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Golongan'}
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
            <RiwayatGolonganForm
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

RiwayatGolonganAddComponent.propTypes = {
  grade: PropTypes.object,
  employee: PropTypes.object,
  postGrade: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatGolonganAddComponent
