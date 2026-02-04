import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Delete, Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import { monthOptions } from 'libs/types/options'
import { Access, accessGranted, PermissionsIDs } from '@/utils/permissionManager'
import { extractIdFromShortUuidUrl, createShortUuidUrl } from '@/utils'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'

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
  deleteGrade = () => { },
  clearGradeState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState(null)
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
        Header: 'Pangkat / Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Golongan',
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
    const dataMapping = data?.map((item, index) => {
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
          Header: 'Pangkat / Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{`${item?.grade_name || '-'} / ${item?.grade_code || '-'}`}</Typography>
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
                      createShortUuidUrl(`/data-riwayat/golongan/detail/pegawai`, item?.user_id)
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
  }, [grade?.detail?.users, router])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        {accessGranted(PermissionsIDs.HISTORY_GRADE, Access.DELETE) && (
          <Button
            text='Hapus'
            color='danger'
            icon={<Delete style={styles.iconButton} />}
            onClick={() => {
              const numericId = extractIdFromShortUuidUrl(router?.query)
              if (numericId) showDeleteModal(numericId)
            }}
          />
        )}
        {accessGranted(PermissionsIDs.HISTORY_GRADE, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() => {
              const numericId = extractIdFromShortUuidUrl(router?.query)
              if (numericId) {
                router.push(createShortUuidUrl(`/data-riwayat/golongan/edit`, numericId))
              }
            }}
          />
        )}
      </Box>
    )
  }, [router])

  const handleParsePeriod = (month, year) => {
    return month && year ? `${monthOptions[month - 1]} ${year}` : '-'
  }

  const showDeleteModal = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const doDeleteItem = () => {
    if (!id) return

    // Do Delete
    setModalDelete(false)
    const deleteId = extractIdFromShortUuidUrl(router?.query)
    deleteGrade(deleteId)
  }

  useEffect(() => {
    // Get Detail User
    const id = extractIdFromShortUuidUrl(router?.query)
    if (id) getGrade(id)

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearGradeState)

    return () => {
      router.events.off('routeChangeComplete', clearGradeState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    const state = !grade?.loading && Object.entries(grade?.detail).length > 0
    onLoading(state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade])

  return (
    <>
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
      <ModalConfirmDelete
        label='Riwayat Golongan'
        title='Hapus Golongan'
        copytext='Apakah anda yakin akan menghapus golongan?'
        open={modalDelete}
        handleModal={() => setModalDelete(false)}
        handleDelete={doDeleteItem}
      />
    </>
  )
}

RiwayatGolonganDetailComponent.propTypes = {
  grade: PropTypes.object,
  getGrade: PropTypes.func,
  deleteGrade: PropTypes.func,
  clearGradeState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatGolonganDetailComponent
