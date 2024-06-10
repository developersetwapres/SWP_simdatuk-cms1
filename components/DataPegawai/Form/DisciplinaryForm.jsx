import React from 'react'
import { Button, Input, Autocomplete } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'

function DisciplinaryForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Hukuman Disiplin</Typography>

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
            label='Golongan'
            placeholder='Masukkan Golongan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Jabatan'
            placeholder='Masukkan Jabatan'
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
            placeholder='Pilih Jenis Hukuman'
            multiple={true}
            label='Jenis Hukuman *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Tingkat Hukuman'
            placeholder='Masukkan Tingkat Hukuman'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Pemotongan Tunjangan Kinerja(Persentase)'
            placeholder='Masukkan Pemotongan Tunjangan Kinerja'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Jangka Waktu Pemotongan'
            placeholder='Masukkan Jangka Waktu Pemotongan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='No. SK Hukuman Disiplin'
            placeholder='Masukkan No. SK Hukuman Disiplin'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePickerDay
            value={''}
            name=''
            label='Tanggal SK Hukuman Disiplin'
            placeholder='dd-mm-yy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerDay
            mode='range'
            value={''}
            name=''
            label='Tanggal Hukuman Disiplin *'
            placeholder='dd-mm-yy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Pejabat Berwenang'
            placeholder='Masukkan Pejabat Berwenang'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Nama Pejabat Berwenang'
            placeholder='Masukkan Nama Pejabat Berwenang'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Uraian'
            placeholder='Masukkan Uraian'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default DisciplinaryForm