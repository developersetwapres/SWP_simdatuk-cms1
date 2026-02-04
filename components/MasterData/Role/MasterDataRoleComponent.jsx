/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Typography } from '@mui/material'
import Search from '@/components/core/Search'
import { makeStyles } from '@mui/styles'
import { Delete, Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { useSelector } from 'react-redux'
import {
  Access,
  accessGranted,
  PermissionsIDs
} from '@/utils/permissionManager'
import { createShortUuidUrl } from '@/utils'

const useStyles = makeStyles(() => ({
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '0 0 1rem 0',
    borderRadius: '4px',
    width: '30%',
    alignSelf: 'flex-end',
    padding: '0 10px'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '15px 15px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  }
}))

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: '100px',
    fontSize: '16px',
    textTransform: 'none'
  }
}

const MasterDataRoleComponent = ({
  role,
  queries,
  onFetch = () => {},
  onFetchOptions = () => {},
  onSearch = () => {},
  onLoading = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {},
  deleteRole = () => {}
}) => {
  const classes = useStyles()
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

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

    if (!newVal) {
      setDeleteId(null)
      setDeleteValue(null)
    }
  }

  const options = useMemo(() => {
    let newOptions = []
    const datas = role?.options

    if (datas) {
      if (deleteId) {
        const newData = datas
          .filter((itm) => itm?.id !== deleteId)
          .map((itm) => itm?.name)
        newOptions = newData
      } else {
        const newData = datas.map((itm) => itm?.name)
        newOptions = newData
      }
    }

    return newOptions
  }, [role, deleteId])

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'Role Pengguna',
        width: 600,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 360,
        align: 'left'
      }
    ]
    return col
  }, [role])

  const rows = useMemo(() => {
    const dataMapping = role?.data.map((item) => {
      return [
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {accessGranted(PermissionsIDs.MASTER_ROLE, Access.READ) && (
                <Button
                  text='Detail'
                  color='primary'
                  onClick={() => {
                    if (item?.id) {
                      router.push(createShortUuidUrl(`/${router.pathname}/detail`, item.id))
                    }
                  }}
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.MASTER_ROLE, Access.UPDATE) && (
                <Button
                  text='Edit'
                  color='sidatukDraweBase'
                  onClick={() => {
                    if (item?.id) {
                      router.push(createShortUuidUrl(`/${router.pathname}/edit`, item.id))
                    }
                  }}
                  icon={<Edit style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.MASTER_ROLE, Access.DELETE) && (
                <Button
                  text='Hapus'
                  color='danger'
                  onClick={() => {
                    setDeleteId(item?.id)
                    handleModal()
                  }}
                  icon={<Delete style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [role])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.MASTER_ROLE, Access.CREATE) && (
          <Button
            text='Tambah'
            onClick={() => router.push(`${router.pathname}/add`)}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !role?.loading
    onLoading(state)
  }, [role])

  useEffect(() => {
    if (modal?.code !== null && modal?.code !== 401) handleModal()
    if (!modal?.modal && role?.data.length > 0) {
      onFetch({ ...queries, page: 1 })
      onFetchOptions()
    }
  }, [modal])

  return (
    <>
      <LayoutPages summary='Master Data Role Pengguna' action={action}>
        <Box
          sx={{
            width: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Search
            inputParentClasses={classes.inputParent}
            inputClass={classes.input}
            iconStyle={classes.iconStyle}
            placeholder='Cari Username'
            onSearch={onSearch}
          />
        </Box>
        <Table
          columns={columns}
          rows={rows}
          pagination={role?.pagination}
          handlePagination={onPaginationChange}
          handleRows={onRowsPerPageChange}
        />
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

MasterDataRoleComponent.propTypes = {
  role: PropTypes.object,
  queries: PropTypes.object,
  onFetch: PropTypes.func,
  onFetchOptions: PropTypes.func,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  deleteRole: PropTypes.func
}

export default MasterDataRoleComponent
