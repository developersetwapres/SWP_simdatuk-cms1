/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatKeluargaSection = ({ detail }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'No. Kartu Keluarga',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Anggota Keluarga',
        width: 200,
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
        align: 'left'
      },
      {
        Header: 'Tanggal Lahir',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Bapak',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Ibu',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Hubungan Keluarga',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Pendidikan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Pekerjaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Pekerjaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status Perkawinan',
        width: 200,
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
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.performances || []
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
          Cell: () => <Typography>{item?.tingkat}</Typography>
        },
        {
          Header: 'Nama Anggota Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'No. NIK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.fakultas}</Typography>
        },
        {
          Header: 'Jenis Kelamin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jurusan}</Typography>
        },
        {
          Header: 'Agama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status}</Typography>
        },
        {
          Header: 'Tempat Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Tanggal Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Nama Bapak',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Nama Ibu',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Hubungan Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Pendidikan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Jenis Pekerjaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Keterangan Pekerjaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Status Perkawinan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'No. HP',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Urut Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        }
      ]
    })

    return dataMapping
  }, [detail])

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
  detail: PropTypes.object
}

export default RiwayatKeluargaSection
