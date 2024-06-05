/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'
import { monthsOptions } from 'libs/months'

const RiwayatHukumanDisiplinForm = ({
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
    employee: [
      'Employee 1',
      'Employee 2',
      'Employee 3',
      'Employee 4',
      'Employee 5'
    ],
    jenisHukuman: ['Ringan', 'Sedang', 'Berat']
  }

  const handleEmployee = (data, type, indexItem) => {
    if (type == 'add') {
      const newPegawai = {
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

      const updatedPegawai = [...data, newPegawai]
      setFieldValue('pegawai', updatedPegawai, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('pegawai', newData, false)
    }
  }

  const handleGetError = (value) => {
    if (value?.to) {
      return value?.to
    } else {
      return value
    }
  }

  return (
    <Form>
      <Grid container spacing={3}>
        {/* Nama Riwayat HukumanDisiplin */}
        <Grid item xs={6}>
          <Input
            label='Nama Riwayat HukumanDisiplin *'
            placeholder='Masukkan Nama Riwayat HukumanDisiplin'
            name='namaHukumanDisiplin'
            value={values?.namaHukumanDisiplin}
            error={errors?.namaHukumanDisiplin}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`namaHukumanDisiplin`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`namaHukumanDisiplin`)
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
        <Grid container spacing={6}>
          {values?.pegawai.map((item, index) => (
            <Grid container item xs={12} key={index}>
              <Grid
                container
                item
                xs={values?.pegawai.length > 1 ? 11 : 12}
                spacing={3}
              >
                {/* Name */}
                <Grid item xs={4}>
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
                {/* Golongan */}
                <Grid item xs={4}>
                  <Input
                    label='Golongan'
                    placeholder='Masukkan Golongan'
                    name={`pegawai[${index}].golongan`}
                    value={item?.golongan}
                    error={errors?.pegawai && errors?.pegawai[index]?.golongan}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(`pegawai[${index}].golongan`, val, false)
                    }}
                  />
                </Grid>
                {/* jabatan */}
                <Grid item xs={4}>
                  <Input
                    label='Jabatan'
                    placeholder='Masukkan Jabatan'
                    name={`pegawai[${index}].jabatan`}
                    value={item?.jabatan}
                    error={errors?.pegawai && errors?.pegawai[index]?.jabatan}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(`pegawai[${index}].jabatan`, val, false)
                    }}
                  />
                </Grid>
                {/* Jenis Hukuman */}
                <Grid item xs={4}>
                  <Autocomplete
                    options={options?.jenisHukuman}
                    name={`pegawai[${index}].jenisHukuman`}
                    placeholder='Pilih Jenis Hukuman'
                    value={item?.jenisHukuman}
                    multiple={false}
                    label='Jenis Hukuman *'
                    error={
                      errors?.pegawai && errors?.pegawai[index]?.jenisHukuman
                    }
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].jenisHukuman`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].jenisHukuman`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* No SK Hukuman Disiplin */}
                <Grid item xs={4}>
                  <Input
                    label='No SK Hukuman Disiplin'
                    placeholder='Masukkan No SK Hukuman Disiplin'
                    name={`pegawai[${index}].noSkHukuman`}
                    value={item?.noSkHukuman}
                    error={errors?.noSkHukuman}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(`pegawai[${index}].noSkHukuman`, val, false)
                    }}
                  />
                </Grid>
                {/* Tanggal SK Hukuman Disiplin */}
                <Grid item xs={4}>
                  <DatePickerDay
                    value={item?.tanggalSkHukuman}
                    name={`pegawai[${index}].tanggalSkHukuman`}
                    label='Tanggal SK Hukuman Disiplin'
                    placeholder='dd-mm-yy'
                    error={
                      errors?.pegawai &&
                      errors?.pegawai[index]?.tanggalSkHukuman
                    }
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].tanggalSkHukuman`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Tanggal Hukuman Disiplin */}
                <Grid item xs={4}>
                  <DatePickerDay
                    mode='range'
                    value={item?.tanggalHukuman}
                    name={`pegawai[${index}].tanggalHukuman`}
                    label='Tanggal Hukuman Disiplin *'
                    placeholder='dd-mm-yy'
                    error={
                      errors?.pegawai && errors?.pegawai[index]?.tanggalHukuman
                        ? handleGetError(errors?.pegawai[index]?.tanggalHukuman)
                        : null
                    }
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].tanggalHukuman`,
                        val,
                        false
                      )
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].tanggalHukuman`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Pejabat Berwenang */}
                <Grid item xs={4}>
                  <Input
                    label='Pejabat Berwenang'
                    placeholder='Masukkan Pejabat Berwenang'
                    name={`pegawai[${index}].pejabatBerwenang`}
                    value={item?.pejabatBerwenang}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        `pegawai[${index}].pejabatBerwenang`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
                {/* Nama Pejabat Berwenang */}
                <Grid item xs={4}>
                  <Input
                    label='Nama Pejabat Berwenang'
                    placeholder='Masukkan Nama Pejabat Berwenang'
                    name={`pegawai[${index}].namaPejabatBerwenang`}
                    value={item?.namaPejabatBerwenang}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue(
                        `pegawai[${index}].namaPejabatBerwenang`,
                        val,
                        false
                      )
                    }}
                  />
                </Grid>
              </Grid>
              {values?.pegawai.length > 1 && (
                <Grid item xs={1} spacing={3}>
                  <Button
                    icon={<Delete />}
                    color='danger'
                    sx={{
                      width: '50px',
                      height: '50px',
                      margin: '29px 0 0 30px'
                    }}
                    onClick={() =>
                      handleEmployee(values?.pegawai, 'delete', index)
                    }
                  />
                </Grid>
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
        </Box>
      </Box>
    </Form>
  )
}

RiwayatHukumanDisiplinForm.propTypes = {
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

export default RiwayatHukumanDisiplinForm
