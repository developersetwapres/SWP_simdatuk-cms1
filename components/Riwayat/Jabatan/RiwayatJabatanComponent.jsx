/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Typography } from '@mui/material'
import Search from '@/components/core/Search'
import { makeStyles } from '@mui/styles'
import { Edit, Info, Delete } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { monthOptions } from 'libs/types/options'
import { Access, accessGranted, PermissionsIDs } from '@/utils/permissionManager'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { createShortUuidUrl } from '@/utils'
import { useSelector } from 'react-redux'

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

const RiwayatJabatanComponent = ({
  queries,
  positionHistories,
  deletePositionHistories = () => { },
  onFetch = () => { },
  onSearch = () => { },
  onLoading = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { }
}) => {
  const classes = useStyles()
  const router = useRouter()
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState(null)
  const modal = useSelector((state) => state.modalReducer)

  const columns = useMemo(
    () => [
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Riwayat Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Periode Input Riwayat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jumlah Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 80,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = positionHistories?.data || []

    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.created_at || '-'}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.period_month && item?.period_year
                ? `${monthOptions[item?.period_month - 1]} ${item?.period_year}`
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Total',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.total}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.READ) && (
                <Button
                  text='Detail'
                  color='primary'
                  onClick={() => {
                    if (item?.id) {
                      router.push(createShortUuidUrl(`${router.pathname}/detail`, item.id))
                    }
                  }}
                  icon={<Info style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.UPDATE) && (
                <Button
                  text='Edit'
                  color='sidatukDraweBase'
                  onClick={() => {
                    if (item?.id) {
                      router.push(createShortUuidUrl(`${router.pathname}/edit`, item.id))
                    }
                  }}
                  icon={<Edit style={styles.iconButton} />}
                  sx={styles.buttonAction}
                />
              )}
              {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.DELETE) && (
                <Button
                  text='Hapus'
                  color='danger'
                  icon={<Delete style={styles.iconButton} />}
                  sx={styles.buttonAction}
                  onClick={() => showDeleteModal(item?.id)}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [positionHistories])

  const showDeleteModal = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const doDeleteItem = () => {
    if (!id) return

    // Do Delete
    setModalDelete(false)
    deletePositionHistories(id)
  }

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.HISTORY_POSITION, Access.CREATE) && (
          <Button
            text='Tambah'
            onClick={() => router.push(`${router.pathname}/add`)}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !positionHistories?.loading
    onLoading(state)
  }, [positionHistories])

  useEffect(() => {
    if (!modal?.modal && positionHistories?.data?.length > 0) {
      onFetch({ ...queries, page: 1 })
    }
  }, [modal])

  return (
    <>
      <LayoutPages summary='Data Riwayat Jabatan' action={action}>
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
            placeholder='Cari Nama Riwayat Jabatan'
            onSearch={onSearch}
          />
        </Box>
        <Table
          columns={columns}
          rows={rows}
          pagination={positionHistories?.pagination}
          handlePagination={onPaginationChange}
          handleRows={onRowsPerPageChange}
        />
      </LayoutPages>
      <ModalConfirmDelete
        label='Riwayat Jabatan'
        title='Hapus Jabatan'
        copytext='Apakah anda yakin akan menghapus jabatan?'
        open={modalDelete}
        handleModal={() => setModalDelete(false)}
        handleDelete={doDeleteItem}
      />
    </>
  )
}

RiwayatJabatanComponent.propTypes = {
  positionHistories: PropTypes.object,
  queries: PropTypes.object,
  onSearch: PropTypes.func,
  onFetch: PropTypes.func,
  deletePositionHistories: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default RiwayatJabatanComponent
