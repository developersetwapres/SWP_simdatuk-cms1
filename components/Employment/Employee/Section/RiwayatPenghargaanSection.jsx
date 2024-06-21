/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatPenghargaanSection = ({ detail }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Nama Penghargaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Penghargaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. SK Penghargaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tahun SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Instansi Pemberi Penghargaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Terima',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.recognitions || []
    const dataMapping = data?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Nama Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Keterangan Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Jenis SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Tanggal SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'No. SK Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Tahun SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Instansi Pemberi Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Tanggal Terima',
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
        title='Riwayat Penghargaan'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatPenghargaanSection.propTypes = {
  detail: PropTypes.object
}

export default RiwayatPenghargaanSection
