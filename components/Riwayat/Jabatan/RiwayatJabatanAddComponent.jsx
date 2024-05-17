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

const RiwayatJabatanAddComponent = () => {
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
          summary={'Tambah Riwayat Jabatan'}
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
            <RiwayatJabatanForm formikRef={formikRef} {...formikProps} />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatJabatanAddComponent
