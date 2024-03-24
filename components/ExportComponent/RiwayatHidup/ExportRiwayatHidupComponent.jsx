import ExportLayout from '@/components/core/ExportLayout'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import DataDiri from './DataDiri'

const ExportRiwayatHidup = () => {

  const dataPribadi = {
    tempatTanggalLahir: 'Bogor, 03-01-1979',
    agama: 'Islam',
    jenisKelamin: 'Perempuan',
    statusPerkawinan: 'Kawin',
    instansiInduk: 'Kementerian Sekretariat Negara',
    satuanOrganisasi: 'Sekretariat Wakil Presiden',
    unitKerja: '123',
    noKarpegNoKarisNoKarsu: 'M 303684/00 6977',
    masaKerjaKeseluruhan: '10 Tahun 2 bulan 15 Hari',
    masaKerjaGolongan: '3 Tahun 4 Bulan 2 hari',
    npwp: '49.666.836.9-416.000',
    statusPegawai: 'Aktif',
    komplek: 'Dalam',
    namaKomplek: 'Angrek Bulan',
    alamatTempatTinggalSaatIni: 'Jl. Anggrek Bulan 2 Blok F No. 13 Anggrek Loka Sektor 2.1. BSD Rawa Bunru, Serpong, Tangerang Selatan 15318',
    noTeleponRumah: '-',
    noHP: '-',
    alamatKantor: '-',
    noTeleponKantor: '-',
    email: '-',
    batasUsiaPensiun: 'Januari 2030'
  }





  return (
    <ExportLayout
      summary='Daftar Riwayat Hidup'
    >
      <Grid container>
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
              width={100}
              height={140}
              alt='Pegawai'
            />
          </Box>
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography
              component='h5'
              fontSize={16}
              fontWeight='bold'
            >
              Dr. Ir. Suprayoga Hadi, M.S.P.
            </Typography>
            <Typography
              fontSize={12}
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
                  fontSize={14}
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
                  fontSize={14}
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
                  fontSize={14}
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
          container
          item
          padding={2}
          gap={3}>
          <Typography>
            Data Pribadi
          </Typography>
          <Grid
            item
            container
            lg={12}
            sx={{
            }}
          >
            <DataDiri
              data={dataPribadi}
            />
          </Grid>
        </Grid>
      </Grid>

    </ExportLayout>
  )
}

export default ExportRiwayatHidup
