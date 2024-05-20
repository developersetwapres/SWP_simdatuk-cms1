/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import RiwayatHukumanDisiplinForm from './RiwayatHukumanDisiplinForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'

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
      tanggalHukuman: Yup.object().required(
        'Tanggal Hukuman tidak boleh kosong'
      )
    })
  )
})

const RiwayatHukumanDisiplinEditComponent = () => {
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
          summary={'Edit Riwayat HukumanDisiplin'}
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
              formikRef={formikRef}
              {...formikProps}
            />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatHukumanDisiplinEditComponent
