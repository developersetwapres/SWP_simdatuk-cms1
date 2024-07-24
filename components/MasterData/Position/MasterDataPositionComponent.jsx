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

const MasterDataPositionComponent = ({
  position,
  queries,
  onFetch = () => {},
  onSearch = () => {},
  onLoading = () => {},
  deletePosition = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const classes = useStyles()
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

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'Nama Jabatan',
        width: 560,
        align: 'left'
      },
      {
        Header: 'Tipe Jabatan',
        width: 560,
        align: 'left'
      },
      {
        Header: 'Hierarki Jabatan',
        width: 560,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 60,
        align: 'left'
      }
    ]
    return col
  }, [])

  const rows = useMemo(() => {
    const data = position?.data || []
    const dataMapping = data?.map((item) => {
      return [
        {
          Header: 'Nama Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Eselon',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.type?.name || '-'}</Typography>
        },
        {
          Header: 'Hierarki Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.hierarchies || '-'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
              {accessGranted(PermissionsIDs.MASTER_POSITION, Access.READ) && (
                <Button
                  text='Detail'
                  color='primary'
                  onClick={() =>
                    router.push(`${router.pathname}/detail/${btoa(item?.id)}`)
                  }
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.MASTER_POSITION, Access.Edit) && (
                <Button
                  text='Edit'
                  color='sidatukDraweBase'
                  onClick={() =>
                    router.push(`${router.pathname}/edit/${btoa(item?.id)}`)
                  }
                  icon={<Edit style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.MASTER_POSITION, Access.DELETE) && (
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
  }, [position])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.MASTER_POSITION, Access.CREATE) && (
          <Button
            text='Tambah'
            onClick={() => router.push(`${router.pathname}/add`)}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !position?.loading
    onLoading(state)
  }, [position])

  useEffect(() => {
    if (modal?.code !== null) handleModal()
    if (!modal?.modal && position?.data.length > 0) {
      onFetch({ ...queries, search })
    }
  }, [modal])

  return (
    <>
      <LayoutPages summary='Master Data Jabatan' action={action}>
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
            placeholder='Cari Nama Jabatan'
            onSearch={onSearch}
          />
        </Box>
        <Table
          columns={columns}
          rows={rows}
          pagination={position?.pagination}
          handlePagination={onPaginationChange}
          handleRows={onRowsPerPageChange}
        />
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

MasterDataPositionComponent.propTypes = {
  position: PropTypes.object,
  queries: PropTypes.object,
  onFetch: PropTypes.func,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  deletePosition: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default MasterDataPositionComponent
