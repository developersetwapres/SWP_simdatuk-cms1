/* eslint-disable no-unused-vars */
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

const MasterDataEmployementTypeComponent = ({
  employmentType,
  queries,
  onFetch = () => { },
  onSearch = () => { },
  onLoading = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { },
  deleteEmploymentType = () => { }
}) => {
  const classes = useStyles()
  const router = useRouter()
  const modal = useSelector((state) => state.modalReducer)

  const [type, setType] = useState(['ASN', 'NON ASN + PERBANTUAN', 'OUTSOURCING'])
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = () => {
    deleteEmploymentType(deleteId)
  }

  const handleModal = () => {
    const newVal = !modalDelete
    setModalDelete(newVal)

    if (!newVal) {
      setDeleteId(null)
    }
  }

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'Pegawai',
        width: 600,
        align: 'left'
      },
      {
        Header: 'Jenis Pegawai',
        width: 600,
        align: 'left'
      },
      {
        Header: 'Tampilkan',
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
  }, [])

  const rows = useMemo(() => {
    const data = employmentType?.data || []
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Pegawai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>{item?.type ? type[item?.type - 1] : '-'}</Typography>
          )
        },
        {
          Header: 'Jenis Pegawai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Tampilkan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.status !== null
                ? parseInt(item?.status)
                  ? 'Ya'
                  : 'Tidak'
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {accessGranted(PermissionsIDs.MASTER_EMPLOYEE_TYPE, Access.READ) && (
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
              {accessGranted(PermissionsIDs.MASTER_EMPLOYEE_TYPE, Access.UPDATE) && (
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
              {accessGranted(PermissionsIDs.MASTER_EMPLOYEE_TYPE, Access.DELETE) && (
                <Button
                  text='Hapus'
                  color='danger'
                  icon={<Delete style={styles.iconButton} />}
                  sx={styles.buttonAction}
                  onClick={() => {
                    setDeleteId(item?.id)
                    handleModal()
                  }}
                />
              )}
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [employmentType])

  const action = useMemo(() => {
    return (
      <Box>
        {accessGranted(PermissionsIDs.MASTER_EMPLOYEE_TYPE, Access.CREATE) && (
          <Button
            text='Tambah'
            onClick={() => router.push(`${router.pathname}/add`)}
          />
        )}
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !employmentType?.loading
    onLoading(state)
  }, [employmentType])

  useEffect(() => {
    if (modal?.code !== null && modal?.code !== 401) handleModal()
    if (!modal?.modal && employmentType?.data.length > 0) {
      onFetch({ ...queries, page: 1 })
    }
  }, [modal])

  return (
    <>
      <LayoutPages summary='Master Data Jenis Pegawai' action={action}>
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
            placeholder='Cari Jenis Pegawai'
            onSearch={onSearch}
          />
        </Box>
        <Table
          columns={columns}
          rows={rows}
          pagination={employmentType?.pagination}
          handlePagination={onPaginationChange}
          handleRows={onRowsPerPageChange}
        />
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

MasterDataEmployementTypeComponent.propTypes = {
  employmentType: PropTypes.object,
  queries: PropTypes.object,
  onFetch: PropTypes.func,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  deleteEmploymentType: PropTypes.func
}

export default MasterDataEmployementTypeComponent
