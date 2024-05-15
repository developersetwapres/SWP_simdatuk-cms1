/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import RiwayatJabatanForm from './RiwayatJabatanForm'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'

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
  pegawai: Yup.array().of(
    Yup.object().shape({
      nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
      jabatan: Yup.string().required('Jabatan tidak boleh kosong'),
      tmt: Yup.string().required('TMT Pegawai tidak boleh kosong')
    })
  )
})

const RiwayatJabatanAddComponent = () => {
  const router = useRouter()
  const formikRef = useRef(null)

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('values', values)
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={InitValue}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Riwayat Jabatan'}
          handleBack={() => router.back()}
          action={
            <Box>
              <Button text='Simpan' onClick={formikProps?.handleSubmit} />
            </Box>
          }
        >
          <Card>
            <RiwayatJabatanForm {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatJabatanAddComponent
