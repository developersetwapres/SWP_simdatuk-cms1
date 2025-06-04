import { Grid, Typography } from '@mui/material'
import React from 'react'

const Biodata = () => {

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
    <>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Tempat, Tanggal Lahir
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.tempatTanggalLahir}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Agama
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.agama}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Jenis Kelamin
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.jenisKelamin}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Status Perkawinan
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.statusPerkawinan}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Instansi Indux
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.instansiInduk}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Satuan Organisasi
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.satuanOrganisasi}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Unit Kerja
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.unitKerja}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          No. Karpeg/No. Karis/No. Karsu
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.noKarpegNoKarisNoKarsu}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Masa Kerja Keseluruhan
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.masaKerjaKeseluruhan}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Masa Kerja Golongan
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.masaKerjaGolongan}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          NPWP
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.masaKerjaGolongan}
        </Typography>
      </Grid>

      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Status Pegawai
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.statusPegawai}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Komplek
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.komplek}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Nama Komplek
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.namaKomplek}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Alamat Tempat Tinggal Saat Ini
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.alamatTempatTinggalSaatIni}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          No. Telepon Rumah
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.noTeleponRumah}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          No. HP
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.noHP}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Alamat Kantor
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.alamatKantor}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          No. Telepon Kantor
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.noTeleponRumah}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >
        <Typography
          fontSize={14}
        >
          Email
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.email}
        </Typography>
      </Grid>
      <Grid item
        lg={4}
      >

        <Typography
          fontSize={14}
        >
          Batas Usia Pensiun
        </Typography>
      </Grid>
      <Grid
        item
        lg={8}
      >
        <Typography
          variant='p'
          component='div'
          fontSize={14}
          fontWeight='600'
        >
          : {dataPribadi.batasUsiaPensiun}
        </Typography>
      </Grid>
    </>
  )
}

export default Biodata
