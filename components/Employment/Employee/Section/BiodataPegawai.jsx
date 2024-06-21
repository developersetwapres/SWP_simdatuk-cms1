import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import Paper from '@/components/shared/overrides/Paper'
import PropTypes from 'prop-types'

const BiodataPegawai = ({
  detail
}) => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} paddingBottom={2}>
          <Typography fontWeight='600' color='primary'>
            Data Pegawai
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Tempat, Tanggal Lahir</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.place_of_birth + ', ' + detail?.date_of_birth}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Agama</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.religion || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Jenis Kelamin</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.gender == 0 ? 'Perempuan' : 'Laki-laki'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Status Perkawinan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.maritalStatus || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Jenis Pegawai</Typography>
          <Typography fontWeight='500' marginTop={1}>-</Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>TMT Menjabat</Typography>
          <Typography fontWeight='500' marginTop={1}>-</Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Instansi Induk</Typography>
          <Typography fontWeight='500' marginTop={1}>-</Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Satuan Organisasi</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.satuan_organisasi || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Unit Kerja</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.unit_kerja || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Tingkat</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.educationLevel || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Nama Sekolah/Universitas</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.education_name || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Tahun Lulus</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.education_year || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. Karpeg/No. Karis/No. Karsu</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.employee_id_card_number || '-'}
          </Typography>
        </Grid>
        {detail?.employee_id_card && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Kartu Pegawai</Typography>
            <Button text='Lihat File' />
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Masa Kerja Keseluruhan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.masa_kerja_keseluruhan || '-'}
          </Typography>
        </Grid>{' '}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Masa Kerja Golongan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.masa_kerja_golongan || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>NPWP</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.id_tax || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Status Pegawai</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.employmentStatus || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. KK</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.family_registration_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. NIK</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.id_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Komplek</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.residence || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Nama Komplek</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.residence_name || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Tempat Tinggal Saat Ini</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.current_address || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. Telepon Rumah</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.home_phone_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. HP</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.mobile_phone || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Kantor</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.office_address || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. Telepon Kantor</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.office_phone_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Email</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.email || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Kontak Darurat</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.emergency_contact || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Batas Usia Pensiun</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {detail?.batas_usia_pensiun || '-'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

BiodataPegawai.propTypes = {
  detail: PropTypes.object
}

export default BiodataPegawai
