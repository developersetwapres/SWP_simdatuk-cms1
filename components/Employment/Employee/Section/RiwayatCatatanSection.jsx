/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const RiwayatCatatanSection = ({
  data = [],
  addNewNotes = () => { }
}) => {
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
        Header: 'Inputer',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Catatan',
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
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.created_at || '-'}</Typography>
        },
        {
          Header: 'Inputer',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.giver_name || '-'}</Typography>
        },
        {
          Header: 'Catatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Catatan'
        action={<Button text='+ Tambah' onClick={addNewNotes} />}
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatCatatanSection.propTypes = {
  data: PropTypes.array,
  addNewNotes: PropTypes.func
}

export default RiwayatCatatanSection
