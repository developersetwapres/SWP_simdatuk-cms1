/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import Paper from '@/components/shared/overrides/Paper'
import PropTypes from 'prop-types'
import { employeeTypeOptions } from 'libs/types/options'
import moment from 'moment'
import 'moment/locale/id'

const BiodataPegawai = ({ data, employmentType }) => {
  const path = useMemo(() => {
    const type = data?.type
    const datas = {
      ASN: type == 1,
      NonASN: type == 2,
      Outsource: type == 3
    }

    return datas
  }, [data])

  const isLastDate = useMemo(() => {
    return ![1, 6, 10].includes(data?.employment_status)
  }, [data?.employment_status])

  const options = useMemo(() => {
    const data = {
      type: employeeTypeOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    if (type == 'type') {
      const val =
        employmentType && employmentType.find((itm) => itm?.id == value)

      return val?.name || '-'
    } else {
      return options[type][value]
    }
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
          <Typography>Tanggal Perkawinan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.marriage_date || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Keterangan Perkawinan</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.marriage_description || '-'}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Keterangan Lainnya</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.marriage_other_notes || '-'}
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>
            {data?.type == 1
              ? 'Jenis Pegawai'
              : data?.type == 2
              ? 'Jenis Perbantuan'
              : 'Jenis Outsourcing'}
          </Typography>
          <Typography fontWeight='500' marginTop={1}>
            {getValueOptions(data?.employment_type_id, 'type')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>
            {path?.ASN
              ? 'TMT CPNS'
              : path?.NonASN
              ? 'Tanggal Mulai Bekerja di Sekretariat Wakil Presiden'
              : 'Tanggal Mulai Bekerja'}
          </Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.cpns_effective_date || '-'}
          </Typography>
        </Grid>
        {path?.ASN && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>TMT PNS</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.pns_effective_date || '-'}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>TMT Golongan</Typography>
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
          <Typography>Tingkat Pendidikan Akhir</Typography>
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
        {path?.ASN && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>No. Karpeg / No. Karisu</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {`${data?.employee_id_card_number || '-'} / 
              ${data?.karisu_number || '-'}`}
            </Typography>
          </Grid>
        )}
        {!path?.Outsource && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>SK Pengangkatan</Typography>
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
        )}

        {path?.ASN && (
          <>
            <Grid item xs={12} md={4} paddingY={1}>
              <Typography>Masa Kerja Keseluruhan</Typography>
              <Typography fontWeight='500' marginTop={1}>
                {data?.years_of_service_total || data?.month_of_service_total
                  ? `${data?.years_of_service_total || 0} Tahun, ${
                      data?.month_of_service_total || 0
                    } Bulan`
                  : '-'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} paddingY={1}>
              <Typography>Masa Kerja Golongan</Typography>
              <Typography fontWeight='500' marginTop={1}>
                {data?.years_of_service_rank || data?.month_of_service_rank
                  ? `${data?.years_of_service_rank || 0} Tahun, ${
                      data?.month_of_service_rank || 0
                    } Bulan`
                  : '-'}
              </Typography>
            </Grid>
          </>
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
        {isLastDate && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Tanggal Terakhir Bekerja</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.quit_date || '-'}
            </Typography>
          </Grid>
        )}
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
        {path?.ASN && (
          <>
            <Grid item xs={12} md={4} paddingY={1}>
              <Typography>Komplek</Typography>
              <Typography fontWeight='500' marginTop={1}>
                {data?.residence_name || '-'}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Tempat Tinggal Saat Ini</Typography>
          <Typography fontWeight='500' marginTop={1}>
            {data?.residence_description || '-'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} paddingY={1}>
          <Typography>Alamat Sesuai KTP</Typography>
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
        {!path?.NonASN && (
          <Grid item xs={12} md={4} paddingY={1}>
            <Typography>Batas Usia Pensiun</Typography>
            <Typography fontWeight='500' marginTop={1}>
              {data?.retirement_age && data?.retirement_age_years
                ? `${moment(data?.retirement_age, 'DD-MM-YYYY').format(
                    'MMMM YYYY'
                  )} - ${data?.retirement_age_years || 0} Tahun`
                : '-'}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

BiodataPegawai.propTypes = {
  data: PropTypes.object,
  employmentType: PropTypes.object
}

export default BiodataPegawai
