import React from 'react'
import { Autocomplete, Input, Button } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import UploadFile from '@/components/shared/form/UploadFile'

function EducationForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Pendidikan</Typography>

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
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Tingkat'
            multiple={true}
            label='Tingkat *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Nama Sekolah *'
            placeholder='Masukkan Nama Sekolah *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Fakultas'
            placeholder='Masukkan Fakultas'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Jurusan'
            placeholder='Masukkan Jurusan'
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
            placeholder='Pilih Status'
            multiple={true}
            label='Status *'
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Tahun Lulus *'
            placeholder='Masukkan Tahun Lulus'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Keterangan Sekolah'
            placeholder='Masukkan Keterangan Sekolah'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <UploadFile
            label='Ijazah'
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

        <Grid item xs={12}>
          <Button
            color='primary'
            variant='outlined'
            text='Tambah Pendidikan Baru'
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

export default EducationForm