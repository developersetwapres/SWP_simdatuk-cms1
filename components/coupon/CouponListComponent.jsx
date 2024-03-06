/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, ModalConfirm, Button, Modal } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { TRASH_ICON, PENCIL_ICON, INFORMATION_ICON, SUCCESS_ICON } from '@/utils/iconConstant'
import { formatRupiah } from '@/utils/number'
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
    justifyContent: 'space-evenly'
  }
})

function CouponListComponent({
  items,
  pagination,
  loading,
  resetPagination,
  onPaginationChange = () => { },
  deleteCouponList = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()
  const selector = useSelector((state) => state.responserReducer)
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState('')
  const [finish, setFinish] = useState(false)

  const handleDeleteConfirm = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const handleDelete = () => {
    deleteCouponList(id)
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

  const headers = [
    {
      text: 'Periode Kupon',
      style: {
        width: '20%'
      }
    },
    {
      text: 'Nama Kupon',
      style: {
        width: '20%'
      }
    },
    {
      text: 'Kode Unik',
      style: {
        width: '15%'
      }
    },
    {
      text: 'Penyelenggara',
      style: {
        width: '10%'
      }
    },
    {
      text: 'Nilai Kupon',
      style: {
        width: '10%'
      }
    },
    {
      text: 'Tipe',
      style: {
        width: '15%'
      }
    },
    {
      text: 'Status',
      style: {
        width: '25%'
      }
    },
    {
      text: 'Aksi',
      style: {
        width: '5%',
        padding: '0 25px'
      }
    }
  ]
  return (
    <Box
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
        marginTop: '52px'
      }}>
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
                  <span
                    style={{ display: 'block' }}
                  >
                    {value.start_date ?? '-'}
                  </span>
                  -
                  <span
                    style={{ display: 'block' }}
                  >
                    {value.end_date ?? '-'}
                  </span>
                </TableCell>
                <TableCell>
                  {value.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.code ?? '-'}
                </TableCell>
                <TableCell>
                  {value.provider === null ? '-' : value.provider.name}
                </TableCell>
                <TableCell>
                  {formatRupiah(value.amount)}
                </TableCell>
                <TableCell>
                  {
                    value.type === 0
                      ? 'Umum'
                      : value.type === 1
                        ? 'Khusus'
                        : ''
                  }
                </TableCell>
                <TableCell>
                  {
                    value.status === 0
                      ? 'Tersedia'
                      : value.status === 1
                        ? 'Sudah dipakai'
                        : value.status === 2
                          ? 'Tidak Aktif'
                          : ''
                  }
                </TableCell>
                <TableCell>
                  <div className={classes.actionParent}>
                    <IconButton
                      path={INFORMATION_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push(`/manajemen-kupon/kupon/detail/${value.id}`)}
                    />
                    <IconButton
                      path={PENCIL_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push(`/manajemen-kupon/kupon/update/${value.id}`)}
                    />
                    <IconButton
                      path={TRASH_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      name='delete'
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
        }}>Apakah anda yakin akan menghapus Kupon ?</p>
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
              Kupon berhasil dihapus
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

CouponListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  resetPagination: PropTypes.any,
  onPaginationChange: PropTypes.func,
  deleteCouponList: PropTypes.func
}

export default CouponListComponent