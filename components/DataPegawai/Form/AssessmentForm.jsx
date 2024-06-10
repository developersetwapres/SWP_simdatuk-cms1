import React from 'react'
import { Button, Input } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'

function AssessmentForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Catatan</Typography>

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
          <DatePickerDay
            value={''}
            name={'dateOfBirth'}
            label='Tanggal *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Hasil *'
            placeholder='Masukkan Hasil'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Penyelenggara'
            placeholder='Masukkan Penyelenggara'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <UploadFile
            label='File Pendukung'
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
      </Grid>

      <Button
        color='primary'
        variant='outlined'
        text='Tambah Hasil Assessment Baru'
        sx={{
          width: '100%',
          display: 'block',
          fontWeight: 'bold',
          marginTop: 2
        }}
        onClick={() => { }}
      />
    </>
  )
}

export default AssessmentForm