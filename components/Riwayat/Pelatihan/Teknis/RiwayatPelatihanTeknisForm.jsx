/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import { Delete } from '@mui/icons-material'
import UploadFile from '@/components/shared/form/UploadFile'
import DatePickerDay from '@/components/shared/form/DatePickerDay'

const RiwayatPelatihanTeknisForm = ({
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
        sertifikat: null
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
        {/* Nama Diklat */}
        <Grid item xs={6}>
          <Input
            label='Nama Diklat *'
            placeholder='Masukkan Nama Diklat'
            name='namaDiklat'
            value={values?.namaDiklat}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`namaDiklat`, val, false)
              setTimeout(() => {
                formikRef?.current?.validateField(`namaDiklat`)
              }, 1)
            }}
            error={errors?.namaDiklat}
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
                    formikRef?.current?.validateField(`periode.bulan`)
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
        {/* No Surat Perintah */}
        <Grid item xs={6}>
          <Input
            label='No Surat Perintah *'
            placeholder='Masukkan No Surat Perintah'
            name='noSurat'
            value={values?.noSurat}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`noSurat`, val, false)
              setTimeout(() => {
                formikRef?.current?.validateField(`noSurat`)
              }, 1)
            }}
            error={errors?.noSurat}
          />
        </Grid>
        {/* Tanggal Pelaksanan */}
        <Grid item xs={6}>
          <DatePickerDay
            value={values?.tanggalPelaksanaan}
            name='tanggalPelaksanaan'
            label='Tanggal Pelaksanaan *'
            placeholder='dd-mm-yy'
            error={errors?.tanggalPelaksanaan}
            onChange={(val) => {
              setFieldValue(`tanggalPelaksanaan`, val, false)
              setTimeout(() => {
                formikRef.current.validateField(`tanggalPelaksanaan`)
              }, 1)
            }}
          />
        </Grid>
        {/* Durasi Pelatihan */}
        <Grid item xs={6}>
          <Input
            type='number'
            inputProps={{ min: '0' }}
            label='Durasi Pelatihan (Hari)'
            placeholder='Masukkan Durasi Pelatihan (Hari)'
            name='durasi'
            value={values?.durasi}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`durasi`, val, false)
            }}
            error={errors?.durasi}
          />
        </Grid>
        {/* Link Materi Pelatihan */}
        <Grid item xs={6}>
          <Input
            label='Link Materi Pelatihan'
            placeholder='Masukkan Link Materi Pelatihan'
            name='materi'
            value={values?.materi}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue(`materi`, val, false)
            }}
            error={errors?.materi}
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
                <Grid item xs={6}>
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
                {/* Sertifikat */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'start',
                      gap: '16px'
                    }}
                  >
                    <UploadFile
                      label='Sertifikat'
                      maxSize={2}
                      dataUnit='MB'
                      formatFile={['.png', '.jpg', '.pdf']}
                      name={`pegawai[${index}].sertifikat`}
                      value={item?.sertifikat}
                      error={
                        errors?.pegawai && errors?.pegawai[index]?.sertifikat
                      }
                      onDelete={() => {
                        setFieldValue(
                          `pegawai[${index}].sertifikat`,
                          null,
                          false
                        )
                        setTimeout(() => {
                          formikRef.current.validateField(
                            `pegawai[${index}].sertifikat`
                          )
                        }, 1)
                      }}
                      onChange={(val) => {
                        setFieldValue(
                          `pegawai[${index}].sertifikat`,
                          val,
                          false
                        )
                        setTimeout(() => {
                          formikRef.current.validateField(
                            `pegawai[${index}].sertifikat`
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

RiwayatPelatihanTeknisForm.propTypes = {
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

export default RiwayatPelatihanTeknisForm
