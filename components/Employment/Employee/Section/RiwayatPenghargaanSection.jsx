/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatPenghargaanSection = ({ data = [] }) => {
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
          Header: 'Nama Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.recognition_name || '-'}</Typography>
        },
        {
          Header: 'No. SK Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tahun SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_year || '-'}</Typography>
        },
        {
          Header: 'Instansi Pemberi Penghargaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.awarding_institution || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

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
  data: PropTypes.array
}

export default RiwayatPenghargaanSection
