/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatCutiSection = ({ detail }) => {
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
        Header: 'Periode',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Alasan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. Cuti',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tujuan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Surat Cuti',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.leaves || []
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
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.fakultas}</Typography>
        },
        {
          Header: 'Alasan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jurusan}</Typography>
        },
        {
          Header: 'No. Cuti',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status}</Typography>
        },
        {
          Header: 'Tujuan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tahun}</Typography>
        },
        {
          Header: 'Surat Cuti',
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
        title='Riwayat Cuti'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatCutiSection.propTypes = {
  detail: PropTypes.object
}

export default RiwayatCutiSection
