/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Table } from '@/components/shared'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import {
  employeePerformancePredicateOptions,
  employeeWorkBehaviorRatingOptions,
  organizationalPerformanceOptions
} from 'libs/types/options'

const RiwayatSKP = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Periode Penilaian',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Tahun',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Rating Perilaku Kerja',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Predikat Kinerja Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Capaian Kinerja Organisasi',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const options = useMemo(() => {
    const data = {
      predikat: employeePerformancePredicateOptions,
      rating: employeeWorkBehaviorRatingOptions,
      organisasi: organizationalPerformanceOptions
    }

    return data
  }, [])

  const handleGetValue = (value, type) => {
    const val = value ? options[type][value] : ''
    return val
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
          Header: 'Periode Penilaian',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.appraisal_period || '-'}</Typography>
        },
        {
          Header: 'Tahun',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.year || '-'}</Typography>
        },
        {
          Header: 'Rating Perilaku Kerja',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{handleGetValue(item?.work_behavior_rating, 'rating')}</Typography>
        },
        {
          Header: 'Predikat Kinerja Pegawai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{handleGetValue(item?.employee_performance_predicate, 'predikat')}</Typography>
        },
        {
          Header: 'Capaian Kinerja Organisasi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{handleGetValue(item?.organizational_performance_achievement, 'organisasi')}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <Grid>
      <Table
        title='Riwayat SKP'
        columns={columns}
        rows={rows}
        isPagination={false}
      />
    </Grid>
  )
}

RiwayatSKP.propTypes = {
  data: PropTypes.array
}

export default RiwayatSKP
