/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import {
  educationLevelOptions,
  genderOptions,
  maritalStatusOptions,
  relationshipStatusOptions,
  religionOptions
} from 'libs/types/options'

const RiwayatKeluargaSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'No. Kartu Keluarga',
        width: 300,
        align: 'left'
      },
      {
        Header: 'Nama Anggota Keluarga',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'No. NIK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Kelamin',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Agama',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tempat Lahir',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Tanggal Lahir',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Nama Bapak',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Nama Ibu',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Hubungan Keluarga',
        width: 200,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Pendidikan',
        width: 200,
        minWidth: 170,
        align: 'left'
      },
      {
        Header: 'Jenis Pekerjaan',
        width: 200,
        minWidth: 140,
        align: 'left'
      },
      {
        Header: 'Keterangan Pekerjaan',
        width: 200,
        minWidth: 180,
        align: 'left'
      },
      {
        Header: 'Status Perkawinan',
        width: 200,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'No. HP',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Urut Keluarga',
        width: 200,
        minWidth: 130,
        align: 'left'
      }
    ],
    []
  )

  const options = useMemo(() => {
    const data = {
      gender: genderOptions,
      religion: religionOptions,
      relationship: relationshipStatusOptions,
      education: educationLevelOptions,
      marital_status: maritalStatusOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    return options[type][value]
  }

  const rows = useMemo(() => {
    const dataMapping = data?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'No. Kartu Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.card_number || '-'}</Typography>
        },
        {
          Header: 'Nama Anggota Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'No. NIK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.id_number || '-'}</Typography>
        },
        {
          Header: 'Jenis Kelamin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.gender - 1, 'gender')}
            </Typography>
          )
        },
        {
          Header: 'Agama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.religion - 1, 'religion')}
            </Typography>
          )
        },
        {
          Header: 'Tempat Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.place_of_birth || '-'}</Typography>
        },
        {
          Header: 'Tanggal Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.date_of_birth || '-'}</Typography>
        },
        {
          Header: 'Nama Bapak',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name_of_father || '-'}</Typography>
        },
        {
          Header: 'Nama Ibu',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name_of_mother || '-'}</Typography>
        },
        {
          Header: 'Hubungan Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.relationship_status - 1, 'relationship')}
            </Typography>
          )
        },
        {
          Header: 'Pendidikan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.education - 1, 'education')}
            </Typography>
          )
        },
        {
          Header: 'Jenis Pekerjaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.occupation || '-'}</Typography>
        },
        {
          Header: 'Keterangan Pekerjaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.occupation_description || '-'}</Typography>
          )
        },
        {
          Header: 'Status Perkawinan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.marital_status - 1, 'marital_status')}
            </Typography>
          )
        },
        {
          Header: 'No. HP',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.mobile_phone || '-'}</Typography>
        },
        {
          Header: 'Urut Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.sequence_number || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Keluarga'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatKeluargaSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatKeluargaSection
