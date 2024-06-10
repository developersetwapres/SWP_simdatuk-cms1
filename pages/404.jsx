/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@/components/shared'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()
  return (
    <Box component='main' sx={{ height: '96vh', padding: '2% 8%' }}>
      <Container
        maxWidth='xl'
        sx={{
          height: '100%'
        }}
      >
        <Box sx={{ width: '240px', height: 'fit-content' }}>
          <img
            src='/images/logo-brand.png'
            alt='Simdatuk'
            style={{ width: '100%', height: 'fit-content' }}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <Box sx={{ width: '600px', height: 'fit-content' }}>
            <img
              src='/images/404.png'
              alt='Not Found'
              style={{ width: '100%', height: 'fit-content' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography sx={{ fontSize: '28px', fontWeight: 800 }}>
              Halaman Tidak Ditemukan
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
              Kami tidak menemukan halaman yang anda cari
            </Typography>
            <Button
              text='Kembali ke Dashboard'
              onClick={() => router.push('/dashboard')}
              sx={{ marginTop: '26px', textTransform: 'none' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default NotFound
