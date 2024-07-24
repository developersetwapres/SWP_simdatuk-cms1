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
import { monthOptions, positionDescOptions } from 'libs/types/options'

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

const RiwayatJabatanEditComponent = ({
  positionHistories,
  echelon,
  employee,
  getPositionHistories = () => { },
  updatePositionHistories = () => { },
  clearPositionHistoriesState = () => { },
  onLoading = () => { }
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
      keteranganJabatan: positionDescOptions,
      month: monthOptions || []
    }

    return data
  }, [echelon, employee])

  const handleGetValueId = (val, type) => {
    if (type == 'echelon') {
      const dataFilter = echelon?.data.find((itm) => itm?.name == val)
      return dataFilter?.id
    } else if (type == 'employee') {
      const dataFilter = employee?.data.find(
        (itm) => itm?.employee_id_number === val?.split(' - ')[1]
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

      const id = atob(router?.query?.id)
      const users = values?.pegawai?.map((itm, index) => {
        const item = {
          id: positionHistories?.detail?.users[index]?.id || null,
          user_id: handleGetValueId(itm?.nama, 'employee'),
          position: itm?.jabatan,
          effective_date: moment(itm?.tmt).format('YYYY-MM-DD'),
          position_status: itm?.keteranganJabatan ? handleGetValueId(
            itm?.keteranganJabatan,
            'ketJabatan'
          ) : null,
          echelon: itm?.jenjangJabatan ?
            handleGetValueId(itm?.jenjangJabatan, 'echelon')
            : null,
          decree: itm?.noSk || null
        }

        return item
      })

      const payload = {
        id,
        data: {
          name: values?.namaJabatan,
          period_month: handleGetValueId(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          users
        }
      }
      updatePositionHistories(payload)
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
    clearPositionHistoriesState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getPositionHistories(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !employee?.loading &&
      !echelon?.loading &&
      !positionHistories?.loading &&
      Object.entries(positionHistories?.detail).length > 0
    onLoading(state)
  }, [employee, echelon, positionHistories])

  useEffect(() => {
    const detail = positionHistories?.detail

    if (echelon && detail && Object.entries(detail).length > 0) {
      const periodYear = new Date(detail?.period_year, detail?.period_month - 1)

      formikRef.current?.setFieldValue('namaJabatan', detail?.name, false)
      formikRef.current?.setFieldValue(
        'periode.bulan',
        options['month'][detail?.period_month - 1],
        false
      )
      formikRef.current?.setFieldValue('periode.tahun', periodYear, false)

      detail?.users &&
        detail?.users.map((itm, idx) => {
          const dataEchelons = echelon?.data
          const echelons = itm?.echelon
            ? dataEchelons.find((item) => item?.id == itm?.echelon)?.name
            : null
          const effectiveDate = itm?.effective_date
            ? new Date(itm?.effective_date)
            : ''

          formikRef.current?.setFieldValue(
            `pegawai[${idx}].nama`,
            itm?.name && itm?.employee_id_number
              ? `${itm?.name} - ${itm?.employee_id_number}`
              : null,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].jabatan`,
            itm?.position || '',
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].jenjangJabatan`,
            echelons,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].keteranganJabatan`,
            itm?.position_status
              ? options['keteranganJabatan'][itm?.position_status - 1]
              : null,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].tmt`,
            effectiveDate,
            false
          )
          formikRef.current?.setFieldValue(
            `pegawai[${idx}].noSk`,
            itm?.decree || '',
            false
          )
        })
    }
  }, [positionHistories?.detail, echelon])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat Jabatan'}
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

RiwayatJabatanEditComponent.propTypes = {
  positionHistories: PropTypes.object,
  echelon: PropTypes.object,
  employee: PropTypes.object,
  getPositionHistories: PropTypes.func,
  updatePositionHistories: PropTypes.func,
  clearPositionHistoriesState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatJabatanEditComponent
