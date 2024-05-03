/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'

const data = [
  {
    tingkat: 'SD/Sederajat',
    nama: 'SDN Karang Tengah 2',
    fakultas: null,
    jurusan: 'SD',
    status: 'Lulus',
    tahun: '2024'
  }
]

const RiwayatCatatanSection = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Tingkat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Sekolah',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Fakultas',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jurusan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tahun Luluss',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const dataMapping = data.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Tingkat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tingkat}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Fakultas',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.fakultas}</Typography>
        },
        {
          Header: 'Jurusan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jurusan}</Typography>
        },
        {
          Header: 'Status',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status}</Typography>
        },
        {
          Header: 'Tahun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Catatan'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

export default RiwayatCatatanSection
