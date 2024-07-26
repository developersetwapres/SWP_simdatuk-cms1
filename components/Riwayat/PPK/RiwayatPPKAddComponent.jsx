/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatPPKForm from './RiwayatPPKForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import moment from 'moment'
import { monthOptions, ppkDescOptions } from 'libs/types/options'

const InitValue = {
  namaPPK: '',
  periodePPK: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      nilai: null,
      keterangan: null
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaPPK: Yup.string().required('Nama PPK tidak boleh kosong'),
  periodePPK: Yup.string().required('Periode PPK tidak boleh kosong'),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
      nilai: Yup.string()
        .transform((value, originalValue) =>
          originalValue?.trim() === '' ? null : value
        )
        .nullable()
        .required('Nilai Pegawai tidak boleh kosong')
        .test(
          'min',
          'Nilai Pegawai tidak boleh 0',
          (value) => value !== null && Number(value) >= 1
        )
        .test(
          'max',
          'Nilai Pegawai tidak boleh lebih dari 100',
          (value) => value !== null && Number(value) <= 100
        )
    })
  )
})

const RiwayatPPKAddComponent = ({
  performance,
  employee,
  postPerformance = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })

    const data = {
      month: monthOptions || [],
      employee: newEmployees,
      keterangan: ppkDescOptions
    }

    return data
  }, [employee])

  const handleGetValue = (value, type) => {
    if (type == 'employee') {
      const data = employee?.data
      const dataFilter = data?.find(
        (itm) => itm?.employee_id_number === value.split(' - ')[1]
      )?.id

      return dataFilter
    } else if (type == 'month') {
      const index = monthOptions.findIndex((itm) => itm == value) + 1

      return index
    } else {
      const index = options['keterangan'].findIndex((itm) => itm == value) + 1

      return index
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const users = values?.pegawai?.map((itm) => {
        return {
          user_id: handleGetValue(itm?.nama, 'employee'),
          work_performance_score: itm?.nilai,
          description: itm?.keterangan ?
            handleGetValue(itm?.keterangan, 'keterangan') : null
        }
      })

      const payload = {
        name: values?.namaPPK,
        period_month: handleGetValue(values?.periode?.bulan, 'month'),
        period_year: moment(values?.periode?.tahun).format('YYYY'),
        performance_period: values?.periodePPK,
        users
      }

      postPerformance(payload)
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
    const state = !performance?.loading && !employee?.loading
    onLoading(state)
  }, [performance, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat PPK'}
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
            <RiwayatPPKForm
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

RiwayatPPKAddComponent.propTypes = {
  performance: PropTypes.object,
  employee: PropTypes.object,
  postPerformance: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPPKAddComponent
