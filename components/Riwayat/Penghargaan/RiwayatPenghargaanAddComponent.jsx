/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatPenghargaanForm from './RiwayatPenghargaanForm'
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

const RiwayatPenghargaanAddComponent = ({
  recognition,
  employee,
  decree,
  postRecognition = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

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
        (itm) => itm?.name == val.split(' - ')[0]
      )
      return dataFilter?.id
    } else if (type == 'month') {
      const index = options['month'].findIndex((itm) => itm == val)
      return index + 1
    } else {
      const dataFilter = decree?.data.find((itm) => itm?.name == val)
      return dataFilter?.id
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const users = values?.pegawai.map((itm) => {
        return {
          user_id: handleGetValueId(itm?.nama, 'employee')
        }
      })

      const payload = {
        recognition_id: handleGetValueId(
          values?.namaPenghargaan,
          'recognition'
        ),
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

      postRecognition(payload)
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
    const state = !recognition?.loading && !employee?.loading
    onLoading(state)
  }, [recognition, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Penghargaan'}
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
            <RiwayatPenghargaanForm
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

RiwayatPenghargaanAddComponent.propTypes = {
  recognition: PropTypes.object,
  employee: PropTypes.object,
  decree: PropTypes.object,
  postRecognition: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPenghargaanAddComponent
