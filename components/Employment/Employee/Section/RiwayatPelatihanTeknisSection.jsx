/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
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
        Header: 'No. Surat Perintah',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Pelaksanaan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Durasi Pelatihan(Hari)',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Sertifikat',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const openInNewTab = url => {
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
          Header: 'Nama Diklat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'No. Surat Perintah',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.reference_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal Pelaksanaan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.start_date || '-'}</Typography>
        },
        {
          Header: 'Durasi Pelatihan(Hari)',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.duration || '-'}</Typography>
        },
        {
          Header: 'Sertifikat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <>
              {
                item?.certificate ?
                  <Button
                    text='Lihat File'
                    onClick={() => openInNewTab(item?.certificate)}
                  /> : <Typography>-</Typography>
              }
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
        title='Riwayat Pelatihan Teknis'
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
