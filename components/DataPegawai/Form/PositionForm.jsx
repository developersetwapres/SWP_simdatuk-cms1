import React from 'react'
import { Button, Input, Autocomplete } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import DatepickerYear from '@/components/shared/form/DatepickerYear'

function PositionForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Jabatan</Typography>

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
            label='Jabatan *'
            placeholder='Masukkan Jabatan'
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
            placeholder='Pilih Rumpun'
            value={''}
            multiple={false}
            label='Rumpun'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={['']}
            name='rumpun'
            placeholder='Pilih Jenjang Jabatan'
            value={''}
            multiple={false}
            label='Jenjang Jabatan'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['']}
            name='rumpun'
            placeholder='Pilih Keterangan Jabatan'
            value={''}
            multiple={false}
            label='Keterangan Jabatan'
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
            label='TMT Menjabat *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='SK Menjabat'
            placeholder='Masukkan SK Menjabat'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <UploadFile
            label='SK Jabatan'
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
            placeholder='Pilih Jenis SK Jabatan'
            value={''}
            multiple={false}
            label='Jenis SK Jabatan'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='No. SK Jabatan'
            placeholder='Masukkan No. SK Jabatan'
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
            label='Tanggal SK Jabatan'
            placeholder='dd-mm-yyyy'
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
            label='TMT Selesai'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='SK Selesai'
            placeholder='Masukkan SK Selesai'
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
            placeholder='Pilih Jenis SK Selesai'
            value={''}
            multiple={false}
            label='Jenis SK Selesai'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='No. SK Selesai'
            placeholder='Masukkan No. SK Selesai'
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
            label='Tanggal SK Selesai'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['']}
            name='rumpun'
            placeholder='Pilih Status Jabatan'
            value={''}
            multiple={false}
            label='Status Jabatan'
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

export default PositionForm