/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { INFORMATION_ICON } from '@/utils/iconConstant'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      transition: 'background-color .2s linear',
      backgroundColor: '#e8e8e8'
    }
  }
})

function UserBlacklistListComponent({
  items,
  pagination,
  loading,
  resetPagination,
  onPaginationChange = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()

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
      text: 'Unit Kerja/Satuan Organisasi'
    },
    {
      text: 'Pangkat/Golongan'
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

  return (
    <Box
      sx={{
        width: 'auto',
        // overflowX: 'scroll',
        marginTop: '22px'
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
                  {value.level.name ?? '-'}
                </TableCell>
                <TableCell>
                  {/* {value.roles.map((value, i) => (
                    <span key={i}>{value.name === null ? '-' : value.name}</span>
                  ))} */}
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
                <TableCell>
                  <IconButton
                    path={INFORMATION_ICON}
                    maxWidth={20}
                    sx={{
                      minWidth: '44px'
                    }}
                    onClick={() => router.push(`/manajemen-pengguna/blacklist/detail/${value.id}`)}
                  />
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
    </Box>
  )
}

UserBlacklistListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  resetPagination: PropTypes.any,
  onPaginationChange: PropTypes.func
}

export default UserBlacklistListComponent