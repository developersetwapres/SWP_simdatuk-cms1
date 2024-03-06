/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, Button, ModalConfirm, Modal } from '@/components/shared'
import { makeStyles } from '@mui/styles'
import { TRASH_ICON, PENCIL_ICON, SUCCESS_ICON } from '@/utils/iconConstant'
import { primaryButtonStyle, blackButtonStyle } from '@/utils/theme'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      transition: 'background-color .2s linear',
      backgroundColor: '#e8e8e8'
    }
  },
  actionParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})

function UserRoleListComponent({
  items,
  pagination,
  loading,
  loadingRole,
  resetPagination,
  onPaginationChange = () => { },
  deleteRoleList = () => { }
}) {
  const classes = useStyles()
  const selector = useSelector((state) => state.responserReducer)
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState('')
  const router = useRouter()
  const [finish, setFinish] = useState(false)

  const headers = [
    {
      text: 'Nama Peran',
      style: {
        width: '30%'
      }
    },
    {
      text: 'Jumlah',
      style: {
        width: '25%'
      }
    },
    {
      text: 'Akses Admin Panel',
      style: {
        width: '30%'
      }
    },
    {
      text: 'Aksi',
      style: {
        width: '10%',
        padding: '0 25px'

      }
    }
  ]

  const handleDeleteConfirm = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const handleDelete = () => {
    deleteRoleList(id)
    setModalDelete(false)
    setTimeout(() => {
      if (selector?.code === 403) {
        setFinish(false)
      } else {
        setFinish(true)
      }
    }, 2500)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }
  return (
    <Box
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
        marginTop: '52px'
      }}
    >
      <Table
        headers={headers}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        loading={loading}
        page={resetPagination}
      >
        {
          items.length > 0 && (
            items.map((value, index) => (
              <TableRow
                key={index}
                className={classes.tableRow}
              >
                <TableCell>
                  {value.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user_count ?? '-'}
                </TableCell>
                <TableCell>
                  {value.admin_access === true ? 'Ya' : 'Tidak'}
                </TableCell>
                <TableCell>
                  <div className={classes.actionParent}>
                    <IconButton
                      path={PENCIL_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push(`/manajemen-pengguna/peran-pengguna/update/${value.id}`)}
                    />
                    <IconButton
                      path={TRASH_ICON}
                      maxWidth={20}
                      name='delete'
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => { handleDeleteConfirm(value.id) }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )
        }
        {
          items.length === 0 && (
            <TableRow>
              <TableCell colSpan={headers.length}>
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                >
                  Tidak Ada
                </div>
              </TableCell>
            </TableRow>
          )
        }
      </Table>
      {/* Modal Confirm */}
      <ModalConfirm
        open={modalDelete}
      >
        <img
          src='/images/information-circle.png'
          alt='logo'
          style={{
            width: '100%',
            maxWidth: '160px',
            height: '160px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '22px',
          marginTop: '30px'
        }}>Apakah anda yakin akan menghapus Peran Pengguna ?</p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            // flexWrap: 'nowrap',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            justifyContent: 'space-evenly'
          }}
        >
          <Button
            text='Ya'
            color='warning'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              marginBottom: {
                xl: 0,
                lg: 0,
                md: '10px',
                sm: '10px',
                xs: '10px'
              },
              ...primaryButtonStyle
            }}
            onClick={() => { handleDelete() }}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              ...blackButtonStyle
            }}
            onClick={handleCancelModal}
            isBusy={loadingRole?.isSubmit}
            isLoading={loadingRole?.loading}
          />
        </Box>
      </ModalConfirm>
      {/* Modal success Delete */}
      {
        selector?.code !== 403 && (
          <Modal
            open={finish}
            padding='3rem 0'
            onClose={() => {
              setFinish(false)
              window.location.reload()
            }}
            width='600px'
          >
            <img
              src={SUCCESS_ICON}
              alt='success'
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '128px',
                display: 'block',
                margin: '0 auto'
              }}
            />
            <h2 style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              Peran Pengguna berhasil dihapus
            </h2>
            <div style={{
              marginRight: 'auto',
              marginLeft: 'auto',
              width: '100%',
              textAlign: 'center'
            }}>
              <Button
                text='Tutup'
                type='button'
                color='warning'
                sx={{
                  padding: '12px',
                  width: '540px',
                  textTransform: 'none',
                  ...primaryButtonStyle
                }}
                onClick={() => {
                  setFinish(false)
                  window.location.reload()
                }}
              />
            </div>
          </Modal>
        )
      }
      {/* End Modal Delete */}
    </Box>
  )
}

UserRoleListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  loadingRole: PropTypes.object,
  resetPagination: PropTypes.any,
  onPaginationChange: PropTypes.func,
  deleteRoleList: PropTypes.func
}

export default UserRoleListComponent