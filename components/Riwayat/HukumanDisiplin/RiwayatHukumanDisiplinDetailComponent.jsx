/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import { monthOptions } from 'libs/types/options'
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
  itemWrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fontItem: { fontWeight: 600 }
}

const RiwayatHukumanDisiplinDetailComponent = ({
  disciplinary,
  getDisciplinary = () => {},
  clearDisciplinaryState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()

  const data = useMemo(() => {
    return disciplinary?.detail
  }, [disciplinary])

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 60,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai / NIP',
        width: 400,
        minWidth: 260,
        align: 'left'
      },
      {
        Header: 'Pangkat / Golongan',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Jabatan',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Jenis Hukuman',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Tingkat Hukuman',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Pemotongan Tunjangan Kinerja (Persentase)',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Jangka Waktu Pemotongan (Bulan)',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'No SK Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Pejabat Berwenang',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Nama Pejabat Berwenang',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 200,
        minWidth: 200,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = disciplinary?.detail?.users || []
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.id}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{`${item?.name || ''} / ${
              item?.employee_id_number || ''
            }`}</Typography>
          )
        },
        {
          Header: 'Pangkat / Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.grade || '-'}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.position || '-'}</Typography>
        },
        {
          Header: 'Jenis Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.disciplinary_type_name || '-'}</Typography>
          )
        },
        {
          Header: 'Tingkat Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.disciplinary_type_description || '-'}
            </Typography>
          )
        },
        {
          Header: 'Pemotongan Tunjangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.performance_allowance_deduction || 0}
            </Typography>
          )
        },
        {
          Header: 'Waktu Pemotongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.performance_allowance_duration || 0}</Typography>
          )
        },
        {
          Header: 'No SK Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Tanggal SK Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.date_of_decree || '-'}</Typography>
        },
        {
          Header: 'Tanggal Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.start_date && item?.end_date
                ? `${item?.start_date} - ${item?.end_date}`
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.authorizing_officer || '-'}</Typography>
          )
        },
        {
          Header: 'Nama Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.name_of_authorizing_officer || '-'}</Typography>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(
                PermissionsIDs.HISTORY_DISCIPLINARY,
                Access.READ
              ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/hukuman-disiplin/detail/pegawai/${btoa(
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
  }, [disciplinary])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_DISCIPLINARY, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(
                `/data-riwayat/hukuman-disiplin/edit/${router?.query?.id}`
              )
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
    if (id) getDisciplinary(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearDisciplinaryState)

    return () => {
      router.events.off('routeChangeComplete', clearDisciplinaryState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !disciplinary?.loading && Object.entries(disciplinary?.detail).length > 0
    onLoading(state)
  }, [disciplinary])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Hukuman Disiplin'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }}>
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat Hukuman Disiplin</Typography>
              <Typography sx={styles?.fontItem}>{data?.name || '-'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Riwayat</Typography>
              <Typography sx={styles?.fontItem}>
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

RiwayatHukumanDisiplinDetailComponent.propTypes = {
  disciplinary: PropTypes.object,
  getDisciplinary: PropTypes.func,
  clearDisciplinaryState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatHukumanDisiplinDetailComponent
