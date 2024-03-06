/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, Button, ModalConfirm, Modal } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { INFORMATION_ICON, TRASH_ICON, PENCIL_ICON, SUCCESS_ICON } from '@/utils/iconConstant'
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
  list: {
    display: '-webkit-box',
    maxWidth: '600px',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  actionParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})

const removeImage = `
  .banner img {
    display: none
  }
`

function BannerListComponent({
  items,
  pagination,
  loading,
  bannerLoading,
  resetPagination,
  deleteListBanner = () => { },
  onPaginationChange = () => { }
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
    deleteListBanner(id)
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
      text: 'Nama Banner',
      style: {
        width: '25%'
      }
    },
    {
      text: 'Tipe',
      style: {
        width: '25%'
      }
    },
    {
      text: 'Detail',
      style: {
        width: '35%'
      }
    },
    {
      text: 'Status',
      style: {
        width: '10%'
      }
    },
    {
      text: 'Aksi',
      style: {
        paddingLeft: '25px'
      }
    }
  ]
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
            items.map((item, index) => (
              <TableRow
                key={index}
                className={classes.tableRow}
              >
                <TableCell>
                  {item.name ?? '-'}
                </TableCell>
                <TableCell>
                  {
                    item.type === 0 && (
                      'Pembelajaran'
                    )
                  }
                  {
                    item.type === 1 && (
                      'Pengumuman'
                    )
                  }
                  {
                    item.type === 2 && (
                      'Link'
                    )
                  }
                </TableCell>
                <TableCell>
                  <span
                    className={classes.list}
                  >
                    {
                      item.type === 0 && (
                        item.course === null ? '-' : item.course.name
                      )
                    }
                    {
                      item.type === 1 && (
                        <>
                          <style>{removeImage}</style>
                          <div className='banner' dangerouslySetInnerHTML={{ __html: item.content }} />
                        </>
                      )
                    }
                    {
                      item.type === 2 && (
                        item.external_url ?? '-'
                      )
                    }
                  </span>
                </TableCell>
                <TableCell>
                  {
                    item.status === false && (
                      'Tidak Terpublikasi' ?? '-'
                    )
                  }
                  {
                    item.status === true && (
                      'Terpublikasi' ?? '-'
                    )
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
                      onClick={() => router.push(`/banner/detail/${item.id}`)}
                    />
                    <IconButton
                      path={PENCIL_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => router.push(`/banner/update/${item.id}`)}
                    />
                    <IconButton
                      path={TRASH_ICON}
                      maxWidth={20}
                      sx={{
                        minWidth: '44px'
                      }}
                      onClick={() => { handleDeleteConfirm(item.id) }}
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
        }}>Apakah anda yakin akan menghapus Banner ?</p>
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
            isBusy={bannerLoading?.isSubmit}
            isLoading={bannerLoading?.loading}
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
            }}>Banner berhasil dihapus</h2>
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

      {/* Modal Success Delete END */}
    </Box>
  )
}

BannerListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  bannerLoading: PropTypes.object,
  resetPagination: PropTypes.any,
  deleteListBanner: PropTypes.func,
  onPaginationChange: PropTypes.func
}

export default BannerListComponent