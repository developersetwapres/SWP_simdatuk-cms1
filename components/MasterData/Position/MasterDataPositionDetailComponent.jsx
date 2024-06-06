/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { useSelector } from 'react-redux'

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

const MasterDataPositionDetailComponent = ({
  role,
  getRole = () => {},
  deleteRole = () => {},
  clearRoleState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

  const [values, setValues] = useState([])
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteValue, setDeleteValue] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSetValue = (val) => {
    const data = role?.options.filter((itm) => itm?.name == val)[0]
    setDeleteValue(data)
  }

  const handleDelete = () => {
    const payload = {
      id: deleteId,
      data: { role_id: deleteValue?.id }
    }

    deleteRole(payload)
  }

  const handleModal = () => {
    const newVal = !modalDelete

    setModalDelete(newVal)

    if (!newVal) setDeleteValue(null)
  }

  const options = useMemo(() => {
    let newOptions = []
    const datas = role?.options

    if (datas) {
      const newData = datas
        .filter((itm) => itm?.id !== parseInt(deleteId))
        .map((itm) => itm?.name)
      newOptions = newData
    }

    return newOptions
  }, [role, deleteId, router])

  const data = useMemo(() => {
    const detail = role?.detail
    const access = role?.dataPermissions

    if (detail?.permissions && access) {
      const detailId = detail?.permissions.map((itm) => {
        return itm?.id
      })
      const newAccess = access.filter((itm) => {
        return detailId.includes(itm?.id)
      })

      return {
        ...detail,
        permissions: newAccess
      }
    }

    return []
  }, [role])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Button
          text='Hapus'
          color='danger'
          icon={<Delete style={styles.iconButton} />}
          onClick={handleModal}
        />
        <Button
          text='Edit'
          color='sidatukDraweBase'
          icon={<Edit style={styles.iconButton} />}
          onClick={() =>
            router.push(`/master-data/position/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  const handleGetValueAccess = (id) => {
    const filter = values?.filter((itm) => {
      return itm?.id == id
    })

    return filter.length > 0 ? filter[0] : {}
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) {
      getRole(atob(id))
      setDeleteId(atob(id))
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearRoleState)

    return () => {
      router.events.off('routeChangeComplete', clearRoleState)
    }
  }, [router])

  useEffect(() => {
    const dataPermissions = role?.dataPermissions
    const state =
      !role?.loading &&
      dataPermissions.length > 0 &&
      Object.entries(role?.detail).length > 0

    onLoading(state)
  }, [role])

  useEffect(() => {
    const detail = role?.detail

    if (detail?.permissions) {
      const newPermissions = detail?.permissions.map((itm) => {
        return { id: itm?.id, permitted_actions: itm?.permitted_actions }
      })
      setValues(newPermissions)
    }
  }, [role?.detail])

  useEffect(() => {
    if (modal?.code !== null) handleModal()
  }, [modal])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Data Jabatan'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Nama Jabatan</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Jumlah yang diperlukan</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Eselon</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Deputi</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Biro</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Bagian</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Subagian</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </LayoutPages>
      <ModalConfirmDelete
        label='Role Pengguna'
        title='Hapus Data Role Pengguna'
        copytext='Apakah anda yakin akan menghapus data role pengguna ? Jika ya, silahkan pilih role pengguna lain sebagai pengganti'
        options={options}
        open={modalDelete}
        value={deleteValue?.name || null}
        isLoading={role?.loading}
        handleModal={handleModal}
        handleDelete={handleDelete}
        handleSetValue={handleSetValue}
      />
    </>
  )
}

MasterDataPositionDetailComponent.propTypes = {
  role: PropTypes.object,
  getRole: PropTypes.func,
  deleteRole: PropTypes.func,
  clearRoleState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataPositionDetailComponent
