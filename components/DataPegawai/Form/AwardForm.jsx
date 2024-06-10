import React from 'react'
import { Button, Input, Autocomplete } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

function AwardForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Penghargaan</Typography>

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
          <Input
            label='Nama Penghargaan *'
            placeholder='Masukkan Nama Penghargaan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Keterangan Penghargaan'
            placeholder='Masukkan Keterangan Penghargaan'
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
            placeholder='Pilih Jenis SK'
            multiple={true}
            label='Jenis SK *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePickerDay
            value={''}
            name={'dateOfBirth'}
            label='Tanggal SK *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='No. SK Penghargaan *'
            placeholder='Masukkan No. SK Penghargaan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Tahun SK'
            placeholder='Masukkan Tahun SK'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Instansi Pemberi Penghargaan'
            placeholder='Masukkan Instansi Pemberi Penghargaan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePickerDay
            value={''}
            name={'dateOfBirth'}
            label='Tanggal Terima'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AwardForm