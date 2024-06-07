/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatJabatanForm from './RiwayatPPKForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import { monthsOptions } from 'libs/months'
import moment from 'moment'

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
      nilai: Yup.string().required('Nilai Pegawai tidak boleh kosong')
    })
  )
})

const RiwayatPPKEditComponent = ({
  performance,
  employee,
  getPerformance = () => {},
  updatePerformance = () => {},
  clearPerformanceState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })

    const data = {
      month: monthsOptions || [],
      employee: newEmployees,
      keterangan: ['Kurang', 'Sedang', 'Cukup', 'Baik', 'Sangat Baik']
    }

    return data
  }, [employee])

  const handleGetValue = (value, type) => {
    if (type == 'employee') {
      const data = employee?.data
      const dataFilter = data.find(
        (itm) => itm?.name == value.split(' - ')[0]
      )?.id

      return dataFilter
    } else if (type == 'month') {
      const index = monthsOptions.findIndex((itm) => itm == value) + 1

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

      const usersData = performance?.detail?.users

      const id = atob(router?.query?.id)
      const users = values?.pegawai.map((itm) => {
        return {
          id: usersData.find((item) => item?.name == itm?.nama.split(' - ')[0])
            ?.id,
          user_id: handleGetValue(itm?.nama, 'employee'),
          work_performance_score: itm?.nilai,
          description: handleGetValue(itm?.keterangan, 'keterangan')
        }
      })

      const payload = {
        id,
        data: {
          name: values?.namaPPK,
          period_month: handleGetValue(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          performance_period: values?.periodePPK,
          users
        }
      }

      updatePerformance(payload)
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

  const handleClearState = () => {
    formikRef.current.resetForm()
    clearPerformanceState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getPerformance(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !performance?.loading &&
      !employee?.loading &&
      Object.entries(performance?.detail).length > 0
    onLoading(state)
  }, [performance, employee])

  useEffect(() => {
    const detail = performance?.detail

    if (Object.entries(detail).length > 0) {
      const periodYear = new Date(detail?.period_year, detail?.period_month - 1)
      const year = new Date(detail?.year, 0, 1)

      formikRef.current?.setFieldValue('namaPPK', detail?.name, false)
      formikRef.current?.setFieldValue(
        'periode.bulan',
        options['month'][detail?.period_month - 1],
        false
      )
      formikRef.current?.setFieldValue('periode.tahun', periodYear, false)
      formikRef.current?.setFieldValue(
        'periodePPK',
        detail?.performance_period,
        false
      )

      detail?.users &&
        detail?.users.map((itm, idx) => {
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].nama`,
            itm?.name && itm?.employee_id_number
              ? `${itm?.name} - ${itm?.employee_id_number}`
              : null,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].nilai`,
            itm?.work_performance_score,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].keterangan`,
            options['keterangan'][itm?.description - 1],
            false
          )
        })
    }
  }, [performance?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat PPK'}
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
            <RiwayatJabatanForm
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

RiwayatPPKEditComponent.propTypes = {
  performance: PropTypes.object,
  employee: PropTypes.object,
  getPerformance: PropTypes.func,
  updatePerformance: PropTypes.func,
  clearPerformanceState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPPKEditComponent
