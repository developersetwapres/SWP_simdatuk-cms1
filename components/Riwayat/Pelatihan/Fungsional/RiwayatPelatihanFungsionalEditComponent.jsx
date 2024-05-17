/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Formik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import RiwayatPelatihanFungsionalForm from './RiwayatPelatihanFungsionalForm'

const InitValue = {
  namaDiklat: '',
  noSurat: '',
  jenjang: '',
  tanggalPelaksanaan: '',
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
  tanggalPelaksanaan: Yup.string().required(
    'Tanggal Pelaksanaan tidak boleh kosong'
  ),
  pegawai: Yup.array()
    .of(
      Yup.object().shape({
        nama: Yup.string().required('Nama Pegawai tidak boleh kosong'),
        sertifikat: Yup.mixed()
          .nullable()
          .test('fileType', 'Format file harus PNG, JPG, atau PDF', (value) => {
            if (!value) return true
            const fileType = value && value.type
            return (
              fileType === 'image/png' ||
              fileType === 'image/jpeg' ||
              fileType === 'application/pdf'
            )
          })
          .test(
            'fileSize',
            'Ukuran file tidak boleh lebih dari 2MB',
            (value) => {
              if (!value) return true
              return value.size <= 2000000
            }
          )
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

const RiwayatPelatihanFungsionalEditComponent = () => {
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
              formikRef={formikRef}
              {...formikProps}
            />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

export default RiwayatPelatihanFungsionalEditComponent
