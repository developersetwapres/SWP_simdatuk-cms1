/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import Card from '@/components/shared/Card/Index'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'
import { Formik } from 'formik'

const RiwayatJabatanForm = () => {
  const router = useRouter()

  const options = {
    month: [
      { title: 'Januari' },
      { title: 'Februari' },
      { title: 'Maret' },
      { title: 'April' },
      { title: 'Mei' },
      { title: 'Juni' },
      { title: 'Juli' },
      { title: 'Agustus' },
      { title: 'September' },
      { title: 'Oktober' },
      { title: 'November' },
      { title: 'Desember' }
    ],
    golongan: [
      { title: 'Golongan I' },
      { title: 'Golongan II' },
      { title: 'Golongan III' },
      { title: 'Golongan IV' },
      { title: 'Golongan V' }
    ],
    employee: [
      { title: 'Employee 1' },
      { title: 'Employee 2' },
      { title: 'Employee 3' },
      { title: 'Employee 4' },
      { title: 'Employee 5' }
    ]
  }

  const action = useMemo(() => {
    return (
      <Box>
        <Button text='Simpan' />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      summary={`${
        router.pathname.includes('add') ? 'Tambah' : 'Edit'
      } Riwayat Jabatan`}
      handleBack={() => router.back()}
      action={action}
    >
      <Card>
        <Formik
          initialValues={{
            namaJabatan: '',
            periode: {
              bulan: '',
              tahun: null
            },
            pegawai: [{ nama: '', jabatan: '', tmt: '', noSk: '' }]
          }}
          // validate={}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Nama Riwayat Jabatan */}
                <Grid item xs={6}>
                  <Input
                    label='Nama Riwayat Jabatan *'
                    placeholder='Masukkan Nama Riwayat Jabatan'
                    name='namaJabatan'
                    value={values?.namaJabatan}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      marginBottom: '6px',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Periode Riwayat *
                  </Typography>
                  <Grid container spacing={2}>
                    {/* Bulan */}
                    <Grid item xs={6}>
                      <Autocomplete
                        options={options?.month}
                        name='bulan'
                        placeholder='Pilih Bulan'
                        multiple={false}
                        value={values?.periode?.bulan}
                        onChange={handleChange}
                      />
                    </Grid>
                    {/* Tahun */}
                    <Grid item xs={6}>
                      <DatepickerYear
                        name='tahun'
                        placeholder='Pilih Tahun'
                        // handleValue={setYear}
                        isClear
                        value={values?.periode?.tahun}
                        handleValue={handleChange}
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
                <Grid container spacing={3}>
                  {/* Namee */}
                  <Grid item xs={3}>
                    <Autocomplete
                      options={options?.employee}
                      name='nama'
                      placeholder='Pilih Nama / NIP'
                      // value={filterType[item?.name]}
                      multiple={false}
                      label='Nama / NIP *'
                    />
                  </Grid>
                  {/* Golongan */}
                  <Grid item xs={3}>
                    <Autocomplete
                      options={options?.golongan}
                      name='golongan'
                      placeholder='Pilih Golongan'
                      // value={filterType[item?.name]}
                      multiple={false}
                      label='Golongan *'
                    />
                  </Grid>
                  {/* TMT Golongan */}
                  <Grid item xs={3}>
                    <DatePickerDay
                      value={null}
                      name='date'
                      label='TMT Menjabat *'
                      placeholder='dd-mm-yy'
                    />
                  </Grid>
                  {/* No SK */}
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'start',
                        gap: '16px'
                      }}
                    >
                      <Input
                        label='No SK Golongan'
                        placeholder='Masukkan No SK Golongan'
                      />
                      <Button
                        icon={<Delete />}
                        color='danger'
                        sx={{ width: '50px', height: '50px' }}
                      />
                    </Box>
                  </Grid>
                  {/* Action */}
                  <Grid item xs={12}>
                    <Button text='Tambah Pegawai' variant='outlined' />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </LayoutPages>
  )
}

export default RiwayatJabatanForm
