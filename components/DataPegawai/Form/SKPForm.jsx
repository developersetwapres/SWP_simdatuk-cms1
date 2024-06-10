import React from 'react'
import { Button, Input, Autocomplete } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

function SKPForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>SKP</Typography>

        <Button
          text='Hapus'
          color='danger'
          onClick={() => { }}
          sx={{ textTransform: 'none' }}
        />
      </Box>

      <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

      <Grid container spacing={2}>
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
                options={['a']}
                name='periode.bulan'
                placeholder='Pilih Bulan'
                multiple={false}
                value={''}
                onChange={(val) => {
                  console.log(val)
                }}
                error={''}
              />
            </Grid>
            {/* Tahun */}
            <Grid item xs={6}>
              <DatepickerYear
                isClear
                name='periode.tahun'
                placeholder='Pilih Tahun'
                value={''}
                error={''}
                onChange={(val) => {
                  console.log(val)
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Periode Penilaian'
            multiple={true}
            label='Periode Penilaian *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Tahun'
            placeholder='Masukkan Tahun'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Rating Perilaku Kerja'
            multiple={true}
            label='Rating Perilaku Kerja *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Predikat Kinerja Pegawai'
            multiple={true}
            label='Predikat Kinerja Pegawai *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Capaian Kinerja Organisasi'
            multiple={true}
            label='Capaian Kinerja Organisasi *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SKPForm