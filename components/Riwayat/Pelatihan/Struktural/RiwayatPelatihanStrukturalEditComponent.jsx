/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes, { object } from 'prop-types'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import RiwayatPelatihanStrukturalForm from './RiwayatPelatihanStrukturalForm'
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
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
      sertifikat: Yup.mixed()
        .nullable()
        .test('fileType', 'Format file harus PNG, JPG, atau PDF', (value) => {
          if (!value || typeof value !== 'object') return true
          const fileType = value && value.type
          return (
            fileType === 'image/png' ||
            fileType === 'image/jpeg' ||
            fileType === 'application/pdf'
          )
        })
        .test('fileSize', 'Ukuran file tidak boleh lebih dari 2MB', (value) => {
          if (!value || typeof value !== 'object') return true
          return value.size <= 2000
        })
    })
  )
})

const RiwayatPelatihanStrukturalEditComponent = ({
  training,
  employee,
  getTraining = () => { },
  updateTraining = () => { },
  clearTrainingState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEmployees = employee?.data?.map((itm) => {
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
      const dataFilter = data
        ?.find((itm) => itm?.employee_id_number === value.split(' - ')[1])
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

      const id = atob(router?.query?.id)
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

      formData.append('type', 1)

      values?.pegawai.map((item, index) => {
        formData.append(
          `users[${index}][id]`,
          training?.detail?.users[index]?.id || ''
        )
        formData.append(
          `users[${index}][user_id]`,
          handleGetValue(item?.nama, 'employee')?.id || ''
        )
        formData.append(
          `users[${index}][certificate]`,
          item?.sertifikat && typeof item?.sertifikat == 'object'
            ? item?.sertifikat
            : ''
        )
        formData.append(
          `users[${index}][delete_certificate]`,
          item?.sertifikat &&
            (typeof item?.sertifikat == 'object' ||
              typeof item?.sertifikat == 'string')
            ? 0
            : 1
        )
      })
      updateTraining({ id, data: formData })
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
    clearTrainingState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getTraining(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !training?.loading &&
      !employee?.loading &&
      Object.entries(training?.detail).length > 0
    onLoading(state)
  }, [training, employee])

  useEffect(() => {
    const detail = training?.detail
    if (detail) {
      const periodYear =
        detail?.period_year && detail?.period_month
          ? new Date(detail?.period_year, detail?.period_month - 1)
          : null
      const periodMonth = monthOptions[detail?.period_month - 1] || null
      const startDate = detail?.start_date ? new Date(detail?.start_date) : ''

      formikRef.current?.setFieldValue('namaDiklat', detail?.name, false)
      formikRef.current?.setFieldValue('periode.bulan', periodMonth, false)
      formikRef.current?.setFieldValue('periode.tahun', periodYear, false)
      formikRef.current?.setFieldValue('tanggalPelaksanaan', startDate, false)
      formikRef.current?.setFieldValue(
        'noSurat',
        detail?.reference_number,
        false
      )
      formikRef.current?.setFieldValue('jenjang', detail?.level, false)
      formikRef.current?.setFieldValue(
        'penyelenggara',
        detail?.organizer,
        false
      )
      formikRef.current?.setFieldValue('durasi', detail?.duration, false)
      formikRef.current?.setFieldValue('materi', detail?.link, false)

      detail?.users &&
        detail?.users.map((itm, idx) => {
          let fileSplit = null
          let fileName = null
          const file = itm?.certificate

          const userName =
            itm?.name && itm?.employee_id_number
              ? `${itm?.name} - ${itm?.employee_id_number}`
              : null

          if (file) {
            fileSplit = file.split('/')
            fileName = fileSplit[fileSplit.length - 1]
          }

          formikRef.current?.setFieldValue(
            `pegawai[${idx}].nama`,
            userName,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].sertifikat`,
            fileName,
            false
          )
        })
    }
  }, [training?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat Pelatihan Struktural'}
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
            <RiwayatPelatihanStrukturalForm
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

RiwayatPelatihanStrukturalEditComponent.propTypes = {
  training: PropTypes.object,
  employee: PropTypes.object,
  getTraining: PropTypes.func,
  updateTraining: PropTypes.func,
  clearTrainingState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPelatihanStrukturalEditComponent
