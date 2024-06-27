/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatHukumanDisiplin = ({ data = [] }) => {
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
          Cell: () => <Typography>{item?.grade || '-'}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position || '-'}</Typography>
        },
        {
          Header: 'Jenis Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.disciplinary_name || '-'}</Typography>
        },
        {
          Header: 'Tingkat Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.disciplinary_description || '-'}</Typography>
        },
        {
          Header: 'Pemotongan Tunjangan Kinerja(Persentase)',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.performance_allowance_deduction || '-'}</Typography>
        },
        {
          Header: 'Jangka Waktu Pemotongan(Bulan)',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.period_month || '-'}</Typography>
        },
        {
          Header: 'No. SK Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.date_of_decree || '-'}</Typography>
        },
        {
          Header: 'Tanggal Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.start_date || '-'}</Typography>
        },
        {
          Header: 'Status',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status || '-'}</Typography>
        },
        {
          Header: 'Masa Berlaku',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.performance_allowance_duration || '-'}</Typography>
        },
        {
          Header: 'Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.authorizing_officer || '-'}</Typography>
        },
        {
          Header: 'Nama Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name_of_authorizing_officer || '-'}</Typography>
        },
        {
          Header: 'Uraian',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

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
  data: PropTypes.array
}

export default RiwayatHukumanDisiplin
