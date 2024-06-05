/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatJabatanForm from './RiwayatJabatanForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import moment from 'moment'
import { monthsOptions } from 'libs/months'

const InitValue = {
  namaJabatan: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      jabatan: null,
      jenjangJabatan: null,
      keteranganJabatan: null,
      tmt: '',
      noSk: ''
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaJabatan: Yup.string().required('Nama Jabatan tidak boleh kosong'),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array()
    .of(
      Yup.object().shape({
        nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
        jabatan: Yup.string().required('Jabatan tidak boleh kosong'),
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

const RiwayatJabatanAddComponent = ({
  position,
  echelon,
  employee,
  postPosition = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEchelons = echelon?.data.map((itm) => itm?.name)
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })

    const data = {
      jenjangJabatan: newEchelons,
      employee: newEmployees,
      keteranganJabatan: ['Promosi', 'Mutasi', 'Inpassing', 'Konversi'],
      month: monthsOptions || []
    }

    return data
  }, [echelon, employee])

  const handleGetValueId = (val, type) => {
    if (type == 'echelon') {
      const dataFilter = echelon?.data.find((itm) => itm?.name == val)
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
      const index = options['keteranganJabatan'].findIndex((itm) => itm == val)
      return index + 1
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const users = values?.pegawai.map((itm) => {
        return {
          user_id: handleGetValueId(itm?.nama, 'employee'),
          position: itm?.jabatan,
          echelon: handleGetValueId(itm?.jenjangJabatan, 'echelon'),
          position_status: handleGetValueId(
            itm?.keteranganJabatan,
            'ketJabatan'
          ),
          effective_date: moment(itm?.tmt).format('YYYY-MM-DD'),
          decree: itm?.noSk
        }
      })

      const payload = {
        name: values?.namaJabatan,
        period_month: handleGetValueId(values?.periode?.bulan, 'month'),
        period_year: moment(values?.periode?.tahun).format('YYYY'),
        users
      }

      postPosition(payload)
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
    const state = !employee?.loading && !echelon?.loading && !position?.isSubmit
    onLoading(state)
  }, [employee, echelon, position])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Jabatan'}
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

RiwayatJabatanAddComponent.propTypes = {
  position: PropTypes.object,
  echelon: PropTypes.object,
  employee: PropTypes.object,
  postPosition: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatJabatanAddComponent
