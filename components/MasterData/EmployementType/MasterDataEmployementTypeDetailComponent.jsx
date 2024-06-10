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

const MasterDataEmployementTypeDetailComponent = ({
  employmentType,
  getEmploymentType = () => {},
  deleteEmploymentType = () => {},
  clearEmploymentTypeState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

  const [type, setType] = useState(['ASN', 'NON ASN', 'OUTSOURCE'])
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = () => {
    deleteEmploymentType(deleteId)
  }

  const handleModal = () => {
    const newVal = !modalDelete

    setModalDelete(newVal)
  }

  const data = useMemo(() => {
    const detail = employmentType?.detail || []

    return detail
  }, [employmentType])

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
            router.push(
              `/master-data/employment-type/edit/${router?.query?.id}`
            )
          }
        />
      </Box>
    )
  }, [router])

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) {
      getEmploymentType(atob(id))
      setDeleteId(atob(id))
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearEmploymentTypeState)

    return () => {
      router.events.off('routeChangeComplete', clearEmploymentTypeState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !employmentType?.loading &&
      Object.entries(employmentType?.detail).length > 0

    onLoading(state)
  }, [employmentType])

  useEffect(() => {
    const detail = employmentType?.detail
  }, [employmentType?.detail])

  useEffect(() => {
    if (modal?.code !== null) handleModal()
  }, [modal])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Data Jenis Pegawai'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Role Pengguna</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Jenis Pegawai</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.type ? type[data?.type - 1] : '-'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Tampilkan</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.status !== undefined
                    ? parseInt(data?.status)
                      ? 'Ya'
                      : 'Tidak'
                    : '-'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </LayoutPages>
      <ModalConfirmDelete
        title='Hapus Data Jenis Pegawai'
        copytext='Apakah anda yakin akan menghapus data jenis pegawai ?'
        options={null}
        open={modalDelete}
        isLoading={employmentType?.loading}
        handleModal={handleModal}
        handleDelete={handleDelete}
      />
    </>
  )
}

MasterDataEmployementTypeDetailComponent.propTypes = {
  employmentType: PropTypes.object,
  getEmploymentType: PropTypes.func,
  deleteEmploymentType: PropTypes.func,
  clearEmploymentTypeState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataEmployementTypeDetailComponent
