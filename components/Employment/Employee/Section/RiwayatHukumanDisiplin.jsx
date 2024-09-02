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
        Header: 'Nomor SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Hukuman Disiplin',
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
          Header: 'Nomor SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.date_of_decree || '-'}</Typography>
        },
        {
          Header: 'Tanggal Hukuman Disiplin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{`${item?.start_date || ''}-${item?.end_date || ''}`}</Typography>
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
