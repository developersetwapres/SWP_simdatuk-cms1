/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatHukumanDisiplin = ({ detail }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Hukuman',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tingkat Hukuman',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Pemotongan Tunjangan Kinerja(Persentase)',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jangka Waktu Pemotongan(Bulan)',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. SK Hukuman Disiplin',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Hukuman Disiplin',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Hukuman Disiplin',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Masa Berlaku',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Pejabat Berwenang',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Pejabat Berwenang',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Uraian',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.disciplinaries || []
    const dataMapping = data?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tingkat}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Jenis Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.fakultas}</Typography>
        },
        {
          Header: 'Tingkat Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jurusan}</Typography>
        },
        {
          Header: 'Pemotongan Tunjangan Kinerja(Persentase)',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status}</Typography>
        },
        {
          Header: 'Jangka Waktu Pemotongan(Bulan)',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'No. SK Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Tanggal SK Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Tanggal Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Status',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Masa Berlaku',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Nama Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Uraian',
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
        title='Riwayat Hukuman Disiplin'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatHukumanDisiplin.propTypes = {
  detail: PropTypes.object
}

export default RiwayatHukumanDisiplin
