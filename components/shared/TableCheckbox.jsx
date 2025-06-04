import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Pagination,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Checkbox from '@mui/material/Checkbox'

const useStyles = makeStyles({
  pagination: {
    // marginTop: '1rem',
    '& .MuiPagination-ul': {
      alignItems: 'center',
      justifyContent: 'end',
      '& > li': {
        marginLeft: '-4px'
      }
    },
    '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
      border: '1px solid #BABABA',
      color: '#FE9516',
      background: 'none'
    },
    '& .MuiButtonBase-root.MuiPaginationItem-root': {
      border: '1px solid #BABABA',
      color: '#000',
      borderRadius: '0',
      '&:hover': {
        background: '#FE9516'
      }
    },
    '& .MuiPaginationItem-ellipsis': {
      border: '1px solid #BABABA',
      color: '#000',
      borderRadius: '0',
      height: '32px'
    }
  },
  tableCellWrapper: {
    width: '100%'
  }
})

function TableCheckbox({
  headers,
  pagination,
  children,
  loading,
  page,
  handleSelected = () => { },
  onPaginationChange = () => { }
}) {
  const classes = useStyles()
  const handlePaginationChange = (e, val) => {
    onPaginationChange(val)
  }

  return (
    <Fragment>
      <Box
        sx={{
          width: 'auto',
          overflowX: 'scroll',
          marginTop: '52px'
        }}
      >
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <div style={{
                  backgroundColor: '#fff',
                  height: '18px',
                  width: '18px',
                  position: 'relative',
                  borderRadius: '10px',
                  left: '15px'
                }}>
                  <Checkbox
                    onClick={handleSelected}
                    color='warning'
                    sx={{
                      position: 'absolute',
                      top: '-12px',
                      left: '-12px'
                      // left: '10px'
                    }}
                  />
                </div>
              </TableCell>
              {
                headers.map((item, index) => (
                  <TableCell
                    key={index}
                    className={classes.tableCell}
                    {...(item?.style && { sx: item.style })}
                  >
                    {item.text}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading
                ? (
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
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : children
            }
          </TableBody>
        </MuiTable>
      </Box>
      <Box
        sx={{
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '100px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            }
          }}>
          <div>
            <p>Showing {pagination?.current_page} to {pagination?.limit} of {pagination?.total} entries</p>
          </div>
          <Pagination
            count={pagination?.total_page}
            className={classes.pagination}
            onChange={handlePaginationChange}
            page={page}
          />
        </Box>
      </Box>
    </Fragment>
  )
}

TableCheckbox.propTypes = {
  headers: PropTypes.array,
  pagination: PropTypes.object,
  children: PropTypes.node,
  loading: PropTypes.bool,
  page: PropTypes.any,
  onPaginationChange: PropTypes.func,
  handleSelected: PropTypes.func
}

export default TableCheckbox