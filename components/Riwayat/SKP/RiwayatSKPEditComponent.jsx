/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import RiwayatJabatanForm from './RiwayatSKPForm'
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
  namaSkp: '',
  periodePenilaian: null,
  periodePenilaianTahun: null,
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null,
      rating: null,
      predikat: null,
      pencapaian: null
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaSkp: Yup.string().required('Nama SKP tidak boleh kosong'),
  periodePenilaian: Yup.string().required(
    'Periode Penilaian tidak boleh kosong'
  ),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
      rating: Yup.string().required('Rating Pegawai tidak boleh kosong'),
      predikat: Yup.string().required('Predikat Pegawai tidak boleh kosong'),
      pencapaian: Yup.string().required('Pencapaian Pegawai tidak boleh kosong')
    })
  )
})

const RiwayatSKPEditComponent = ({
  target,
  employee,
  getTarget = () => {},
  updateTarget = () => {},
  clearTargetState = () => {},
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
      periode: ['Q1', 'Q2', 'Q3', 'Q4', 'Tahunan'],
      predikat: [
        'Sangat baik',
        'Baik',
        'Butuh perbaikan',
        'Kurang',
        'Sangat Kurang'
      ],
      rating: [
        'Di atas ekspektasi',
        'Sesuai ekspektasi',
        'Di bawah ekspektasi'
      ],
      organisasi: ['Sangat baik', 'Baik', 'Cukup']
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
    } else if (type == 'predikat') {
      const index = options['predikat'].findIndex((itm) => itm == value) + 1

      return index
    } else if (type == 'rating') {
      const index = options['rating'].findIndex((itm) => itm == value) + 1

      return index
    } else {
      const index = options['organisasi'].findIndex((itm) => itm == value) + 1

      return index
    }
  }

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })
      formikRef.current.setErrors({})

      const usersData = target?.detail?.users

      const id = atob(router?.query?.id)
      const users = values?.pegawai.map((itm) => {
        return {
          id: usersData.find((item) => item?.name == itm?.nama.split(' - ')[0])
            ?.id,
          user_id: handleGetValue(itm?.nama, 'employee'),
          work_behavior_rating: handleGetValue(itm?.rating, 'rating'),
          employee_performance_predicate: handleGetValue(
            itm?.predikat,
            'predikat'
          ),
          organizational_performance_achievement: handleGetValue(
            itm?.pencapaian,
            'organisasi'
          )
        }
      })

      const payload = {
        id,
        data: {
          name: values?.namaSkp,
          period_month: handleGetValue(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          appraisal_period: values?.periodePenilaian,
          year: moment(values?.periodePenilaianTahun).format('YYYY'),
          users
        }
      }

      updateTarget(payload)
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
    clearTargetState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getTarget(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !target?.loading &&
      !employee?.loading &&
      Object.entries(target?.detail).length > 0
    onLoading(state)
  }, [target, employee])

  useEffect(() => {
    const detail = target?.detail

    if (Object.entries(detail).length > 0) {
      const periodYear = new Date(detail?.period_year, detail?.period_month - 1)
      const year = new Date(detail?.year, 0, 1)

      formikRef.current?.setFieldValue('namaSkp', detail?.name, false)
      formikRef.current?.setFieldValue(
        'periodePenilaian',
        detail?.appraisal_period,
        false
      )
      formikRef.current?.setFieldValue('periodePenilaianTahun', year, false)
      formikRef.current?.setFieldValue(
        'periode.bulan',
        options['month'][detail?.period_month - 1],
        false
      )
      formikRef.current?.setFieldValue('periode.tahun', periodYear, false)

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
            `pegawai[${idx}].rating`,
            options['rating'][itm?.work_behavior_rating - 1],
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].predikat`,
            options['predikat'][itm?.employee_performance_predicate - 1],
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].pencapaian`,
            options['organisasi'][
              itm?.organizational_performance_achievement - 1
            ],
            false
          )
        })
    }
  }, [target?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat SKP'}
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

RiwayatSKPEditComponent.propTypes = {
  target: PropTypes.object,
  employee: PropTypes.object,
  getTarget: PropTypes.func,
  updateTarget: PropTypes.func,
  clearTargetState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatSKPEditComponent
