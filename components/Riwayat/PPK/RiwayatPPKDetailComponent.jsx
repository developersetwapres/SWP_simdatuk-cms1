/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import { monthOptions, ppkDescOptions } from 'libs/types/options'
import { Access, accessGranted, PermissionsIDs } from '@/utils/permissionManager'

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

const RiwayatPPKDetailComponent = ({
  performance,
  getPerformance = () => { },
  clearPerformanceState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()

  const options = useMemo(() => {
    const data = {
      keterangan: ppkDescOptions
    }

    return data
  }, [])

  const data = useMemo(() => {
    return performance?.detail
  }, [performance])

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 60,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai',
        width: 300,
        align: 'left'
      },
      {
        Header: 'Nilai Prestasi Kerja',
        width: 300,
        align: 'left'
      },
      {
        Header: 'Keterangan',
        width: 300,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 50,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = performance?.detail?.users || []
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
          Header: 'Nilai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.work_performance_score || 0}</Typography>
          )
        },
        {
          Header: 'Nilai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.description
                ? options['keterangan'][item?.description - 1]
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_PERFORMANCE, Access.READ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/ppk/detail/pegawai/${btoa(item?.user_id)}`
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
  }, [performance])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_PERFORMANCE, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(`/data-riwayat/ppk/edit/${router?.query?.id}`)
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
    if (id) getPerformance(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearPerformanceState)

    return () => {
      router.events.off('routeChangeComplete', clearPerformanceState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !performance?.loading && Object.entries(performance?.detail).length > 0
    onLoading(state)
  }, [performance])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat PPK'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Riwayat PPK */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat PPK</Typography>
              <Typography sx={styles?.fontItem}>{data?.name || '-'}</Typography>
            </Box>
          </Grid>
          {/* Periode Riwayat */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Riwayat</Typography>
              <Typography sx={styles?.fontItem}>
                {handleParsePeriod(data?.period_month, data?.period_year)}
              </Typography>
            </Box>
          </Grid>
          {/* Periode PPK */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode PPK</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.performance_period || '-'}
              </Typography>
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

RiwayatPPKDetailComponent.propTypes = {
  performance: PropTypes.object,
  getPerformance: PropTypes.func,
  clearPerformanceState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPPKDetailComponent
