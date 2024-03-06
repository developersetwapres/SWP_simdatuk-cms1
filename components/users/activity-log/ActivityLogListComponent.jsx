import React from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { dateTimeFormat } from '@/utils/'

const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      transition: 'background-color .2s linear',
      backgroundColor: '#e8e8e8'
    }
  }
})

function ActivityLogListComponent({
  items,
  pagination,
  loading,
  resetPagination,
  onPaginationChange = () => { }
}) {
  const classes = useStyles()

  const headers = [
    {
      text: 'Tanggal'
    },
    {
      text: 'Nama'
    },
    {
      text: 'Peran Pengguna'
    },
    {
      text: 'Aktivitas'
    },
    {
      text: 'IP Address'
    }
  ]
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
          items.length > 0 && (
            items.map((value, index) => (
              <TableRow
                key={index}
                className={classes.tableRow}
              >
                <TableCell>
                  {dateTimeFormat(value.created_at) ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user.name ?? '-'}
                </TableCell>
                <TableCell>
                  {
                    value.user?.roles.map(val => {
                      return val.name ?? '-'
                    })
                  }
                </TableCell>
                <TableCell>
                  {value.description ?? '-'}
                </TableCell>
                <TableCell>
                  {value.ip ?? '-'}
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

ActivityLogListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  resetPagination: PropTypes.any,
  onPaginationChange: PropTypes.func
}

export default ActivityLogListComponent