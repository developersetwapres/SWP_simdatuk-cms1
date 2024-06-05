/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'
import { monthsOptions } from 'libs/months'

const RiwayatJabatanForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef
}) => {
  const options = {
    month: monthsOptions || [],
    jabatan: [
      'Jabatan I',
      'Jabatan II',
      'Jabatan III',
      'Jabatan IV',
      'Jabatan V'
    ],
    jenjangJabatan: [
      'Jenjang Jabatan I',
      'Jenjang Jabatan II',
      'Jenjang Jabatan III',
      'Jenjang Jabatan IV',
      'Jenjang Jabatan V'
    ],
    keteranganJabatan: [
      'Keterangan Jabatan I',
      'Keterangan Jabatan II',
      'Keterangan Jabatan III',
      'Keterangan Jabatan IV',
      'Keterangan Jabatan V'
    ],
    employee: [
      'Employee 1',
      'Employee 2',
      'Employee 3',
      'Employee 4',
      'Employee 5'
    ]
  }

  const handleEmployee = (data, type, indexItem) => {
    if (type == 'add') {
      const newPegawai = {
        nama: null,
        jabatan: null,
        jenjangJabatan: null,
        keteranganJabatan: null,
        tmt: '',
        noSk: ''
      }

      const updatedPegawai = [...data, newPegawai]
      setFieldValue('pegawai', updatedPegawai, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('pegawai', newData, false)
    }
  }

  return (
    <Form>
      <Grid container spacing={3}>
        {/* Nama Penghargaan */}
        <Grid item xs={6}>
          <Input
            label='Nama Penghargaan *'
            placeholder='Masukkan Nama Penghargaan'
            name='namaPenghargaan'
            value={values?.namaPenghargaan}
            error={errors?.namaPenghargaan}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`namaPenghargaan`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`namaPenghargaan`)
              }, 1)
            }}
          />
        </Grid>
        {/* Periode */}
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Periode Input Riwayat *
          </Typography>
          <Grid container spacing={2}>
            {/* Bulan */}
            <Grid item xs={6}>
              <Autocomplete
                options={options?.month}
                name='periode.bulan'
                placeholder='Pilih Bulan'
                multiple={false}
                value={values?.periode?.bulan}
                onChange={(val) => {
                  setFieldValue(`periode.bulan`, val, false)
                  setTimeout(() => {
                    formikRef.current.validateField(`periode.bulan`)
                  }, 1)
                }}
                error={errors?.periode?.bulan}
              />
            </Grid>
            {/* Tahun */}
            <Grid item xs={6}>
              <DatepickerYear
                isClear
                name='periode.tahun'
                placeholder='Pilih Tahun'
                value={values?.periode?.tahun}
                error={errors?.periode?.tahun}
                onChange={(val) => {
                  setFieldValue(`periode.tahun`, val, false)
                  setTimeout(() => {
                    formikRef.current.validateField(`periode.tahun`)
                  }, 1)
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Keterangan Penghargaan */}
        <Grid item xs={6}>
          <Input
            label='Keterangan Penghargaan'
            placeholder='Masukkan Keterangan Penghargaan'
            name='keteranganPenghargaan'
            value={values?.keteranganPenghargaan}
            error={errors?.keteranganPenghargaan}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`keteranganPenghargaan`, val, false)
            }}
          />
        </Grid>
        {/* Jenis SK */}
        <Grid item xs={6}>
          <Autocomplete
            options={options?.employee}
            name='jenisSk'
            placeholder='Pilih Jenis SK'
            value={values?.jenisSk}
            multiple={false}
            label='Jenis SK *'
            error={errors?.jenisSk}
            onChange={(val) => {
              setFieldValue('jenisSk', val, false)
              setTimeout(() => {
                formikRef.current.validateField('jenisSk')
              }, 1)
            }}
          />
        </Grid>
        {/* Tanggal SK */}
        <Grid item xs={6}>
          <DatePickerDay
            value={values?.tanggalSk}
            name='tanggalSk'
            label='Tanggal SK *'
            placeholder='dd-mm-yy'
            error={errors?.tanggalSk}
            onChange={(val) => {
              setFieldValue('tanggalSk', val, false)
              setTimeout(() => {
                formikRef?.current?.validateField('tanggalSk')
              }, 1)
            }}
          />
        </Grid>
        {/* No SK Penghargaan */}
        <Grid item xs={6}>
          <Input
            label='No SK Penghargaan *'
            placeholder='Masukkan No SK Penghargaan'
            name='noSkPenghargaan'
            value={values?.noSkPenghargaan}
            error={errors?.noSkPenghargaan}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`noSkPenghargaan`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`noSkPenghargaan`)
              }, 1)
            }}
          />
        </Grid>
        {/* Tahun */}
        <Grid item xs={6}>
          <DatepickerYear
            isClear
            name='tahunSk'
            label='Tahun SK'
            placeholder='Pilih Tahun SK'
            value={values?.tahunSk}
            error={errors?.tahunSk}
            onChange={(val) => setFieldValue(`tahunSk`, val, false)}
          />
        </Grid>
        {/* Instansi Pemberi Penghargaan */}
        <Grid item xs={6}>
          <Input
            label='Instansi Pemberi Penghargaan'
            placeholder='Masukkan Instansi Pemberi Penghargaan'
            name='instansi'
            value={values?.instansi}
            error={errors?.instansi}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`instansi`, val, false)
            }}
          />
        </Grid>
        {/* Tanggal Terima */}
        <Grid item xs={6}>
          <DatePickerDay
            value={values?.received}
            name='received'
            label='Tanggal Terima'
            placeholder='dd-mm-yy'
            error={errors?.received}
            onChange={(val) => setFieldValue('received', val, false)}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '22px' }}>
        <Typography
          sx={{
            marginBottom: '8px',
            fontSize: '18px',
            fontWeight: 800
          }}
        >
          Daftar Pegawai
        </Typography>
        <Grid container spacing={2}>
          {values?.pegawai.map((item, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'start',
                gap: '16px'
              }}
            >
              {/* Name */}
              <Autocomplete
                options={options?.employee}
                name={`pegawai[${index}].nama`}
                placeholder='Pilih Nama / NIP'
                value={item?.nama}
                multiple={false}
                label='Nama / NIP *'
                error={errors?.pegawai && errors?.pegawai[index]?.nama}
                onChange={(val) => {
                  setFieldValue(`pegawai[${index}].nama`, val, false)
                  setTimeout(() => {
                    formikRef.current.validateField(`pegawai[${index}].nama`)
                  }, 1)
                }}
                sx={{ width: '100%' }}
              />
              {values?.pegawai.length > 1 && (
                <Button
                  icon={<Delete />}
                  color='danger'
                  sx={{ width: '50px', height: '50px', marginTop: '29px' }}
                  onClick={() =>
                    handleEmployee(values?.pegawai, 'delete', index)
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>
        {/* Action */}
        <Box sx={{ marginTop: '20px' }}>
          <Button
            text='Tambah Pegawai'
            variant='outlined'
            onClick={() => handleEmployee(values?.pegawai, 'add')}
          />
          {/* <Button type='submit' text='Simpan' onClick={handleSubmit} /> */}
        </Box>
      </Box>
    </Form>
  )
}

RiwayatJabatanForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any
}

export default RiwayatJabatanForm
