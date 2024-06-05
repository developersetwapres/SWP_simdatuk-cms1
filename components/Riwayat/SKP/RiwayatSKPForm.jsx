/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'
import { monthsOptions } from 'libs/months'

const RiwayatSKPForm = ({
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
    periode: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Periode 5'],
    predikat: ['Kurang Baik', 'Baik', 'Sangat Baik'],
    rating: ['Kurang Baik', 'Baik', 'Sangat Baik'],
    organisasi: [
      'Organisasi 1',
      'Organisasi 2',
      'Organisasi 3',
      'Organisasi 4',
      'Organisasi 5'
    ]
  }

  const handleEmployee = (data, type, indexItem) => {
    if (type == 'add') {
      const newPegawai = {
        nama: null,
        rating: null,
        predikat: null,
        pencapaian: null
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
            label='Nama Riwayat SKP *'
            placeholder='Masukkan Nama Riwayat SKP'
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
        {/* Periode Penilaian */}
        <Grid item xs={6}>
          <DatepickerYear
            isClear
            isQuarter={true}
            label='Periode Penilaian *'
            name='periodePenilaian'
            placeholder='Pilih Periode Penilaian'
            value={values?.periodePenilaian}
            error={errors?.periodePenilaian}
            onChange={(val) => {
              setFieldValue(`periodePenilaian`, val, false)
              setFieldValue(`periodePenilaianTahun`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`periodePenilaian`)
              }, 1)
            }}
          />
        </Grid>
        {/* Tahun */}
        <Grid item xs={6}>
          <DatepickerYear
            isClear
            label='Tahun'
            name='periodePenilaianTahun'
            placeholder='Masukkan Tahun'
            value={values?.periodePenilaianTahun}
            error={errors?.periodePenilaianTahun}
            onChange={(val) => {
              let newDate = ''
              const currentPeriodePenilaian = values?.periodePenilaian

              if (currentPeriodePenilaian) {
                newDate = new Date(
                  val.getFullYear(),
                  currentPeriodePenilaian.getMonth(),
                  currentPeriodePenilaian.getDate()
                )
              } else {
                newDate = val
              }

              setFieldValue(`periodePenilaianTahun`, val, false)
              setFieldValue(`periodePenilaian`, newDate, false)
              setTimeout(() => {
                formikRef.current.validateField(`periodePenilaian`)
              }, 1)
            }}
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
            <Grid item xs={12} key={index}>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={3}>
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
                {/* Rating Perilaku Kerja */}
                <Grid item xs={3}>
                  <Autocomplete
                    options={options?.rating}
                    name={`pegawai[${index}].rating`}
                    placeholder='Pilih Rating Perilaku Kerja'
                    value={item?.rating}
                    multiple={false}
                    label='Rating Perilaku Kerja *'
                    error={errors?.pegawai && errors?.pegawai[index]?.rating}
                    onChange={(val) => {
                      setFieldValue(`pegawai[${index}].rating`, val, false)
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].rating`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Predikat Kinerja Pegawai */}
                <Grid item xs={3}>
                  <Autocomplete
                    options={options?.predikat}
                    name={`pegawai[${index}].predikat`}
                    placeholder='Pilih Predikat Kinerja Pegawai'
                    value={item?.predikat}
                    multiple={false}
                    label='Predikat Kinerja Pegawai *'
                    error={errors?.pegawai && errors?.pegawai[index]?.predikat}
                    onChange={(val) => {
                      setFieldValue(`pegawai[${index}].predikat`, val, false)
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].predikat`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Capaian Kinerja Organisasi */}
                <Grid item xs={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'start',
                      gap: '16px'
                    }}
                  >
                    <Autocomplete
                      options={options?.organisasi}
                      name={`pegawai[${index}].pencapaian`}
                      placeholder='Pilih Capaian Kinerja Organisasi'
                      value={item?.pencapaian}
                      multiple={false}
                      label='Capaian Kinerja Organisasi *'
                      error={
                        errors?.pegawai && errors?.pegawai[index]?.pencapaian
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `pegawai[${index}].pencapaian`,
                          val,
                          false
                        )
                        setTimeout(() => {
                          formikRef.current.validateField(
                            `pegawai[${index}].pencapaian`
                          )
                        }, 1)
                      }}
                    />
                    {values?.pegawai.length > 1 && (
                      <Button
                        icon={<Delete />}
                        color='danger'
                        sx={{
                          width: '50px',
                          height: '50px',
                          marginTop: '29`px'
                        }}
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

RiwayatSKPForm.propTypes = {
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

export default RiwayatSKPForm
