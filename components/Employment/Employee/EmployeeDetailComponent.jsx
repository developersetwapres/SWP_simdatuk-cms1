/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import EmploymentLayout from '../EmploymentLayout'
import { Box, Grid, List, Paper, Typography } from '@mui/material'
import BiodataPegawai from './Section/BiodataPegawai'
import ListNavigation from '@/components/core/ListNavigation'
import RiwayatPendidikanSection from './Section/RiwayatPendidikanSection'
import RiwayatJabatanSection from './Section/RiwayatJabatanSection'
import RiwayatGolonganSection from './Section/RiwayatGolongan'
import RiwayatGajiSection from './Section/RiwayatGajiSection'
import PelatihanStrukturalSection from './Section/PelatihanStrukturalSection'
import PelatihanFungsionalSection from './Section/PelatihanFungsional'
import RiwayatPelatihanTeknisSection from './Section/RiwayatPelatihanTeknisSection'
import RiwayatPenghargaanSection from './Section/RiwayatPenghargaanSection'
import RiwayatSKP from './Section/RiwayatSKPSection'
import RiwayatPrestasiKerja from './Section/RiwayatPrestasiKerja'
import RiwayatHukumanDisiplin from './Section/RiwayatHukumanDisiplin'
import RiwayatKeluargaSection from './Section/RiwayatKeluargaSection'
import RiwayatCutiSection from './Section/RiwayatCutiSection'
import RiwayatCatatanSection from './Section/RiwayatCatatanSection'
import { useRouter } from 'next/router'

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

const EmployeeDetailComponent = () => {
  const router = useRouter()
  return (
    <EmploymentLayout
      handleBack={() => router.back()}
      summary={'Detail Profil'}
      formatExport={['PDF']}
      otherStyle={{ alignItems: 'center' }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PaperContainer
            otherStyle={{ height: '200px', display: 'flex', gap: '20px' }}
          >
            {/* Image Profile */}
            <Box
              sx={{
                height: '160px',
                width: '130px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src='/simdatuk/imagePegawai.png'
                alt='Pegawai'
                style={{
                  height: '100%',
                  width: 'fit-content'
                }}
              />
            </Box>
            {/* Detail Bio */}
            <Box sx={{ width: '100%' }}>
              <Typography
                component='h5'
                fontSize={20}
                fontWeight='bold'
                color='primary'
              >
                Dr. Ir. Suprayoga Hadi, M.S.P.
              </Typography>
              <Typography fontSize={14} fontWeight='500'>
                Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan
                Pemerataan Pembangunan
              </Typography>
              <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Eselon
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      Es. I.a, 25-01-2021
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      Golongan
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      Pembina Utama (IV/e), 01-04-2017
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography component='h5' sx={{ fontSize: '14px' }}>
                      NIP/NRP
                    </Typography>
                    <Typography fontSize={14} fontWeight='600'>
                      1965053019991031002
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </PaperContainer>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={2} sx={{ position: 'sticky', top: '400px' }}>
              <List
                sx={{
                  padding: '12px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff'
                }}
              >
                {dataPegawai.map((item, index) => (
                  <ListNavigation key={index} name={item} />
                ))}
              </List>
            </Grid>
            <Grid item xs={10}>
              <Grid container gap={3}>
                <Grid item xs={12}>
                  <PaperContainer>
                    <BiodataPegawai />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatPendidikanSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatJabatanSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatGolonganSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatGajiSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <PelatihanStrukturalSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <PelatihanFungsionalSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatPelatihanTeknisSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatPenghargaanSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatSKP />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatPrestasiKerja />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatHukumanDisiplin />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatKeluargaSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatCutiSection />
                  </PaperContainer>
                </Grid>
                <Grid item xs={12}>
                  <PaperContainer>
                    <RiwayatCatatanSection />
                  </PaperContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </EmploymentLayout>
  )
}

const PaperContainer = ({ children, otherStyle }) => {
  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '12px',
        padding: '20px',
        backgroundColor: '#fff',
        ...otherStyle
      }}
    >
      {children}
    </Paper>
  )
}

PaperContainer.propTypes = {
  children: PropTypes.node,
  otherStyle: PropTypes.object
}

export default EmployeeDetailComponent
