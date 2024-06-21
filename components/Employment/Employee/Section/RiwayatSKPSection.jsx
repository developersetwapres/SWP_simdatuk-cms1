/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatSKP = ({ detail }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Periode Penilaian',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tahun',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Rating Perilaku Kerja',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Predikat Kinerja Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Capaian Kinerja Organisasi',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.performances || []
    const dataMapping = data?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Periode Penilaian',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Tahun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Rating Perilaku Kerja',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Predikat Kinerja Pegawai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>-</Typography>
        },
        {
          Header: 'Capaian Kinerja Organisasi',
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
        title='Riwayat SKP'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatSKP.propTypes = {
  detail: PropTypes.object
}

export default RiwayatSKP
