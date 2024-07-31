/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import Paper from '@/components/shared/overrides/Paper'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { employeeTypeOptions } from 'libs/types/options'
import moment from 'moment'
import 'moment/locale/id'

const BiodataPegawai = ({ data }) => {
  const router = useRouter()

  const path = useMemo(() => {
    const type = data?.type
    const data = {
      ASN: type == 1,
      NonASN: type == 2,
      Outsource: type == 3
    }

    return data
  }, [data])

  const options = useMemo(() => {
    const data = {
      type: employeeTypeOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    return options[type][value]
  }

  const openInNewTab = (url) => {
    if (!url) return

    window.open(url, '_blank')
  }

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
            {[data?.place_of_birth || '-', data?.date_of_birth || '-'].join(
              ', '
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Agama</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.religion || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Jenis Kelamin</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.gender == 0 ? 'Perempuan' : 'Laki-laki'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Status Perkawinan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.maritalStatus || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>
            {data?.type == 1
              ? 'Jenis Pegawai'
              : data?.type == 2
              ? 'Jenis Perbantuan'
              : 'Jenis Outsourcing'}
          </Typography>
          <Typography fontWeight='500' marginTop={1}>
            {getValueOptions(data?.type - 1, 'type')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>TMT Menjabat</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.position_effective_date || '-'}
          </Typography>
        </Grid>
        {!path?.Outsource && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Instansi Induk</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.institution_name || '-'}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Tingkat Pendidikan Terakhir</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.educationLevel || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Nama Sekolah/Universitas</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.education_name || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Tahun Lulus</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.education_year || '-'}
          </Typography>
        </Grid>
        {!path?.Outsource && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>No. Karpeg / No. Karisu</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {`${data?.employee_id_card_number || '-'} / 
              ${data?.karisu_number || '-'}`}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Kartu Pegawai</Typography>
          {data?.employee_id_card ? (
            <Button
              text='Lihat File'
              onClick={() => openInNewTab(data?.employee_id_card)}
            />
          ) : (
            <Typography fontWeight='500' marginTop={1}>
              -
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Masa Kerja Keseluruhan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.cpns_years_of_service || '-'}
          </Typography>
        </Grid>{' '}
        {!path?.Outsource && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Masa Kerja Golongan</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.grade_years_of_service || '-'}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>NPWP</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.id_tax || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Status Pegawai</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.employmentStatus || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. KK</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.family_registration_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. NIK</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.id_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Komplek</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.residence_name || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Nama Komplek</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.residence_description || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Tempat Tinggal Saat Ini</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.current_address || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. Telepon Rumah</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.home_phone_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. HP</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.mobile_phone || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Kantor</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.office_address || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>No. Telepon Kantor</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.office_phone_number || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Email</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.email || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Email Dinas</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.office_email || '-'}
          </Typography>
        </Grid>
        {!path?.ASN && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Keterangan</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.description || '-'}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Kontak Darurat</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.emergency_contact || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Batas Usia Pensiun</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.retirement_age
              ? moment(data?.retirement_age, 'DD-MM-YYYY').format('MMMM YYYY')
              : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

BiodataPegawai.propTypes = {
  data: PropTypes.object
}

export default BiodataPegawai
