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
function Table({
  headers,
  simpleTable,
  pagination,
  children,
  loading,
  isCheckbox,
  page,
  onPaginationChange = () => { },
  handleSelected = () => { }
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
          overflowX: 'scroll'
        }}
      >
        <MuiTable>
          {
            isCheckbox ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCellWrapper}>
                    <div style={{
                      backgroundColor: '#fff',
                      height: '18px',
                      width: '18px',
                      position: 'relative',
                      borderRadius: '6px'
                    }}>
                      <Checkbox
                        onClick={handleSelected}
                        color='warning'
                        sx={{
                          position: 'absolute',
                          top: '-12px',
                          left: '-12px'
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
            ) : (
              <TableHead>
                <TableRow className={classes.tableCellWrapper}>
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
            )
          }
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
      {
        !simpleTable && (
          <Box
            sx={{
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <Box sx={{
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
                <p>Showing {pagination?.from || 1} to {pagination?.to} of {pagination?.total} entries</p>
              </div>
              <Pagination
                count={pagination?.total_page || 1}
                className={classes.pagination}
                onChange={handlePaginationChange}
                page={page}
              />
            </Box>
          </Box>
        )
      }
    </Fragment>
  )
}

Table.propTypes = {
  headers: PropTypes.array,
  simpleTable: PropTypes.bool,
  pagination: PropTypes.object,
  children: PropTypes.node,
  loading: PropTypes.bool,
  isCheckbox: PropTypes.bool,
  page: PropTypes.any,
  onPaginationChange: PropTypes.func,
  handleSelected: PropTypes.func
}

export default Table