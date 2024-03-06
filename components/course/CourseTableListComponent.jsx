/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, FormControlLabel, TableCell, TableRow } from '@mui/material'
import { IconButton, ModalConfirm, Button, Modal } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { TRASH_ICON, INFORMATION_ICON, PENCIL_ICON, SUCCESS_ICON } from '@/utils/iconConstant'
import { useRouter } from 'next/router'
import { blackButtonStyle, primaryButtonStyle } from '@/utils/theme'
import CheckBox from '../shared/form/Checkbox'
import TableCheckbox from '../shared/TableCheckbox'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      transition: 'background-color .2s linear',
      backgroundColor: '#e8e8e8'
    }
  }
})

function CourseTableListComponent({
  items,
  pagination,
  childSelected,
  loading,
  selected,
  resetPagination,
  onPaginationChange = () => { },
  deleteListCourse = () => { },
  setSelected = () => { },
  setChildSelected = () => { }
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
    deleteListCourse(id)
    setModalDelete(false)
    setTimeout(() => {
      if (selector?.code === 403) {
        setFinish(false)
      } else {
        setFinish(true)
      }
    }, 2500)
    setFinish(true)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }

  const headers = [
    // {
    //   text: 'No'
    // },
    {
      text: 'Nama Course'
    },
    {
      text: 'Nama Pelatih'
    },
    {
      text: 'Penyelenggara'
    },
    {
      text: 'Kategori'
    },
    {
      text: 'Topik'
    },
    {
      text: 'Level'
    },
    {
      text: 'Durasi'
    },
    {
      text: 'Biaya'
    },
    {
      text: 'Status'
    },
    {
      text: 'Aksi',
      style: {
        paddingLeft: '25px'
      }
    }
  ]

  const handleSelected = (e) => {
    if (e.target.checked === true) {
      setSelected(items)
    } else {
      setSelected([])
    }
  }

  const handleChildSelected = (i, e, item) => {
    if (e.target.value === true) {
      setChildSelected(prev => [...prev, item])
    } else {
      // s
      setSelected(selected?.filter((x) => x.id !== item.id))
      // setChildSelected([
      //   ...childSelected.slice(0, i),
      //   ...childSelected.slice(i + 1, childSelected.length)
      // ])
      setChildSelected(childSelected?.filter((y,) => y.id !== item.id))
    }
  }


  return (
    <Box
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
        marginTop: '52px'
      }}
    >
      <TableCheckbox
        headers={headers}
        pagination={pagination}
        handleSelected={handleSelected}
        onPaginationChange={onPaginationChange}
        loading={loading}
        page={resetPagination}
      >
        {
          items.length > 0 && (
            items.map((item, index) => {
              const getChecked = selected?.find((v2) => v2.id === item.id) ? { status: true } : { status: false }
              const childChecked = childSelected?.find((v3) => v3.id === item.id) ? { status: true } : { status: false }
              return (
                <TableRow
                  key={index}
                  className={classes.tableRow}
                >
                  <TableCell>
                    <FormControlLabel
                      sx={{
                        maxWidth: '10px',
                        marginLeft: '20px'
                      }}
                      control={
                        <CheckBox
                          name={`control${index}`}
                          color='warning'
                          onChange={(e) => { handleChildSelected(index, e, item) }}
                          value={getChecked.status || childChecked.status}
                        // size='sm'
                        />
                      }
                    />
                  </TableCell>
                  {/* <TableCell>
                  {index + 1}
                </TableCell> */}
                  <TableCell>
                    {item.name ?? '-'}
                  </TableCell>
                  <TableCell>
                    {item.coach ?? '-'}
                  </TableCell>
                  <TableCell>
                    {item.provider === null ? '-' : item.provider.name}
                  </TableCell>
                  <TableCell>
                    {item.category === null ? '-' : item.category.name}
                  </TableCell>
                  <TableCell>
                    {item.topic === null ? '-' : item.topic.name}
                  </TableCell>
                  <TableCell>
                    {item.level === null ? '-' : item.level.name}
                  </TableCell>
                  <TableCell>
                    {item.duration ?? '-'}
                  </TableCell>
                  <TableCell>
                    {item.price_name === null ? '-' : item.price_name.name}
                  </TableCell>
                  <TableCell>
                    {item.status === true ? 'Terpublikasi' : 'Tidak Terpublikasi'}
                  </TableCell>
                  <TableCell>
                    <div style={{
                      display: 'flex'
                    }}>
                      <IconButton
                        path={INFORMATION_ICON}
                        maxWidth={20}
                        sx={{
                          minWidth: '44px'
                        }}
                        onClick={() => router.push(`/manajemen-course/course/detail/${item.id}`)}
                      />
                      <IconButton
                        path={PENCIL_ICON}
                        maxWidth={20}
                        sx={{
                          minWidth: '44px'
                        }}
                        onClick={() => router.push(`/manajemen-course/course/edit/${item.id}`)}
                      />
                      <IconButton
                        path={TRASH_ICON}
                        maxWidth={20}
                        name='delete'
                        sx={{
                          minWidth: '44px'
                        }}
                        onClick={() => { handleDeleteConfirm(item.id) }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
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
      </TableCheckbox>
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
        }}>Apakah anda yakin akan menghapus Course ?</p>
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
              Course berhasil dihapus
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

CourseTableListComponent.propTypes = {
  selected: PropTypes.array,
  items: PropTypes.array,
  pagination: PropTypes.object,
  childSelected: PropTypes.array,
  loading: PropTypes.bool,
  resetPagination: PropTypes.any,
  deleteListCourse: PropTypes.func,
  onPaginationChange: PropTypes.func,
  setSelected: PropTypes.func,
  setChildSelected: PropTypes.func
}

export default CourseTableListComponent