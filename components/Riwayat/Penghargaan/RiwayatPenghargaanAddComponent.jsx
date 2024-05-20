/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import RiwayatPenghargaanForm from './RiwayatPenghargaanForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'

const InitValue = {
  namaPenghargaan: '',
  keteranganPenghargaan: '',
  jenisSk: null,
  tanggalSk: '',
  noSkPenghargaan: '',
  tahunSk: null,
  instansi: '',
  received: '',
  periode: {
    bulan: null,
    tahun: null
  },
  pegawai: [
    {
      nama: null
    }
  ]
}

const FormSchema = Yup.object().shape({
  namaPenghargaan: Yup.string().required('Nama Penghargaan tidak boleh kosong'),
  jenisSk: Yup.string().required('Jenis SK tidak boleh kosong'),
  tanggalSk: Yup.string().required('Tanggal SK tidak boleh kosong'),
  noSkPenghargaan: Yup.string().required(
    'No SK Penghargaan tidak boleh kosong'
  ),
  periode: Yup.object().shape({
    bulan: Yup.string().required('Bulan tidak boleh kosong'),
    tahun: Yup.string().required('Tahun tidak boleh kosong')
  }),
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong')
    })
  )
})

const RiwayatPenghargaanAddComponent = () => {
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
          summary={'Tambah Riwayat Penghargaan'}
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
            <RiwayatPenghargaanForm formikRef={formikRef} {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatPenghargaanAddComponent
