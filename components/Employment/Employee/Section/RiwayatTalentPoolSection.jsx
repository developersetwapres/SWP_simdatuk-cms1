/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatTalentPoolSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Hasil',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Penyelenggara',
        width: 200,
        align: 'left'
      },
      {
        Header: 'File Pendukung',
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
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.event_date || '-'}</Typography>
        },
        {
          Header: 'Hasil',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.point || '-'}</Typography>
        },
        {
          Header: 'Penyelenggara',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.organizer || '-'}</Typography>
        },
        {
          Header: 'File Pendukung',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <>
              {
                item?.talent_document ?
                  <Button
                    text='Lihat File'
                    onClick={() => openInNewTab(item?.talent_document)}
                  /> :
                  <Typography>-</Typography >
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
        title='Hasil Talent Pool'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatTalentPoolSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatTalentPoolSection
