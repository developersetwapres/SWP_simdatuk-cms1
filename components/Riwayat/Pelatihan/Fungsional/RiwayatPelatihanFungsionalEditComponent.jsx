/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  jenjang: null,
  tanggalPelaksanaan: null,
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
  tanggalPelaksanaan: Yup.object()
    .shape({
      from: Yup.string().required('Pilih tanggal awal'),
      to: Yup.string().required('Pilih tanggal akhir')
    })
    .required('Tanggal Pelaksanaan tidak boleh kosong'),
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
          const fileSizeLimitInMB = 2
          const fileSizeInMB = value?.size / 1024 ** 2
          return fileSizeInMB <= fileSizeLimitInMB
        })
    })
  )
})

const RiwayatPelatihanFungsionalEditComponent = ({
  training,
  employee,
  getTraining = () => {},
  updateTraining = () => {},
  clearTrainingState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)
  const [formValues, setFormValues] = useState(InitValue)

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })
    const data = {
      month: monthOptions || [],
      employee: newEmployees || [],
      level: training?.levels?.map((i) => i?.level_name) || []
    }

    return data
  }, [employee])

  const handleGetValue = (value, type) => {
    if (value) {
      if (type == 'employee') {
        const data = employee?.data
        const dataFilter = data?.find(
          (itm) => itm?.employee_id_number === value.split(' - ')[1]
        )?.id

        return dataFilter
      } else if (type === 'levels') {
        return (
          training?.levels &&
          training?.levels?.find((item) => item?.level_name === value)?.id
        )
      } else {
        const index = monthOptions.findIndex((itm) => itm == value) + 1

        return index
      }
    } else {
      return ''
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
      formData.append('level', handleGetValue(values?.jenjang || '', 'levels'))
      formData.append(
        'start_date',
        handleFormatDate(values?.tanggalPelaksanaan?.from, 'YYYY-MM-DD')
      )
      formData.append(
        'end_date',
        handleFormatDate(values?.tanggalPelaksanaan?.to, 'YYYY-MM-DD')
      )
      formData.append('duration', values?.durasi || 0)
      formData.append('organizer', values?.penyelenggara || '')
      formData.append('link', values?.materi || '')

      formData.append('type', 2)

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

  const handleFormatDate = (value, format) => {
    if (value) return moment(value).format(format)

    return ''
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
    const state = !training?.loading || !employee?.loading
    // && Object.entries(training?.detail).length > 0
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
      const startDate = detail?.start_date
        ? moment(detail?.start_date, moment.ISO_8601).toDate()
        : ''
      const endDate = detail?.end_date
        ? moment(detail?.end_date, moment.ISO_8601).toDate()
        : ''

      const employees = detail?.users?.map((itm) => {
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
        return {
          nama: userName,
          sertifikat: fileName
        }
      })

      const filledValues = {
        namaDiklat: detail?.name,
        noSurat: detail?.reference_number,
        jenjang: detail?.level_name,
        tanggalPelaksanaan:
          detail?.start_date && detail?.end_date
            ? {
                from: startDate,
                to: endDate
              }
            : null,
        penyelenggara: detail?.organizer,
        durasi: detail?.duration,
        materi: detail?.link,
        periode: {
          bulan: periodMonth,
          tahun: periodYear
        },
        pegawai: employees
      }
      setFormValues(filledValues)
    }
  }, [training?.detail])

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
          summary={'Edit Riwayat Pelatihan Fungsional'}
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

RiwayatPelatihanFungsionalEditComponent.propTypes = {
  training: PropTypes.object,
  employee: PropTypes.object,
  getTraining: PropTypes.func,
  updateTraining: PropTypes.func,
  clearTrainingState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPelatihanFungsionalEditComponent
