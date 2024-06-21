/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatJabatanSection = ({ detail }) => {
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
        Header: 'Rumpun',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenjang Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Selesai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Selesai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis SK Selesai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. SK Selesai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Selesai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status jabatan',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = detail?.positions || []
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
          Header: 'Rumpun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.group_name || '-'}</Typography>
        },
        {
          Header: 'Jenjang Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.echelon || '-'}</Typography>
        },
        {
          Header: 'Keterangan Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{'-'}</Typography>
        },
        {
          Header: 'TMT Menjabat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.effective_date || '-'}</Typography>
        },
        {
          Header: 'SK Menjabat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree || '-'}</Typography>
        },
        {
          Header: 'SK Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.decree_document ? <Button text='Lihat File' /> : '-'}
            </Typography>
          )
        },
        {
          Header: 'Jenis SK Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.type_decree_name || '-'}</Typography>
        },
        {
          Header: 'No. SK Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_date || '-'}</Typography>
        },
        {
          Header: 'TMT Selesai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{'-'}</Typography>
        },
        {
          Header: 'SK Selesai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.termination_decree || '-'}</Typography>
        },
        {
          Header: 'Jenis SK Selesai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.type_termination_decree_name || '-'}</Typography>
        },
        {
          Header: 'No. SK Selesai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.termination_decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK Selesai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.termination_decree_date || '-'}</Typography>
        },
        {
          Header: 'Status Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{'-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [detail])

  return (
    <Grid>
      <Table
        title='Riwayat Jabatan'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatJabatanSection.propTypes = {
  detail: PropTypes.object
}

export default RiwayatJabatanSection
