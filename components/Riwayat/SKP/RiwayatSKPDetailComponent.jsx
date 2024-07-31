/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import {
  employeeWorkBehaviorRatingOptions,
  monthOptions,
  periodOptions,
  predicateOptions,
  ratingOrganizationOptions
} from 'libs/types/options'
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: 'fit-content',
    fontSize: '16px',
    textTransform: 'none'
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  fontItem: {
    fontWeight: 600
  }
}

const RiwayatSKPDetailComponent = ({
  target,
  getTarget = () => {},
  clearTargetState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()

  const data = useMemo(() => {
    return target?.detail
  }, [target])

  const options = useMemo(() => {
    const data = {
      periode: periodOptions,
      predikat: predicateOptions,
      rating: employeeWorkBehaviorRatingOptions,
      organisasi: ratingOrganizationOptions
    }

    return data
  }, [])

  const handleGetValue = (value, type) => {
    const val = value ? options[type][value - 1] : ''
    return val
  }

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 60,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai',
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
      },
      {
        Header: 'Aksi',
        width: 160,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = target?.detail?.users || []
    const dataMapping = data.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Rating',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {handleGetValue(item?.work_behavior_rating, 'rating')}
            </Typography>
          )
        },
        {
          Header: 'Predikat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {handleGetValue(item?.employee_performance_predicate, 'predikat')}
            </Typography>
          )
        },
        {
          Header: 'Pencapaian',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {handleGetValue(
                item?.organizational_performance_achievement,
                'organisasi'
              )}
            </Typography>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_SKP, Access.READ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/skp/detail/pegawai/${btoa(item?.user_id)}`
                    )
                  }
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [target])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_SKP, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(`/data-riwayat/skp/edit/${router?.query?.id}`)
            }
          />
        )}
      </Box>
    )
  }, [])

  const handleParsePeriod = (month, year) => {
    return month && year ? `${monthOptions[month - 1]} ${year}` : '-'
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getTarget(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearTargetState)

    return () => {
      router.events.off('routeChangeComplete', clearTargetState)
    }
  }, [router])

  useEffect(() => {
    const state = !target?.loading && Object.entries(target?.detail).length > 0
    onLoading(state)
  }, [target])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat SKP'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Penghargaan */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat Jabatan</Typography>
              <Typography sx={styles?.fontItem}>{data?.name || '-'}</Typography>
            </Box>
          </Grid>
          {/* Periode */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={styles?.fontItem}>
                {handleParsePeriod(data?.period_month, data?.period_year)}
              </Typography>
            </Box>
          </Grid>
          {/* Periode Penilaian */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Penilaian</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.appraisal_period || '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Tahun */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Tahun</Typography>
              <Typography sx={styles?.fontItem}>{data?.year || '-'}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Table
          columns={columns}
          rows={rows}
          title='Daftar Pegawai'
          colorTitle='simdatukPrimary'
          paper={false}
        />
      </Paper>
    </LayoutPages>
  )
}

RiwayatSKPDetailComponent.propTypes = {
  target: PropTypes.object,
  getTarget: PropTypes.func,
  clearTargetState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatSKPDetailComponent
