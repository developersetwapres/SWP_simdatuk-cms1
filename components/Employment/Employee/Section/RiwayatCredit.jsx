/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { monthOptions, periodCreditsOptions } from 'libs/types/options'

const RiwayatCredit = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
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
        Header: 'Tahun',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Bulan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Angka Kredit Terakhir',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const options = useMemo(() => {
    const data = {
      period: periodCreditsOptions,
      month: monthOptions
    }

    return data
  }, [])

  const handleGetValue = (value, type) => {
    const val = value || value >= 0 ? options[type][value - 1] : '-'
    return val
  }

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
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position || '-'}</Typography>
        },
        {
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{handleGetValue(item?.period, 'period')}</Typography>
          )
        },
        {
          Header: 'Tahun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{`${item?.year || '-'}`}</Typography>
        },
        {
          Header: 'Bulan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.start_month && item?.end_month
                ? `${handleGetValue(
                    item?.start_month,
                    'month'
                  )} - ${handleGetValue(item?.end_month, 'month')}`
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Point',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{`${
              item?.score && item?.score >= 0 ? item?.score : '-'
            }`}</Typography>
          )
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Penetapan Angka Kredit Terakhir'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatCredit.propTypes = {
  data: PropTypes.array
}

export default RiwayatCredit
