/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import { Delete } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

const RiwayatPPKForm = ({
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
        {/* Nama PPK */}
        <Grid item xs={6}>
          <Input
            label='Nama PPK *'
            placeholder='Masukkan Nama PPK'
            name='namaPPK'
            value={values?.namaPPK}
            error={errors?.namaPPK}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`namaPPK`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`namaPPK`)
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
        {/* Periode PPK */}
        <Grid item xs={6}>
          <Input
            label='Periode PPK *'
            placeholder='Masukkan Periode PPK'
            name='periodePPK'
            value={values?.periodePPK}
            error={errors?.periodePPK}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`periodePPK`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`periodePPK`)
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
          {values?.pegawai?.map((item, index) => (
            <Grid item xs={12} key={uuidv4()}>
              <Grid container spacing={3}>
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
                {/* Nilai */}
                <Grid item xs={4}>
                  <Input
                    type='number'
                    inputProps={{ min: '0' }}
                    label='Nilai Prestasi Kerja *'
                    placeholder='Masukkan Nilai Prestasi Kerja'
                    name={`pegawai[${index}].nilai`}
                    value={item?.nilai}
                    error={errors?.pegawai && errors?.pegawai[index]?.nilai}
                    onChange={(val) => {
                      setFieldValue(
                        `pegawai[${index}].nilai`,
                        val?.target?.value,
                        false
                      )
                      setTimeout(() => {
                        formikRef.current.validateField(
                          `pegawai[${index}].nilai`
                        )
                      }, 1)
                    }}
                  />
                </Grid>
                {/* Keterangan */}
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'start',
                      gap: '16px'
                    }}
                  >
                    <Autocomplete
                      options={options?.keterangan}
                      name={`pegawai[${index}].keterangan`}
                      placeholder='Pilih Keterangan'
                      value={item?.keterangan}
                      multiple={false}
                      label='Keterangan'
                      error={
                        errors?.pegawai && errors?.pegawai[index]?.keterangan
                      }
                      onChange={(val) => {
                        setFieldValue(
                          `pegawai[${index}].keterangan`,
                          val,
                          false
                        )
                      }}
                    />
                    {values?.pegawai?.length > 1 && (
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

RiwayatPPKForm.propTypes = {
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
  options: PropTypes.any
}

export default RiwayatPPKForm
