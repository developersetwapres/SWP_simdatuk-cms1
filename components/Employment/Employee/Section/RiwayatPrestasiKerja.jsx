/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { ppkDescOptions } from 'libs/types/options'

const RiwayatPrestasiKerja = ({ data = [] }) => {
  const getValueId = (val, type) => {
    if (!val) return '-'

    if (type == 'description') {
      return ppkDescOptions[val - 1]
    }
  }

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
    const dataMapping = data?.map((item, index) => {
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
          Cell: () => <Typography>{item?.period_year || '-'}</Typography>
        },
        {
          Header: 'Nilai Prestasi Kerja',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.work_performance_score || '-'}</Typography>
          )
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueId(item?.description, 'description')}
            </Typography>
          )
        }
      ]
    })

    return dataMapping
  }, [data])

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
  data: PropTypes.array
}

export default RiwayatPrestasiKerja
