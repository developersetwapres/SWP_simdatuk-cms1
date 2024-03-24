import DetailPegawaiLayout from '@/components/core/DetailPegawaiLayout'
import { Grid, Paper } from '@mui/material'
import React from 'react'
import RiwayatPendidikanSection from './Section/RiwayatPendidikanSection'
import BiodataPegawai from './Section/BiodataPegawai'
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





const DetailComponent = () => {


  return (
    <>
      <DetailPegawaiLayout
      >
        <Grid
          container
          xs={12}
          width='100%'
          borderRadius='12px'
          paddingY={1}
        >
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff'
            }}
          >
            <BiodataPegawai />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatPendidikanSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatJabatanSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatGolonganSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatGajiSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <PelatihanStrukturalSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <PelatihanFungsionalSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatPelatihanTeknisSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatPenghargaanSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatSKP />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatPrestasiKerja />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatHukumanDisiplin />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatKeluargaSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatCutiSection />
          </Paper>
          <Paper
            sx={{
              width: '100%',
              borderRadius: '12px',
              padding: 2,
              backgroundColor: '#fff',
              marginTop: 2
            }}
          >
            <RiwayatCatatanSection />
          </Paper>
        </Grid>
      </DetailPegawaiLayout>
    </>
  )
}

export default DetailComponent
