/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatPrestasiKerja = ({ detail }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Periode PPK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nilai Prestasi Kerja',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const dataMapping = detail?.performances?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Periode PPK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Nilai Prestasi Kerja',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        }
      ]
    })

    return dataMapping
  }, [detail])

  return (
    <Grid>
      <Table
        title='Riwayat Penilaian Prestasi Kerja'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatPrestasiKerja.propTypes = {
  detail: PropTypes.object
}

export default RiwayatPrestasiKerja
