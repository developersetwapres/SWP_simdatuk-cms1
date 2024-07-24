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

const RiwayatGolonganDetailComponent = ({
  grade,
  getGrade = () => { },
  clearGradeState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()

  const data = useMemo(() => {
    return grade?.detail
  }, [grade])

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 40,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai / NIP',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No SK Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Status Golongan',
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
    const data = grade?.detail?.users || []
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
          Cell: () => (
            <Typography>{`${item?.name} / ${item?.employee_id_number}`}</Typography>
          )
        },
        {
          Header: 'Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.grade_name || '-'}</Typography>
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
          Cell: () => <Typography>{item?.decree_number || '-'}</Typography>
        },
        {
          Header: 'Status Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.status === 1 ? 'Aktif' : 'Tidak Aktif'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_GRADE, Access.READ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/golongan/detail/pegawai/${btoa(item?.user_id)}`
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
  }, [grade])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_GRADE, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(`/data-riwayat/golongan/edit/${router?.query?.id}`)
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
    if (id) getGrade(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearGradeState)

    return () => {
      router.events.off('routeChangeComplete', clearGradeState)
    }
  }, [router])

  useEffect(() => {
    const state = !grade?.loading && Object.entries(grade?.detail).length > 0
    onLoading(state)
  }, [grade])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Golongan'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Nama Riwayat golongan</Typography>
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

RiwayatGolonganDetailComponent.propTypes = {
  grade: PropTypes.object,
  getGrade: PropTypes.func,
  clearGradeState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatGolonganDetailComponent
