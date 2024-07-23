/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import { monthOptions, positionDescOptions } from 'libs/types/options'
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
  }
}

const RiwayatJabatanDetailComponent = ({
  positionHistories,
  echelon,
  getPositionHistories = () => { },
  clearPositionState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()

  const options = useMemo(() => {
    const newEchelons = echelon?.data || []

    const data = {
      echelon: newEchelons,
      keteranganJabatan: positionDescOptions,
      month: monthOptions || []
    }

    return data
  }, [echelon])

  const handleGetValueId = (val, type) => {
    if (type == 'echelon') {
      const dataFilter =
        options['echelon'].find((itm) => itm?.id == val)?.name || null
      return dataFilter
    } else if (type == 'month') {
      const value = options['month'][val - 1]
      return value + 1
    } else {
      const value = options['keteranganJabatan'][val - 1] || null
      return value
    }
  }

  const data = useMemo(() => {
    return positionHistories?.detail
  }, [positionHistories])

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
        Header: 'Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenjang Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = positionHistories?.detail?.users || []
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
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position || '-'}</Typography>
        },
        {
          Header: 'Jenjang Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.echelon ? handleGetValueId(item?.echelon, 'echelon') : ''}
            </Typography>
          )
        },
        {
          Header: 'Keterangan Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.position_status
                ? handleGetValueId(item?.position_status, 'ketJabatan')
                : ''}
            </Typography>
          )
        },
        {
          Header: 'TMT',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.effective_date || '-'}</Typography>
        },
        {
          Header: 'No SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree || '-'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.READ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/jabatan/detail/pegawai/${btoa(
                        item?.user_id
                      )}`
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
  }, [positionHistories])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(`/data-riwayat/jabatan/edit/${router?.query?.id}`)
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
    if (id) getPositionHistories(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearPositionState)

    return () => {
      router.events.off('routeChangeComplete', clearPositionState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !positionHistories?.loading &&
      Object.entries(positionHistories?.detail).length > 0
    onLoading(state)
  }, [positionHistories])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Jabatan'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Nama Riwayat Jabatan</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {data?.name || '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {handleParsePeriod(data?.period_month, data?.period_year)}
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

RiwayatJabatanDetailComponent.propTypes = {
  positionHistories: PropTypes.object,
  echelon: PropTypes.object,
  getPositionHistories: PropTypes.func,
  clearPositionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatJabatanDetailComponent
