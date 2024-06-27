/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table, Button } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { leavesOptions } from 'libs/types/options'

const RiwayatCutiSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Periode',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Cuti',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No. Cuti',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Surat Cuti',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const options = useMemo(() => {
    const data = {
      leaves: leavesOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    return options[type][value]
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
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.start_date || '-'}</Typography>
        },
        {
          Header: 'Jenis Cuti',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{getValueOptions(item?.type, 'leaves')}</Typography>
        },
        {
          Header: 'No. Cuti',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.number || '-'}</Typography>
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.description || '-'}</Typography>
        },
        {
          Header: 'Surat Cuti',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>
            {
              <>
                {item?.letter ? (
                  <Button text='Lihat File' onClick={() => openInNewTab(item?.letter)} />
                ) : (
                  <Typography>-</Typography>
                )}
              </>
            }
          </Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat Cuti'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatCutiSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatCutiSection
