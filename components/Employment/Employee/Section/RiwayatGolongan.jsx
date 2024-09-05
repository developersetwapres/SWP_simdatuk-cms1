/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatGolonganSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Golongan / Pangkat',
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

  const openInNewTab = (url) => {
    if (!url) return

    window.open(url, '_blank')
  }

  const rows = useMemo(() => {
    const dataMapping = data.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Golongan / Pangkat',
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
            <>
              {item?.decree_document ? (
                <Button
                  text='Lihat File'
                  onClick={() => openInNewTab(item?.decree_document)}
                />
              ) : (
                <Typography>-</Typography>
              )}
            </>
          )
        },
        {
          Header: 'Jenis SK Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.type_of_decree_name || '-'}</Typography>
          )
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
          Cell: () => (
            <Typography>
              {item?.status === 1 ? 'Aktif' : 'Tidak Aktif'}
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
        title='Riwayat Golongan / Pangkat'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatGolonganSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatGolonganSection
