/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const RiwayatHukumanDisiplinEditComponent = ({
  disciplinary,
  employee,
  getDisciplinary = () => { },
  updateDisciplinary = () => { },
  clearDisciplinaryState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const formikRef = useRef(null)
  const [formValues, setFormValues] = useState(InitValue)

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
      jenisHukuman: newDiscipleType,
      discipleType
    }

    return data
  }, [discipleType, disciplinary, employee])

  const handleGetValue = (value, type) => {
    if (type === 'disciplinary') {
      return disciplinary?.detail?.users[value]?.id || null
    } else if (type == 'employee') {
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

      const id = atob(router?.query?.id)
      const users = values?.pegawai?.map((itm, index) => {
        return {
          id: handleGetValue(index, 'disciplinary'),
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
        id,
        data: {
          name: values?.namaHukumanDisiplin,
          period_month: handleGetValue(values?.periode?.bulan, 'month'),
          period_year: moment(values?.periode?.tahun).format('YYYY'),
          users
        }
      }

      updateDisciplinary(payload)
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
    clearDisciplinaryState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getDisciplinary(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state = !disciplinary?.loading || !employee?.loading
    onLoading(state)
  }, [disciplinary, employee])

  useEffect(() => {
    const detail = disciplinary?.detail

    if (detail && Object.entries(detail).length > 0) {
      const periodYear = new Date(detail?.period_year, detail?.period_month - 1)
      const filledValues = {
        namaHukumanDisiplin: detail?.name,
        periode: {
          bulan: options['month'][detail?.period_month - 1],
          tahun: periodYear
        },
        pegawai: [
          ...detail?.users.map((itm) => {
            const decreeDate = itm?.date_of_decree
              ? new Date(itm?.date_of_decree)
              : ''
            const startDate = itm?.start_date ? new Date(itm?.start_date) : null
            const endDate = itm?.end_date ? new Date(itm?.end_date) : null
            const discipleDate =
              startDate && endDate ? { from: startDate, to: endDate } : null
            return {
              nama: itm?.name && itm?.employee_id_number
                ? `${itm?.name} - ${itm?.employee_id_number}`
                : null,
              golongan: itm?.grade || '',
              jabatan: itm?.position || '',
              jenisHukuman: itm?.disciplinary_type_name,
              tingkatHukuman: itm?.disciplinary_type_description || '',
              potonganTunjangan: itm?.performance_allowance_deduction || 0,
              potonganWaktu: itm?.performance_allowance_duration || 0,
              noSkHukuman: itm?.decree_number,
              tanggalSkHukuman: decreeDate,
              tanggalHukuman: discipleDate,
              pejabatBerwenang: itm?.authorizing_officer || '',
              namaPejabatBerwenang: itm?.name_of_authorizing_officer || ''
            }
          })
        ]
      }
      setFormValues(filledValues)
    }
  }, [disciplinary?.detail])

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={formValues}
      validationSchema={FormSchema}
      onSubmit={() => { }}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Riwayat Hukuman Disiplin'}
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

RiwayatHukumanDisiplinEditComponent.propTypes = {
  disciplinary: PropTypes.object,
  employee: PropTypes.object,
  getDisciplinary: PropTypes.func,
  updateDisciplinary: PropTypes.func,
  clearDisciplinaryState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatHukumanDisiplinEditComponent
