import React from 'react'
import { Button, Input, Autocomplete } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

function TypeForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Golongan</Typography>

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
            options={['']}
            name='rumpun'
            placeholder='Pilih Golongan *'
            value={''}
            multiple={false}
            label='Golongan'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePickerDay
            value={''}
            name={'dateOfBirth'}
            label='TMT Golongan *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='SK Golongan'
            placeholder='Masukkan SK Golongan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <UploadFile
            label='SK Golongan'
            maxSize={2}
            dataUnit='MB'
            formatFile={['.png', '.jpg', '.pdf']}
            name={'name'}
            value={''}
            error={''}
            onDelete={() => { }}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['']}
            name='rumpun'
            placeholder='Pilih Jenis SK Golongan'
            value={''}
            multiple={false}
            label='Jenis SK Golongan'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='No. SK Golongan *'
            placeholder='Masukkan No. SK Golongan'
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
            label='Tanggal SK Golongan'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Keterangan Golongan'
            placeholder='Masukkan Keterangan Golongan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['']}
            name='rumpun'
            placeholder='Pilih Status Golongan'
            value={''}
            multiple={false}
            label='Status Golongan'
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

export default TypeForm