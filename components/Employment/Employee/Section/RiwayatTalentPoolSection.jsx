/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatTalentPoolSection = ({ detail }) => {
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

  const rows = useMemo(() => {
    const dataMapping = detail?.performances?.map((item, index) => {
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
          Cell: () => <Typography>{item?.tingkat}</Typography>
        },
        {
          Header: 'Hasil',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Penyelenggara',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.fakultas}</Typography>
        },
        {
          Header: 'File Pendukung',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              <Button text='Lihat File' />
            </Typography>
          )
        }
      ]
    })

    return dataMapping
  }, [detail])

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
  detail: PropTypes.object
}

export default RiwayatTalentPoolSection
