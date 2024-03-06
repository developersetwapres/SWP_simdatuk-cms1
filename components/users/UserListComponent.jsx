/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, Button, ModalConfirm, Modal } from '@/components/shared'
import { TRASH_ICON, PENCIL_ICON, INFORMATION_ICON } from '@/utils/iconConstant'
import { useRouter } from 'next/router'
import { blackButtonStyle, primaryButtonStyle } from '@/utils/theme'
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
    justifyContent: 'space-evenly',
    flexDirection: {
      xl: 'row',
      lg: 'row',
      md: 'column',
      sm: 'column',
      xs: 'column'
    }
  }
})

function UserListComponent({
  user,
  items,
  pagination,
  loading,
  resetPagination,
  deleteUser = () => { },
  onPaginationChange = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()
  const selector = useSelector((state) => state.responserReducer)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalFinish, setModalFinish] = useState(false)
  const [id, setId] = useState('')

  const handleDeleteConfirm = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const handleDelete = () => {
    deleteUser(id)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }

  const headers = [
    {
      text: 'NIP'
    },
    {
      text: 'Nama'
    },
    {
      text: 'Jabatan'
    },
    {
      text: 'Unit Kerja/Satuan Organisasi',
      style: {
        maxWidth: '140px'
      }
    },
    {
      text: 'Level'
    },
    {
      text: 'Jam Pelajaran',
      style: {
        maxWidth: '90px'
      }
    },
    {
      text: 'Peran Pengguna'
    },
    {
      text: 'Aksi',
      style: {
        paddingLeft: '30px'
      }
    }
  ]

  useEffect(() => {
    setModalFinish(false)
    setModalDelete(false)
    if (selector?.code !== 403) {
      setTimeout(() => {
        if (user.loadingDeleteList === false) {
          setModalFinish(true)
        } else if (user.loadingDeleteList === true) {
          setModalFinish(false)
        }
      }, 2500)
    }

  }, [user, selector])

  useEffect(() => {
    setModalFinish(false)
  }, [])

  return (
    <Box
      sx={{
        width: 'auto',
        marginTop: '44px'
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
                  {value.nip ?? '-'}
                </TableCell>
                <TableCell>
                  {value.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.position.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.unit.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user_level ?? '-'}
                </TableCell>
                <TableCell>
                  {value.lesson_hour ?? '-'}
                </TableCell>
                <TableCell>
                  {
                    value.roles.length > 0 && (
                      value.roles.map((item, index) => (
                        <span key={index}>{item.name ? item.name : '-'}</span>
                      ))
                    )
                  }
                  {
                    value.roles.length === 0 && (
                      <span>-</span>
                    )
                  }
                </TableCell>
                <TableCell sx={{
                  maxWidth: '150px'
                }}>
                  <div className={classes.actionParent}>
                    <IconButton
                      path={INFORMATION_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push({ pathname: `/manajemen-pengguna/pengguna/detail/${value.id}`, query: { id: value.id } }, `/manajemen-pengguna/pengguna/detail/${value.id}`)}
                    />
                    <IconButton
                      path={PENCIL_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push({ pathname: `/manajemen-pengguna/pengguna/update/${value.id}`, query: { id: value.id } }, `/manajemen-pengguna/pengguna/update/${value.id}`)}
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
        }}>Apakah anda yakin akan menghapus Pengguna ?</p>
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
            onClick={() => { handleDelete() }}
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
          />
        </Box>
      </ModalConfirm>
      {/* Modal Finish */}
      {
        selector?.code !== 403 && (
          <Modal
            open={modalFinish}
            padding='3rem 0'
            onClose={() => {
              setModalFinish(false)
              window.location.reload()
            }}
            width='600px'
          >
            <img
              src={user?.icon}
              alt='finish'
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
            }}>{user?.message || ''}</h2>
            <p style={{ textAlign: 'center' }}>{user?.error || ''}</p>
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
                  setModalFinish(false)
                  window.location.reload()
                }}
              />
            </div>
          </Modal>
        )
      }
      {/* Modal End Finish */}
    </Box>
  )
}

UserListComponent.propTypes = {
  user: PropTypes.object,
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  deleteUser: PropTypes.func,
  resetPagination: PropTypes.any,
  onPaginationChange: PropTypes.func
}

export default UserListComponent