/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { useSelector } from 'react-redux'
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
  wrapperItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fontItem: { fontWeight: 600 }
}

const dataEchelon = [
  { name: 'Ahli Madya', qty: 3, availabel: 3 },
  { name: 'Ahli Muda', qty: 5, availabel: 5 },
  { name: 'Ahli Pertama', qty: 2, availabel: 0 }
]

const MasterDataPositionDetailComponent = ({
  position,
  deletePosition = () => {},
  getPosition = () => {},
  clearPositionState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

  const [modalDelete, setModalDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = () => {
    deletePosition(deleteId)
  }

  const handleModal = () => {
    const newVal = !modalDelete
    setModalDelete(newVal)

    if (!newVal) setDeleteId(null)
  }

  const data = useMemo(() => {
    const detail = position?.detail
    return detail
  }, [position])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        {accessGranted(PermissionsIDs.MASTER_POSITION, Access.DELETE) && (
          <Button
            text='Hapus'
            color='danger'
            icon={<Delete style={styles.iconButton} />}
            onClick={handleModal}
          />
        )}
        {accessGranted(PermissionsIDs.MASTER_POSITION, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() =>
              router.push(`/master-data/position/edit/${router?.query?.id}`)
            }
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) {
      getPosition(atob(id))
      setDeleteId(atob(id))
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearPositionState)

    return () => {
      router.events.off('routeChangeComplete', clearPositionState)
    }
  }, [router])

  useEffect(() => {
    const state = !position?.loading
    onLoading(state)
  }, [position])

  useEffect(() => {
    if (modal?.code !== null && modal?.code !== 401) handleModal()
  }, [modal])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Data Jabatan'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          {/* Position */}
          <Box>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                Jabatan
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {/* Entity */}
              <Grid item xs={6}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Tipe Entitas</Typography>
                  <Typography sx={styles?.fontItem}>
                    {data?.entity?.name || '-'}
                  </Typography>
                </Box>
              </Grid>
              {/* Name */}
              <Grid item xs={6}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Nama Jabatan</Typography>
                  <Typography sx={styles?.fontItem}>
                    {data?.name || '-'}
                  </Typography>
                </Box>
              </Grid>
              {/* Type */}
              <Grid item xs={6}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Tipe Jabatan</Typography>
                  <Typography sx={styles?.fontItem}>
                    {data?.type?.name || '-'}
                  </Typography>
                </Box>
              </Grid>
              {/* Show On Peta Jabatan */}
              <Grid item xs={6}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Tampilkan pada Halaman Peta Jabatan</Typography>
                  <Typography sx={styles?.fontItem}>
                    {data?.status === 1 ? 'Ya' : 'Tidak'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* Echelon */}
          <Box sx={{ margin: '30px 0' }}>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                Eselon
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {data?.echelons ? (
                data?.echelons.map((itm, idx) => (
                  <Fragment key={idx}>
                    {/* Echelon */}
                    <Grid item xs={4}>
                      <Box sx={styles?.wrapperItem}>
                        <Typography>Eselon</Typography>
                        <Typography sx={styles?.fontItem}>
                          {itm?.name || '-'}
                        </Typography>
                      </Box>
                    </Grid>
                    {/* Position */}
                    <Grid item xs={4}>
                      <Box sx={styles?.wrapperItem}>
                        <Typography>Jumlah yang diperlukan</Typography>
                        <Typography sx={styles?.fontItem}>
                          {itm?.available || 0}
                        </Typography>
                      </Box>
                    </Grid>
                    {/* Position */}
                    <Grid item xs={4}>
                      <Box sx={styles?.wrapperItem}>
                        <Typography>Jumlah yang terisi</Typography>
                        <Typography sx={styles?.fontItem}>
                          {itm?.filled || 0}
                        </Typography>
                      </Box>
                    </Grid>
                  </Fragment>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography>-</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {/* Hierarchy */}
          <Box>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                Hierarki Jabatan
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {/* Parent */}
              <Grid item xs={12}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Parent</Typography>
                  {data?.hierarchies ? (
                    data?.hierarchies.map((itm, idx) => (
                      <Typography sx={styles?.fontItem} key={idx}>
                        {itm?.name || '-'}
                      </Typography>
                    ))
                  ) : (
                    <Typography>-</Typography>
                  )}
                </Box>
              </Grid>
              {/* Order */}
              <Grid item xs={6}>
                <Box sx={styles?.wrapperItem}>
                  <Typography>Urutan</Typography>
                  <Typography sx={styles?.fontItem}>
                    {data?.order || '-'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </LayoutPages>
      <ModalConfirmDelete
        title='Hapus Data Jabatan'
        copytext='Apakah anda yakin akan menghapus data jabatan ?'
        open={modalDelete}
        isLoading={position?.loading}
        handleModal={handleModal}
        handleDelete={handleDelete}
      />
    </>
  )
}

MasterDataPositionDetailComponent.propTypes = {
  position: PropTypes.object,
  getPosition: PropTypes.func,
  deletePosition: PropTypes.func,
  clearPositionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataPositionDetailComponent
