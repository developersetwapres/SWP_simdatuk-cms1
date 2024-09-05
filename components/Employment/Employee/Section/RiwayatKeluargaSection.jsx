/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import {
  educationLevelOptions,
  genderOptions,
  maritalStatuFamilysOptions,
  relationshipStatusOptions,
  religionOptions
} from 'libs/types/options'

const RiwayatKeluargaSection = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Nama Anggota Keluarga',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Kelamin',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Tempat Tinggal',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Tanggal Lahir',
        width: 200,
        minWidth: 130,
        align: 'left'
      },
      {
        Header: 'Hubungan Keluarga',
        width: 200,
        minWidth: 160,
        align: 'left'
      }
    ],
    []
  )

  const options = useMemo(() => {
    const data = {
      gender: genderOptions,
      religion: religionOptions,
      relationship: relationshipStatusOptions,
      education: educationLevelOptions,
      marital_status: maritalStatuFamilysOptions
    }

    return data
  }, [])

  const getValueOptions = (value, type) => {
    return options[type][value] || '-'
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
          Header: 'Nama Anggota Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Jenis Kelamin',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(
                item?.gender !== null && item?.gender >= 0
                  ? item?.gender == 0
                    ? 1
                    : 0
                  : null,
                'gender'
              )}
            </Typography>
          )
        },
        {
          Header: 'Tempat Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.place_of_birth || '-'}</Typography>
        },
        {
          Header: 'Tanggal Lahir',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.date_of_birth || '-'}</Typography>
        },
        {
          Header: 'Hubungan Keluarga',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {getValueOptions(item?.relationship_status - 1, 'relationship')}
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
        title='Riwayat Keluarga'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatKeluargaSection.propTypes = {
  data: PropTypes.array
}

export default RiwayatKeluargaSection
