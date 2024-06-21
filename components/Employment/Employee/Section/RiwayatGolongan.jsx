/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

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
    const data = detail?.grades || []
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
          Cell: () => <Typography>{item?.grade_name || '-'}</Typography>
        },
        {
          Header: 'TMT Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.effective_date || '-'}</Typography>
        },
        {
          Header: 'SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.decree_document ? <Button text='Lihat File' /> : '-'}
            </Typography>
          )
        },
        {
          Header: 'Jenis SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.type_of_decree || '-'}</Typography>
        },
        {
          Header: 'No. SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_date || '-'}</Typography>
        },
        {
          Header: 'Keterangan Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        },
        {
          Header: 'Status Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [detail])

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
