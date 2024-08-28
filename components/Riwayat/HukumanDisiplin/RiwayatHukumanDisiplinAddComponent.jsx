/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatHukumanDisiplinForm from './RiwayatHukumanDisiplinForm'
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
  namaHukumanDisiplin: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      golongan: '',
      jabatan: '',
      jenisHukuman: null,
      tingkatHukuman: '',
      potonganTunjangan: '',
      potonganWaktu: '',
      noSkHukuman: '',
      tanggalSkHukuman: '',
      tanggalHukuman: null,
      pejabatBerwenang: '',
      namaPejabatBerwenang: ''
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaHukumanDisiplin: Yup.string().required(
    'Nama Hukuman Disiplin tidak boleh kosong'
  ),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
      jenisHukuman: Yup.string().required('Jenis Hukuman tidak boleh kosong'),
      tanggalHukuman: Yup.object()
        .shape({
          from: Yup.string().required('Pilih tanggal awal'),
          to: Yup.string().required('Pilih tanggal akhir')
        })
        .required('Tanggal Hukuman tidak boleh kosong')
    })
  )
})

const RiwayatHukumanDisiplinAddComponent = ({
  disciplinary,
  employee,
  postDisciplinary = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const discipleType = useMemo(() => {
    return disciplinary?.options || []
  }, [disciplinary])

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })
    const newDiscipleType = discipleType.map((itm) => itm?.name)

    const data = {
      month: monthOptions || [],
      employee: newEmployees,
      employees: employee?.data,
      jenisHukuman: newDiscipleType,
      discipleType
    }

    return data
  }, [discipleType, disciplinary, employee])

  const handleGetValue = (value, type) => {
    if (type == 'employee') {
      const data = employee?.data
      const dataFilter = data.find(
        (itm) => itm?.employee_id_number === value?.split(' - ')[1]
      )?.id

      return dataFilter
    } else if (type == 'month') {
      const index = monthOptions.findIndex((itm) => itm == value) + 1

      return index
    } else if (type == 'discipleType') {
      const val = discipleType.find((itm) => itm?.name == value)?.id

      return val
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const users = values?.pegawai.map((itm) => {
        return {
          user_id: handleGetValue(itm?.nama, 'employee'),
          grade: itm?.golongan || null,
          position: itm?.jabatan || null,
          disciplinary_id: handleGetValue(itm?.jenisHukuman, 'discipleType'),
          decree_number: itm?.noSkHukuman || null,
          date_of_decree: itm?.tanggalSkHukuman
            ? moment(itm?.tanggalSkHukuman).format('YYYY-MM-DD')
            : null,
          start_date: moment(itm?.tanggalHukuman?.from).format('YYYY-MM-DD'),
          end_date: moment(itm?.tanggalHukuman?.to).format('YYYY-MM-DD'),
          authorizing_officer: itm?.pejabatBerwenang || null,
          name_of_authorizing_officer: itm?.namaPejabatBerwenang || null
        }
      })

      const payload = {
        name: values?.namaHukumanDisiplin,
        period_month: handleGetValue(values?.periode?.bulan, 'month'),
        period_year: moment(values?.periode?.tahun).format('YYYY'),
        users
      }

      postDisciplinary(payload)
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
    const state = !disciplinary?.loading && !employee?.loading
    onLoading(state)
  }, [disciplinary, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Hukuman Disiplin'}
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
            <RiwayatHukumanDisiplinForm
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

RiwayatHukumanDisiplinAddComponent.propTypes = {
  disciplinary: PropTypes.object,
  employee: PropTypes.object,
  postDisciplinary: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatHukumanDisiplinAddComponent
