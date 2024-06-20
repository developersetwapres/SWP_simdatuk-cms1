/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const data = [
  {
    golongan: '-',
    tmt_golongan: '-',
    sk_golongan: '-',
    sk_golongan_file: '-',
    jenis_sk_golongan: '-',
    no_sk_golongan: '-',
    tanggal_sk_golongan: '-',
    keterangan_golongan: '-',
    status_golongan: '-'
  },
  {
    golongan: '-',
    tmt_golongan: '-',
    sk_golongan: '-',
    sk_golongan_file: '-',
    jenis_sk_golongan: '-',
    no_sk_golongan: '-',
    tanggal_sk_golongan: '-',
    keterangan_golongan: '-',
    status_golongan: '-'
  }
]

const RiwayatGolonganSection = ({ detail }) => {
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
        Header: 'TMT Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status Golongan',
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
          Header: 'Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.golongan}</Typography>
        },
        {
          Header: 'TMT Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tmt_golongan}</Typography>
        },
        {
          Header: 'SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.sk_golongan}</Typography>
        },
        {
          Header: 'SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              <Button text='Lihat File' />
            </Typography>
          )
        },
        {
          Header: 'Jenis SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jenis_sk_golongan}</Typography>
        },
        {
          Header: 'No. SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.no_sk_golongan}</Typography>
        },
        {
          Header: 'Tanggal SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tanggal_sk_golongan}</Typography>
        },
        {
          Header: 'Keterangan Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.keterangan_golongan}</Typography>
        },
        {
          Header: 'Status Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status_golongan}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data, detail])

  return (
    <Grid>
      <Table
        title='Riwayat Golongan'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatGolonganSection.propTypes = {
  detail: PropTypes.object
}

export default RiwayatGolonganSection
