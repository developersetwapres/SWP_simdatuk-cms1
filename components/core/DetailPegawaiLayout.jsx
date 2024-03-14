import { Box, Container, Grid, Typography, List } from '@mui/material'
import React from 'react'
import ButtonExport from './ButtonExport'
import Image from 'next/image'
import ListNavigation from './ListNavigation'
import PropTypes from 'prop-types'

const DetailPegawaiLayout = ({
  children
}) => {

  const dataPegawai = [
    'Data Pegawai',
    'Riwayat Pendidikan',
    'Riwayat Golongan',
    'Riwayat Gaji',
    'Riwayat Pelatihan Struktural',
    'Riwayat Pelatihan Fungsional',
    'Riwayat Pelatihan Teknis',
    'Riwayat Penghargaan',
    'Riwayat SKP',
    'Riwayat Penilaian Prestasi Kerja',
    'Riwayat Hukuman Disiplin',
    'Riwayat Keluarga',
    'Riwayat Cuti',
    'Riwayat Catatan'
  ]


  return (
    <Container
      width='lg'
    >
      <Grid
        container
        justifyContent='space-between'
      >
        <Grid
          container
          item
          justifyContent='space-between'
        >
          <Box>
            <Typography
              fontWeight='bold'
            >
              Detail Profile
            </Typography>
          </Box>

          <Box>
            {/* <Button
              text='Edit Status pegawai'
            /> */}
            <ButtonExport />
          </Box>
        </Grid>
        <Grid
          container
          item
          padding={2}
          gap={3}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '10px'
          }}
        >
          <Box>
            <Image
              src='/simdatuk/imagePegawai.png'
              width={110}
              height={150}
              alt='Pegawai'
            />
          </Box>
          <Box
            component='div'
          >
            <Typography
              component='h5'
              fontSize={20}
              fontWeight='bold'
              color='primary'
            >
              Dr. Ir. Suprayoga Hadi, M.S.P.
            </Typography>
            <Typography
              fontSize={14}
              fontWeight='500'
            >
              Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan Pemerataan Pembangunan
            </Typography>
            <Box
              paddingTop={2}
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Box
              >
                <Typography
                  component='h5'
                >
                  Eselon
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight='500'
                >
                  Abc
                </Typography>
              </Box>
              <Box>
                <Typography
                  component='h5'
                >
                  Golongan
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight='500'
                >

                </Typography>
              </Box>
              <Box>
                <Typography
                  component='h5'
                >
                  NIP/NRP
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight='500'
                >

                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={2}
        >
          <List
            sx={{
              borderRadius: '12px',
              overflow: 'hidden',
              marginY: 2,
              backgroundColor: '#fff'
            }}
          >
            {
              dataPegawai.map((item, index) => (
                <ListNavigation
                  key={index}
                  name={item}
                />
              ))
            }
          </List>
        </Grid>
        <Grid
          marginY={1}
          width='82%'
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

DetailPegawaiLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DetailPegawaiLayout
