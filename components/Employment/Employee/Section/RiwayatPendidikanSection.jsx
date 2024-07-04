/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatPendidikanSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Tingkat',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Nama Sekolah',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Fakultas',
        width: 200,
        minWidth: 100,
        align: 'left'
      },
      {
        Header: 'Jurusan',
        width: 350,
        minWidth: 100,
        align: 'left'
      },
      {
        Header: 'Status',
        width: 200,
        minWidth: 100,
        align: 'left'
      },
      {
        Header: 'Tahun Lulus',
        width: 300,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Keterangan Sekolah',
        width: 400,
        minWidth: 180,
        align: 'left'
      },
      {
        Header: 'Ijazah',
        width: 300,
        minWidth: 120,
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
    const dataMapping = data?.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Tingkat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.level || '-'}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Fakultas',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.faculty || '-'}</Typography>
        },
        {
          Header: 'Jurusan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.major || '-'}</Typography>
        },
        {
          Header: 'Status',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status || '-'}</Typography>
        },
        {
          Header: 'Tahun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.year_of_graduation || '-'}</Typography>
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        },
        {
          Header: 'Ijazah',
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
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Pendidikan'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatPendidikanSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatPendidikanSection
