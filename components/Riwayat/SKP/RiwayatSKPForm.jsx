/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import { Delete } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

const RiwayatSKPForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options
}) => {
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
            name='namaSkp'
            value={values?.namaSkp}
            error={errors?.namaSkp}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`namaSkp`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`namaSkp`)
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
          <Autocomplete
            multiple={false}
            options={options?.periode}
            name='periodePenilaian'
            label='Periode Penilaian *'
            placeholder='Pilih Periode Penilaian'
            value={values?.periodePenilaian}
            error={errors?.periodePenilaian}
            onChange={(val) => {
              setFieldValue('periodePenilaian', val, false)
              setTimeout(() => {
                formikRef.current.validateField('periodePenilaian')
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
              setFieldValue(`periodePenilaianTahun`, val, false)
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
          {values?.pegawai?.map((item, index) => (
            <Grid item xs={12} key={uuidv4()}>
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
                          marginTop: '29px'
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
  formikRef: PropTypes.any,
  options: PropTypes.object
}

export default RiwayatSKPForm
