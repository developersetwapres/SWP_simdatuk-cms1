import React from 'react'
import { Autocomplete, Input, Button } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'

function FamilyForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Keluarga</Typography>

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
          <Input
            label='No Kartu Keluarga *'
            placeholder='Masukkan No Kartu Keluarga *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Nama Anggota Keluarga *'
            placeholder='Masukkan Nama Anggota Keluarga *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='No NIK *'
            placeholder='Masukkan No NIK *'
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
            placeholder='Pilih Jenis Kelamin'
            multiple={true}
            label='Jenis Kelamin *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Agama'
            multiple={true}
            label='Agama *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Tempat Lahir *'
            placeholder='Masukkan Tempat Lahir *'
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
            label='Tanggal Lahir *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Nama Bapak'
            placeholder='Masukkan Nama Bapak'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Nama Ibu'
            placeholder='Masukkan Nama Ibu'
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
            placeholder='Pilih Hubungan Keluarga'
            multiple={true}
            label='Hubungan Keluarga *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Pendidikan'
            multiple={true}
            label='Pendidikan *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Jenis Pekerjaan'
            placeholder='Masukkan Jenis Pekerjaan'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Keterangan Pekerjaan'
            placeholder='Masukkan Keterangan Pekerjaan'
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
            placeholder='Pilih Status Perkawinan'
            multiple={true}
            label='Status Perkawinan *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='No. HP'
            placeholder='Masukkan No. HP'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Urut Keluarga'
            placeholder='Masukkan Urut Keluarga'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            color='primary'
            variant='outlined'
            text='Tambah Keluarga Baru'
            sx={{
              width: '100%',
              display: 'block',
              fontWeight: 'bold'
            }}
            onClick={() => { }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default FamilyForm