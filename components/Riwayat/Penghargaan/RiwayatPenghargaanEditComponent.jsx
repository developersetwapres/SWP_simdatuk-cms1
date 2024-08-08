/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  namaPenghargaan: null,
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
  const [formValues, setFormValues] = useState(InitValue)

  const options = useMemo(() => {
    const newEmployees =
      employee?.data &&
      employee?.data.map((itm) => {
        return `${itm?.name} - ${itm?.employee_id_number}`
      })
    const newDecree = decree?.data && decree?.data.map((itm) => itm?.name)
    const newRecognitions =
      recognition?.options && recognition?.options.map((item) => item?.name)

    const data = {
      employee: newEmployees || [],
      decree: newDecree || [],
      month: monthOptions || [],
      recognitions: newRecognitions || []
    }

    return data
  }, [employee, decree, recognition])

  const handleGetValueId = (val, type) => {
    if (type == 'recognition') {
      const dataFilter = recognition?.options.find((item) => item?.name == val)
      return dataFilter?.id
    } else if (type == 'employee') {
      const dataFilter = employee?.data.find(
        (itm) => itm?.employee_id_number === val?.split(' - ')[1]
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

  const handleGetValue = (type, id) => {
    if (type == 'recognition') {
      const item =
        recognition?.options &&
        recognition?.options.find((item) => item?.id == id)

      return item?.name
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const id = atob(router?.query?.id)
      const users = values?.pegawai.map((itm, index) => {
        return {
          id: recognition?.detail?.users[index]?.id,
          user_id: handleGetValueId(itm?.nama, 'employee')
        }
      })

      const payload = {
        id,
        data: {
          recognition_id: handleGetValueId(
            values?.namaPenghargaan,
            'recognition'
          ),
          period_month: handleGetValueId(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          description: values?.keteranganPenghargaan || '',
          type_of_decree: handleGetValueId(values?.jenisSk, 'decree'),
          decree_date: moment(values?.tanggalSk).format('YYYY-MM-DD'),
          decree_number: values?.noSkPenghargaan,
          decree_year: values?.tahunSk
            ? moment(values?.tahunSk).format('YYYY')
            : '',
          awarding_institution: values?.instansi || '',
          date_of_receipt: values?.received
            ? moment(values?.received).format('YYYY-MM-DD')
            : '',
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
      !recognition?.loading || !employee?.loading || !decree?.loading
    // && Object.entries(recognition?.detail).length > 0
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

      const employees = detail?.users?.map((itm) => ({
        nama:
          itm?.name && itm?.employee_id_number
            ? `${itm?.name} - ${itm?.employee_id_number}`
            : null
      }))

      const filledValues = {
        namaPenghargaan: detail?.recognition_id,
        keteranganPenghargaan: detail?.description,
        jenisSk: decreeType,
        tanggalSk: decreeDate,
        noSkPenghargaan: detail?.decree_number,
        tahunSk: decreeYear,
        instansi: detail?.awarding_institution,
        received: receivDate,
        periode: {
          bulan: periodMonth,
          tahun: periodYear
        },
        pegawai: employees
      }
      setFormValues(filledValues)
    }
  }, [recognition?.detail, recognition])

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={formValues}
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
