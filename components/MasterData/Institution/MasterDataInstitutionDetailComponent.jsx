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
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'
import { extractIdFromShortUuidUrl, createShortUuidUrl } from '@/utils'

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

const MasterDataInstitutionDetailComponent = ({
  institution,
  getInstitution = () => {},
  deleteInstitution = () => {},
  clearInstitutionState = () => {},
  onLoading = () => {}
}) => {
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

  const [modalDelete, setModalDelete] = useState(false)
  const [deleteValue, setDeleteValue] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSetValue = (val) => {
    const data = institution?.options.filter((itm) => itm?.name == val)[0]
    setDeleteValue(data)
  }

  const handleDelete = () => {
    const payload = {
      id: deleteId,
      data: { institution_id: deleteValue?.id }
    }

    deleteInstitution(payload)
  }

  const handleModal = () => {
    const newVal = !modalDelete

    setModalDelete(newVal)

    if (!newVal) setDeleteValue(null)
  }

  const options = useMemo(() => {
    let newOptions = []
    const datas = institution?.options

    if (datas) {
      const newData = datas
        .filter((itm) => itm?.id !== parseInt(deleteId))
        .map((itm) => itm?.name)
      newOptions = newData
    }

    return newOptions
  }, [institution, deleteId, router])

  const data = useMemo(() => {
    const detail = institution?.detail

    return detail
  }, [institution])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: '12px' }}>
        {accessGranted(PermissionsIDs.MASTER_INSTITUTION, Access.DELETE) && (
          <Button
            text='Hapus'
            color='danger'
            icon={<Delete style={styles.iconButton} />}
            onClick={handleModal}
          />
        )}
        {accessGranted(PermissionsIDs.MASTER_INSTITUTION, Access.UPDATE) && (
          <Button
            text='Edit'
            color='sidatukDraweBase'
            icon={<Edit style={styles.iconButton} />}
            onClick={() => {
              const numericId = extractIdFromShortUuidUrl(router?.query)
              if (numericId) {
                router.push(createShortUuidUrl(`/master-data/institution/edit`, numericId))
              }
            }}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    // Get Detail User
    const id = extractIdFromShortUuidUrl(router?.query)
    if (id) {
      getInstitution(id)
      setDeleteId(id)
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearInstitutionState)

    return () => {
      router.events.off('routeChangeComplete', clearInstitutionState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !institution?.loading && Object.entries(institution?.detail).length > 0

    onLoading(state)
  }, [institution])

  useEffect(() => {
    if (modal?.code !== null && modal?.code !== 401) handleModal()
  }, [modal])

  return (
    <>
      <LayoutPages
        handleBack={() => router.back()}
        summary='Detail Data Instansi'
        action={action}
      >
        <Paper style={{ padding: '24px 20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={styles?.wrapperItem}>
                <Typography>Nama Instansi</Typography>
                <Typography sx={styles?.fontItem}>
                  {data?.name || '-'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </LayoutPages>
      <ModalConfirmDelete
        label='Instansi'
        title='Hapus Data Instansi'
        copytext='Apakah anda yakin akan menghapus data instansi ? Jika ya, silahkan pilih instansi lain sebagai pengganti'
        options={options}
        open={modalDelete}
        value={deleteValue?.name || null}
        isLoading={institution?.loading}
        handleModal={handleModal}
        handleDelete={handleDelete}
        handleSetValue={handleSetValue}
      />
    </>
  )
}

MasterDataInstitutionDetailComponent.propTypes = {
  institution: PropTypes.object,
  getInstitution: PropTypes.func,
  deleteInstitution: PropTypes.func,
  clearInstitutionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default MasterDataInstitutionDetailComponent
