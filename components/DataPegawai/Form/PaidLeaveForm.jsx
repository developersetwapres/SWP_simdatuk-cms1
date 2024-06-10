import React from 'react'
import { Input, Button } from '@/components/shared'
import { Box, Typography, Divider, Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'

function PaidLeaveForm() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color='#895700' fontWeight={700}>Cuti</Typography>

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
          <DatePickerDay
            mode='range'
            value={''}
            name={'dateOfBirth'}
            label='Periode *'
            placeholder='dd-mm-yyyy'
            error={''}
            onChange={(val) => {
              console.log(val)
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Alasan *'
            placeholder='Masukkan Alasan *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='No. Cuti *'
            placeholder='Masukkan No. Cuti *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label='Tujuan *'
            placeholder='Masukkan Tujuan *'
            name='name'
            value={''}
            error={''}
            onChange={(val) => console.log(val)}
          />
        </Grid>

        <Grid item xs={12}>
          <UploadFile
            label='Surat Cuti'
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

        {/* End */}

        <Grid item xs={12}>
          <Button
            color='primary'
            variant='outlined'
            text='Tambah Cuti Baru'
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

export default PaidLeaveForm