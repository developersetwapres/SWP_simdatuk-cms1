/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { positionDescOptions } from 'libs/types/options'

const RiwayatJabatanSection = ({ data = [] }) => {
  const options = useMemo(() => {
    const data = {
      position_desc: positionDescOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    return options[type][value - 1]
  }

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Nama Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'SK Menjabat dan Tanggal SK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Eselon?',
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
          Header: 'Nama Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position || '-'}</Typography>
        },
        {
          Header: 'TMT Menjabat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.effective_date || '-'}</Typography>
        },
        {
          Header: 'SK Menjabat dan Tanggal SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree || '-'}</Typography>
        },
        {
          Header: 'Keterangan Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.position_status, 'position_desc')}
            </Typography>
          )
        },
        {
          Header: 'Keterangan Eselon',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>?</Typography>
          )
        }
      ]
    })

    return dataMapping
  }, [data])

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
  data: PropTypes.array
}

export default RiwayatJabatanSection
