/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const PelatihanStrukturalSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Nama Diklat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Penyelenggara',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenjang',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Pelaksanaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jam Pelajaran?',
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
          Header: 'Nama Diklat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Penyelenggara',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.organizer || '-'}</Typography>
        },
        {
          Header: 'Jenjang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.level || '-'}</Typography>
        },
        {
          Header: 'Tanggal Pelaksanaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.start_date || '-'}</Typography>
        },
        {
          Header: 'Jam Pelajaran',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>?</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Pelatihan Struktural'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

PelatihanStrukturalSection.propTypes = {
  data: PropTypes.array
}

export default PelatihanStrukturalSection
