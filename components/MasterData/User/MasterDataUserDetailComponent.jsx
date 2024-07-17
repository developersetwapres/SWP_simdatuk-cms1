/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
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
  wrapperItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fontItem: { fontWeight: 600 }
}

const MasterDataUserDetailComponent = ({
  user,
  getUser = () => {},
  updateUserStatus = () => {},
  clearUserState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const [idUser, setIdUser] = useState(null)
  const [modalStatus, setModalStatus] = useState(false)

  const data = useMemo(() => {
    const detail = user?.detail

    if (detail) return detail

    return {}
  }, [user])

  const handleModal = () => {
    setModalStatus((modalStatus) => !modalStatus)
  }

  const handleUpdateStatus = () => {
    const payload = {
      id: parseInt(idUser),
      status: data?.status == 0 ? true : false
    }

    updateUserStatus(payload)
  }

  const action = useMemo(() => {
    const status = data?.status
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Button
          text={`${!status ? 'Aktifkan' : 'Nonaktifkan'} Pengguna`}
          color={!status ? 'success' : 'danger'}
          onClick={handleModal}
        />
        <Button
          text='Edit'
          color='sidatukDraweBase'
          icon={<Edit style={styles.iconButton} />}
          onClick={() =>
            router.push(`/master-data/user/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [data])

  const handleClearState = () => {
    clearUserState()
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id

    if (id) {
      const parseId = atob(id)

      getUser(parseId)
      setIdUser(parseId)
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', handleClearState)

    return () => {
      router.events.off('routeChangeComplete', handleClearState)
    }
  }, [router])

  useEffect(() => {
    const state = !user?.loading && Object.entries(user?.detail).length > 0
    onLoading(state)

    if (modalStatus && !user?.loading) handleModal()
  }, [user])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Data Pengguna'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Username</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.username || '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Email</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.email || '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Nama / NIP</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name && data?.employee_id_number
                    ? `${data?.name} / ${data?.employee_id_number}`
                    : '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Role Pengguna</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.role?.name || '-'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </LayoutPages>
      <ModalConfirmDelete
        title={`${data?.status == 0 ? 'Aktifkan' : 'Nonaktifkan'} Pengguna`}
        copytext={`Apakah anda yakin akan ${
          data?.status == 0 ? 'mengaktifkan' : 'menonaktifkan'
        } pengguna ?`}
        open={modalStatus}
        isLoading={user?.loading}
        handleModal={handleModal}
        handleDelete={handleUpdateStatus}
      />
    </>
  )
}

MasterDataUserDetailComponent.propTypes = {
  user: PropTypes.object,
  getUser: PropTypes.func,
  updateUserStatus: PropTypes.func,
  clearUserState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataUserDetailComponent
