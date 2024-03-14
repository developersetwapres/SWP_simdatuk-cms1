import DetailPegawaiLayout from '@/components/core/DetailPegawaiLayout'
import { Grid, Paper } from '@mui/material'
import React from 'react'
import RiwayatPendidikanSection from './section/RiwayatPendidikanSection'
import BiodataPegawai from './section/BiodataPegawai'
import RiwayatJabatanSection from './section/RiwayatJabatanSection'
import RiwayatGolonganSection from './section/RiwayatGolongan'
import RiwayatGajiSection from './section/RiwayatGajiSection'
import PelatihanStrukturalSection from './section/PelatihanStrukturalSection'
import PelatihanFungsionalSection from './section/PelatihanFungsional'
import RiwayatPelatihanTeknisSection from './section/RiwayatPelatihanTeknisSection'
import RiwayatPenghargaanSection from './section/RiwayatPenghargaanSection'
import RiwayatSKP from './section/RiwayatSKPSection'
import RiwayatPrestasiKerja from './section/RiwayatPrestasiKerja'
import RiwayatHukumanDisiplin from './section/RiwayatHukumanDisiplin'
import RiwayatKeluargaSection from './section/RiwayatKeluargaSection'
import RiwayatCutiSection from './section/RiwayatCutiSection'
import RiwayatCatatanSection from './section/RiwayatCatatanSection'





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
