import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'


const data =
{
  tempat_lahir: 'Bogor, 03-01-1979',
  agama: 'Islam',
  jenis_kelamin: 'Laki-laki',
  status_perkawinan: 'Kawin',
  instansi_induk: 'Kementerian Sekretariat Negara',
  satuan_organisasi: 'Sekretariat Wakil Presiden',
  unit_kerja: 'Unit Kerja',
  no_karpeg: 'M 303684/00 6977',
  kartu_pegawai: '123',
  masa_kerja_keseluruhan: '10 Tahun 2 bulan 15 Hari',
  masa_kerja_golongan: '3 Tahun 4 Bulan 2 hari',
  npwp: '49.666.836.9-416.000',
  status_pegawai: 'Aktif',
  alamat_tempat_tinggal: 'Jl. Anggrek Bulan 2 Blok F No. 13 Anggrek Loka Sektor 2.1. BSD Rawa Buntu, Serpong, Tangerang Selatan 15318',
  komplek: 'dalam',
  nama_komplek: 'Anggrek Bulan',
  no_telepon_rumah: '-',
  no_hp: '-',
  alamat_kantor: 'Alamat Kantor',
  no_telepon_kantor: '-',
  email: '-',
  batas_usia_pensiun: 'Januari 2030'
}


const BiodataPegawai = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          paddingBottom={2}
        >
          <Typography
            fontWeight='600'
            color='primary'
          >
            Data Pegawai
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Tempat, Tanggal Lahir</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.tempat_lahir}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Agama</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.agama}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Jenis Kelamin</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.jenis_kelamin}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Status Perkawinan</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.status_pegawai}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Instansi Induk</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.instansi_induk}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Satuan Organisasi</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.satuan_organisasi}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Unit Kerja</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.unit_kerja}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>No. Karpeg/No. Karis/No. Karsu</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.no_karpeg}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Kartu Pegawai</Typography>
          <Button
            text='Lihat File'
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Masa Kerja Keseluruhan</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.masa_kerja_keseluruhan}
          </Typography>
        </Grid> <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Masa Kerja Golongan</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.masa_kerja_golongan}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>NPWP</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.npwp}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Status Pegawai</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.status_pegawai}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Alamat Tempat Tinggal Saat Ini</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.alamat_tempat_tinggal}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Komplek</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.komplek}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Nama Komplek</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.nama_komplek}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>No. Telepon Rumah</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.no_telepon_rumah}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>No. HP</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.no_hp}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Alamat Kantor</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.alamat_kantor}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>No. Telepon Kantor</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.no_telepon_kantor}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Email</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.email}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          paddingY={1}
        >
          <Typography>Batas Usia Pensiun</Typography>
          <Typography
            fontWeight='500'
            marginTop={1}
          >
            {data.batas_usia_pensiun}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default BiodataPegawai
