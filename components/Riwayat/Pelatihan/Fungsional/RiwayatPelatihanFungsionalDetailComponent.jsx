/* eslint-disable react-hooks/exhaustive-deps */
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
  },
  font: {
    fontWeight: 600
  },
  wrapperItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
}

const RiwayatPelatihanFungsionalDetailComponent = ({
  training,
  getTraining = () => { },
  deleteTraining = () => { },
  clearTrainingState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState(null)

  const data = useMemo(() => {
    const detail = training?.detail

    if (detail) return detail

    return {}
  }, [training])

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 10,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai / NIP',
        width: 340,
        align: 'left'
      },
      {
        Header: 'Sertifikat',
        width: 340,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 40,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = training?.detail?.users || []
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
            <Typography>
              {`${item?.name || ''} / ${item?.employee_id_number || ''}`}
            </Typography>
          )
        },
        {
          Header: 'Sertifikat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {item?.certificate ? (
                <Button
                  text='Lihat File'
                  color='primary'
                  onClick={() => {
                    const url = item?.certificate
                    if (url) window.open(url, '_blank')
                  }}
                  sx={styles.buttonAction}
                />
              ) : (
                '-'
              )}
            </Box>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_FUNCTIONAL, Access.READ) && (
                <Button
                  text='Detail Profil'
                  color='primary'
                  onClick={() =>
                    router.push(
                      `/data-riwayat/pelatihan-fungsional/detail/pegawai/${btoa(
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
  }, [training])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        {accessGranted(PermissionsIDs.HISTORY_FUNCTIONAL, Access.DELETE) && (
          <Button
            text='Hapus'
            color='danger'
            icon={<Delete style={styles.iconButton} />}
            onClick={() => showDeleteModal(router?.query?.id)}
          />
        )}
        {accessGranted(PermissionsIDs.HISTORY_FUNCTIONAL, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(
                `/data-riwayat/pelatihan-fungsional/edit/${router?.query?.id}`
              )
            }
          />
        )}
      </Box>
    )
  }, [])

  const handleClearState = () => {
    clearTrainingState()
  }

  const showDeleteModal = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const doDeleteItem = () => {
    if (!id) return

    // Do Delete
    setModalDelete(false)
    deleteTraining(atob(id))
  }

  useEffect(() => {
    // Get Detail Training
    const id = router?.query?.id
    if (id) getTraining(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !training?.loading && Object.entries(training?.detail).length > 0
    onLoading(state)
  }, [training])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Riwayat Pelatihan Fungsional'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
            {/* Nama Diklat */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Nama Diklat</Typography>
                <Typography sx={styles?.font}>{data?.name || '-'}</Typography>
              </Box>
            </Grid>
            {/* Periode */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Periode Input Riwayat</Typography>
                <Typography sx={styles?.font}>
                  {data?.period_month && data?.period_year
                    ? `${monthOptions[data?.period_month - 1]} ${data?.period_year
                    }`
                    : '-'}
                </Typography>
              </Box>
            </Grid>
            {/* No Surat Perintah */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>No Surat Perintah</Typography>
                <Typography sx={styles?.font}>
                  {data?.reference_number || '-'}
                </Typography>
              </Box>
            </Grid>
            {/* Jenjang */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Jenjang</Typography>
                <Typography sx={styles?.font}>{data?.level || '-'}</Typography>
              </Box>
            </Grid>
            {/* Tanggal Pelaksanaan */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Tanggal Pelaksanaan</Typography>
                <Typography sx={styles?.font}>
                  {data?.start_date || '-'}
                </Typography>
              </Box>
            </Grid>
            {/* Penyelenggara */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Penyelenggara</Typography>
                <Typography sx={styles?.font}>
                  {data?.organizer || '-'}
                </Typography>
              </Box>
            </Grid>
            {/* Durasi */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Durasi Pelatihan (Hari)</Typography>
                <Typography sx={styles?.font}>{data?.duration || 0}</Typography>
              </Box>
            </Grid>
            {/* Materi */}
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Link Materi Pelatihan</Typography>
                {data?.link ? (
                  <Button
                    text='Lihat Materi'
                    style={{ width: '140px' }}
                    onClick={() => {
                      const url = data?.link
                      if (url) window.open(url, '_blank')
                    }}
                  />
                ) : (
                  '-'
                )}
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
        label='Riwayat Pelatihan Fungsional'
        title='Hapus Riwayat Pelatihan Fungsional'
        copytext='Apakah anda yakin akan menghapus riwayat pelatihan fungsional?'
        open={modalDelete}
        handleModal={() => setModalDelete(false)}
        handleDelete={doDeleteItem}
      />
    </>
  )
}

RiwayatPelatihanFungsionalDetailComponent.propTypes = {
  training: PropTypes.object,
  getTraining: PropTypes.func,
  deleteTraining: PropTypes.func,
  clearTrainingState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPelatihanFungsionalDetailComponent
