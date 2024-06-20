/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatJabatanForm from './RiwayatPenghargaanForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import moment from 'moment'
import { monthOptions } from 'libs/types/options'

const InitValue = {
  namaPenghargaan: '',
  keteranganPenghargaan: '',
  jenisSk: null,
  tanggalSk: '',
  noSkPenghargaan: '',
  tahunSk: null,
  instansi: '',
  received: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaPenghargaan: Yup.string().required('Nama Penghargaan tidak boleh kosong'),
  jenisSk: Yup.string().required('Jenis SK tidak boleh kosong'),
  tanggalSk: Yup.string().required('Tanggal SK tidak boleh kosong'),
  noSkPenghargaan: Yup.string().required(
    'No SK Penghargaan tidak boleh kosong'
  ),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong')
    })
  )
})
const RiwayatPenghargaanEditComponent = ({
  recognition,
  employee,
  decree,
  getRecognition = () => {},
  updateRecognition = () => {},
  clearRecognitionState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })
    const newDecree = decree?.data.map((itm) => itm?.name)

    const data = {
      employee: newEmployees || [],
      decree: newDecree || [],
      month: monthOptions || []
    }

    return data
  }, [employee, decree])

  const handleGetValueId = (val, type) => {
    if (type == 'employee') {
      const dataFilter = employee?.data.find(
        (itm) => itm?.name == val.split(' - ')[0]
      )?.id

      return dataFilter
    } else if (type == 'month') {
      const index = monthOptions.findIndex((itm) => itm == val) + 1

      return index
    } else {
      const dataFilter = decree?.data.find((itm) => itm?.name == val)?.id

      return dataFilter
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const usersData = recognition?.detail?.users

      const id = atob(router?.query?.id)
      const users = values?.pegawai.map((itm) => {
        return {
          id: usersData.find((item) => item?.name == itm?.nama.split(' - ')[0])
            ?.id,
          user_id: handleGetValueId(itm?.nama, 'employee')
        }
      })

      const payload = {
        id,
        data: {
          name: values?.namaPenghargaan,
          period_month: handleGetValueId(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          description: values?.keteranganPenghargaan,
          type_of_decree: handleGetValueId(values?.jenisSk, 'decree'),
          decree_date: moment(values?.tanggalSk).format('YYYY-MM-DD'),
          decree_number: values?.noSkPenghargaan,
          decree_year: moment(values?.tahunSk).format('YYYY'),
          awarding_institution: values?.instansi,
          date_of_receipt: moment(values?.received).format('YYYY-MM-DD'),
          users
        }
      }

      updateRecognition(payload)
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

  const handleClearState = () => {
    formikRef.current.resetForm()
    clearRecognitionState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getRecognition(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !recognition?.loading &&
      !employee?.loading &&
      !decree?.loading &&
      Object.entries(recognition?.detail).length > 0
    onLoading(state)
  }, [recognition, employee, decree])

  useEffect(() => {
    const detail = recognition?.detail

    if (detail) {
      const periodYear =
        detail?.period_year && detail?.period_month
          ? new Date(detail?.period_year, detail?.period_month - 1)
          : null
      const periodMonth = monthOptions[detail?.period_month - 1] || null
      const decreeType =
        decree?.data.find((itm) => itm?.id == detail?.type_of_decree)?.name ||
        null
      const decreeDate = detail?.decree_date
        ? new Date(detail?.decree_date)
        : ''
      const decreeYear = detail?.decree_date
        ? new Date(detail?.decree_year, 0, 1)
        : null
      const receivDate = detail?.date_of_receipt
        ? new Date(detail?.date_of_receipt)
        : ''

      formikRef.current?.setFieldValue('namaPenghargaan', detail?.name, false)
      formikRef.current?.setFieldValue('periode.bulan', periodMonth, false)
      formikRef.current?.setFieldValue('periode.tahun', periodYear, false)
      formikRef.current?.setFieldValue(
        'keteranganPenghargaan',
        detail?.description,
        false
      )
      formikRef.current?.setFieldValue('jenisSk', decreeType, false)
      formikRef.current?.setFieldValue('tanggalSk', decreeDate, false)
      formikRef.current?.setFieldValue(
        'noSkPenghargaan',
        detail?.decree_number,
        false
      )
      formikRef.current?.setFieldValue('tahunSk', decreeYear, false)
      formikRef.current?.setFieldValue(
        'instansi',
        detail?.awarding_institution,
        false
      )
      formikRef.current?.setFieldValue('received', receivDate, false)
      detail?.users &&
        detail?.users.map((itm, idx) => {
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].nama`,
            itm?.name && itm?.employee_id_number
              ? `${itm?.name} - ${itm?.employee_id_number}`
              : null,
            false
          )
        })
    }
  }, [recognition?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat Penghargaan'}
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

RiwayatPenghargaanEditComponent.propTypes = {
  recognition: PropTypes.object,
  employee: PropTypes.object,
  decree: PropTypes.object,
  getRecognition: PropTypes.func,
  updateRecognition: PropTypes.func,
  clearRecognitionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPenghargaanEditComponent
