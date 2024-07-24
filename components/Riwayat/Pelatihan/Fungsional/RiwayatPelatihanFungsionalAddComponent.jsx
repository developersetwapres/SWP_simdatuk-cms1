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
import RiwayatPelatihanFungsionalForm from './RiwayatPelatihanFungsionalForm'
import moment from 'moment'
import { monthOptions } from 'libs/types/options'

const InitValue = {
  namaDiklat: '',
  noSurat: '',
  jenjang: '',
  tanggalPelaksanaan: '',
  penyelenggara: '',
  durasi: 0,
  materi: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      sertifikat: null
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaDiklat: Yup.string().required('Nama Diklat tidak boleh kosong'),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  noSurat: Yup.string().required('No Surat Perintah tidak boleh kosong'),
  tanggalPelaksanaan: Yup.string().required(
    'Tanggal Pelaksanaan tidak boleh kosong'
  ),
  pegawai: Yup.array()
    .of(
      Yup.object().shape({
        nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
        sertifikat: Yup.mixed()
          .nullable()
          .test('fileType', 'Format file harus PNG, JPG, atau PDF', (value) => {
            if (!value) return true
            const fileType = value && value.type
            return (
              fileType === 'image/png' ||
              fileType === 'image/jpeg' ||
              fileType === 'application/pdf'
            )
          })
          .test(
            'fileSize',
            'Ukuran file tidak boleh lebih dari 2MB',
            (value) => {
              if (!value) return true
              const fileSizeLimitInMB = 2
              const fileSizeInMB = value?.size / 1024 ** 2
              return fileSizeInMB <= fileSizeLimitInMB
            }
          )
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

const RiwayatPelatihanFungsionalAddComponent = ({
  training,
  employee,
  postTraining = () => { },
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
      employee: newEmployees || []
    }

    return data
  }, [employee])

  const handleGetValue = (value, type) => {
    if (type == 'employee') {
      const data = employee?.data
      const dataFilter = data.find(
        (itm) => itm?.employee_id_number === value?.split(' - ')[1]
      )?.id

      return dataFilter
    } else {
      const index = monthOptions.findIndex((itm) => itm == value) + 1

      return index
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const formData = new FormData()

      formData.append('name', values?.namaDiklat)
      formData.append(
        'period_month',
        handleGetValue(values?.periode?.bulan, 'month')
      )
      formData.append(
        'period_year',
        moment(values?.periode?.tahun).format('YYYY')
      )
      formData.append('reference_number', values?.noSurat)
      formData.append('level', values?.jenjang)
      formData.append(
        'start_date',
        moment(values?.tanggalPelaksanaan).format('YYYY-MM-DD')
      )
      if (values?.durasi) {
        formData.append('duration', values?.durasi)
      }

      if (values?.penyelenggara) {
        formData.append('organizer', values?.penyelenggara)
      }

      if (values?.materi) {
        formData.append('link', values?.materi)
      }

      formData.append('type', 2)

      values?.pegawai.map((item, index) => {
        formData.append(
          `users[${index}][user_id]`,
          handleGetValue(item?.nama, 'employee')
        )
        formData.append(`users[${index}][certificate]`, item?.sertifikat)
      })

      postTraining(formData)
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
    const state = !training?.loading && !employee?.loading
    onLoading(state)
  }, [training, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Pelatihan Fungsional'}
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
            <RiwayatPelatihanFungsionalForm
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

RiwayatPelatihanFungsionalAddComponent.propTypes = {
  training: PropTypes.object,
  employee: PropTypes.object,
  postTraining: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPelatihanFungsionalAddComponent
