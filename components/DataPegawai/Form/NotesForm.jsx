import React from 'react'
import { Button, TextArea } from '@/components/shared'
import { Box, Typography, Divider } from '@mui/material'

function NotesForm() {
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

      <TextArea
        label='Catatan *'
        placeholder='Masukkan Catatan'
        rows={3}
        name='notes'
      />

      <Button
        color='primary'
        variant='outlined'
        text='Tambah Catatan Baru'
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

export default NotesForm