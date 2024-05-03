/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react'
import { Box, Grid, List, Typography } from '@mui/material'
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
import LayoutPages from '@/components/core/LayoutPages'
import ButtonExport from '@/components/core/ButtonExport'
import Paper from '@/components/shared/overrides/Paper'
import { Button } from '@/components/shared'

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

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Edit Status Pegawai' color='primary' onClick={() => {}} />
        <Button text='Edit' color='sidatukDraweBase' onClick={() => {}} />
        <ButtonExport data={[{ name: 'PDF', action: () => {} }]} />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Detail Profil'}
      formatExport={['PDF']}
      otherStyle={{ alignItems: 'center' }}
      action={action}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ height: '200px', display: 'flex', gap: '20px' }}>
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
          </Paper>
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
                  <BiodataPegawai />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPendidikanSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatJabatanSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatGolonganSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatGajiSection />
                </Grid>
                <Grid item xs={12}>
                  <PelatihanStrukturalSection />
                </Grid>
                <Grid item xs={12}>
                  <PelatihanFungsionalSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPelatihanTeknisSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPenghargaanSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatSKP />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatPrestasiKerja />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatHukumanDisiplin />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatKeluargaSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatCutiSection />
                </Grid>
                <Grid item xs={12}>
                  <RiwayatCatatanSection />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LayoutPages>
  )
}

export default EmployeeDetailComponent
