/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import RiwayatSKPForm from './RiwayatSKPForm'

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
  namaPenghargaan: Yup.string().required('Nama Penghargaan tidak boleh kosong'),
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

const RiwayatSKPAddComponent = () => {
  const router = useRouter()
  const formikRef = useRef(null)

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })

      formikRef.current.setErrors({})
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
            <RiwayatSKPForm formikRef={formikRef} {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatSKPAddComponent
