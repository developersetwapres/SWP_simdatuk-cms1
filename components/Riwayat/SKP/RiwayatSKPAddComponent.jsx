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
import RiwayatSKPForm from './RiwayatSKPForm'
import moment from 'moment'
import {
  monthOptions,
  periodOptions,
  predicateOptions,
  ratingOptions,
  ratingOrganizationOptions
} from 'libs/types/options'

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

const RiwayatSKPAddComponent = ({
  target,
  employee,
  postTarget = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const options = useMemo(() => {
    const newEmployees = employee?.data.map((itm) => {
      return `${itm?.name} - ${itm?.employee_id_number}`
    })

    const data = {
      month: monthOptions || [],
      employee: newEmployees,
      periode: periodOptions,
      predikat: predicateOptions,
      rating: ratingOptions,
      organisasi: ratingOrganizationOptions
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
      const index = monthOptions.findIndex((itm) => itm == value) + 1

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

      const users = values?.pegawai.map((itm) => {
        return {
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
        name: values?.namaSkp,
        period_month: handleGetValue(values?.periode?.bulan, 'month'),
        period_year: moment(values?.periode?.tahun).format('YYYY'),
        appraisal_period: values?.periodePenilaian,
        year: moment(values?.periodePenilaianTahun).format('YYYY'),
        users
      }

      postTarget(payload)
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
    const state = !target?.loading && !employee?.loading
    onLoading(state)
  }, [target, employee])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => {}}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat SKP'}
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
            <RiwayatSKPForm
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

RiwayatSKPAddComponent.propTypes = {
  target: PropTypes.object,
  employee: PropTypes.object,
  postTarget: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatSKPAddComponent
