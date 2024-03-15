import { Grid, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const DataDiri = ({ data }) => {
  return (
    <Grid container>

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
          : {data.tempatTanggalLahir}
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
          : {data.agama}
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
          : {data.jenisKelamin}
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
          : {data.statusPerkawinan}
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
          : {data.instansiInduk}
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
          : {data.satuanOrganisasi}
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
          : {data.unitKerja}
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
          : {data.noKarpegNoKarisNoKarsu}
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
          : {data.masaKerjaKeseluruhan}
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
          : {data.masaKerjaGolongan}
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
          : {data.masaKerjaGolongan}
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
          : {data.statusPegawai}
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
          : {data.komplek}
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
          : {data.namaKomplek}
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
          : {data.alamatTempatTinggalSaatIni}
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
          : {data.noTeleponRumah}
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
          : {data.noHP}
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
          : {data.alamatKantor}
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
          : {data.noTeleponRumah}
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
          : {data.email}
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
          : {data.batasUsiaPensiun}
        </Typography>
      </Grid>
    </Grid>

  )
}

DataDiri.propTypes = {
  data: PropTypes.object
}

export default DataDiri
