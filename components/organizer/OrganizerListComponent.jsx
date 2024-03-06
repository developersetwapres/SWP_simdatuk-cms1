/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, ModalConfirm, Button, Modal } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { TRASH_ICON, PENCIL_ICON, SUCCESS_ICON } from '@/utils/iconConstant'
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
    display: 'inline-flex'
  }
})

function OrganizerListComponent({
  items,
  pagination,
  loading,
  loadingProvider,
  resetPagination,
  deleteListProvider = () => { },
  onPaginationChange = () => { }
}) {
  const classes = useStyles()
  const selector = useSelector((state) => state.responserReducer)
  const [deleteModal, setDeleteModal] = useState(false)
  const [id, setId] = useState('')
  const router = useRouter()
  const [finish, setFinish] = useState(false)

  const headers = [
    {
      text: 'Nama Penyelenggara',
      style: {
        'width': '45%'
      }
    },
    {
      text: 'Jumlah Course',
      style: {
        'width': '40%'
      }
    },
    {
      text: 'Aksi',
      style: {
        'width': '5%',
        'padding': '0 25px'
      }
    }
  ]

  const handleDeleteConfirm = (id) => {
    setDeleteModal(true)
    setId(id)
  }

  const handleDelete = () => {
    deleteListProvider(id)
    setDeleteModal(false)
    setTimeout(() => {
      if (selector?.code === 403) {
        setFinish(false)
      } else {
        setFinish(true)
      }
    }, 2500)
  }

  const handleCancelModal = () => {
    setDeleteModal(false)
  }
  return (
    <Box
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
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
          items?.length > 0 && (
            items.map((value, index) => (
              <TableRow
                key={index}
                className={classes.tableRow}
              >
                <TableCell>
                  {value.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.course_count ?? '-'}
                </TableCell>
                <TableCell>
                  <div className={classes.actionParent}>
                    <IconButton
                      path={TRASH_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => { handleDeleteConfirm(value.id) }}
                    />
                    <IconButton
                      path={PENCIL_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push(`/manajemen-pengguna/penyelenggara/update/${value?.id}`)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )
        }
        {
          items?.length === 0 && (
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
        open={deleteModal}
      // width='650px'
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
        }}>Apakah anda yakin akan menghapus penyelenggara ?</p>
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
            isBusy={loadingProvider?.isSubmit}
            isLoading={loadingProvider?.loading}
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
      {/* Modal Success Delete */}
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
              Penyelenggara berhasil dihapus
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
      {/* End Modal Success Delete */}
    </Box>
  )
}

OrganizerListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  loadingProvider: PropTypes.object,
  resetPagination: PropTypes.any,
  deleteListProvider: PropTypes.func,
  onPaginationChange: PropTypes.func
}

export default OrganizerListComponent