/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'

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
    month: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ],
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
        {/* Nama Riwayat Jabatan */}
        <Grid item xs={6}>
          <Input
            label='Nama Riwayat Jabatan *'
            placeholder='Masukkan Nama Riwayat Jabatan'
            name='namaJabatan'
            value={values?.namaJabatan}
            onChange={handleChange}
            error={errors?.namaJabatan}
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
            <Grid item xs={12} key={index}>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={2}>
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
                        formikRef.current.validateField(
                          `pegawai[${index}].nama`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Jabatan */}
                <Grid item xs={2}>
                  <Input
                    label='Jabatan *'
                    placeholder='Masukkan Jabatan'
                    name={`pegawai[${index}].jabatan`}
                    value={item?.jabatan}
                    error={errors?.jabatan}
                    onChange={(val) => {
                      setFieldValue(`pegawai[${index}].jabatan`, val, false)
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].jabatan`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Jenjang Jabatan */}
                <Grid item xs={2}>
                  <Autocomplete
                    options={options?.jenjangJabatan}
                    name={`pegawai[${index}].jenjangJabatan`}
                    placeholder='Pilih Jenjang Jabatan'
                    value={item?.jenjangJabatan}
                    multiple={false}
                    label='Jenjang Jabatan'
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].jenjangJabatan`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Keterangan Jabatan */}
                <Grid item xs={2}>
                  <Autocomplete
                    options={options?.keteranganJabatan}
                    name={`pegawai[${index}].keteranganJabatan`}
                    placeholder='Pilih Keterangan Jabatan'
                    value={item?.keteranganJabatan}
                    multiple={false}
                    label='Keterangan Jabatan'
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].keteranganJabatan`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* TMT Golongan */}
                <Grid item xs={2}>
                  <DatePickerDay
                    value={item?.tmt}
                    name={`pegawai[${index}].tmt`}
                    label='TMT Menjabat *'
                    placeholder='dd-mm-yy'
                    error={errors?.pegawai && errors?.pegawai[index]?.tmt}
                    onChange={(val) => {
                      setFieldValue(`pegawai[${index}].tmt`, val, false)
                      setTimeout(() => {
                        formikRef.current.validateField(`pegawai[${index}].tmt`)
                      }, 1)
                    }}
                  />
                </Grid>
                {/* No SK */}
                <Grid item xs={2}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'start',
                      gap: '16px'
                    }}
                  >
                    <Input
                      label='No SK Jabatan'
                      placeholder='Masukkan No SK Jabatan'
                      name={`pegawai[${index}].noSk`}
                      value={item?.noSk}
                      onChange={(val) =>
                        setFieldValue(
                          `pegawai[${index}].noSk`,
                          val?.target?.value,
                          false
                        )
                      }
                    />
                    {values?.pegawai.length > 1 && (
                      <Button
                        icon={<Delete />}
                        color='danger'
                        sx={{ width: '50px', height: '50px' }}
                        onClick={() =>
                          handleEmployee(values?.pegawai, 'delete', index)
                        }
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
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
