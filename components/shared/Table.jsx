/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Box
} from '@mui/material'
import Paper from './overrides/Paper'

function Table({
  columns,
  rows,
  title,
  isPagination = true,
  colorTitle = 'primary',
  paper = true,
  pagination,
  handlePagination = () => {},
  handleRows = () => {}
}) {
  const handleChangePage = (e, page) => {
    handlePagination(page + 1)
  }

  const handleChangeRowsPerPage = (e) => {
    const row = e?.target?.value
    handleRows(row)
  }

  const TableComponent = useMemo(() => {
    return (
      <Fragment>
        <Box sx={{ marginBottom: '12px', display: title ? 'flex' : 'none' }}>
          <Typography
            component='h4'
            color={colorTitle}
            sx={{
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {title || ''}
          </Typography>
        </Box>
        <TableContainer>
          <MuiTable sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                {columns.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: `${item?.width}px`,
                      minWidth: item?.minWidth ? `${item.minWidth}px` : 'auto',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    {item?.Header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((itm, idx) => (
                      <TableCell
                        component='th'
                        scope='row'
                        key={idx}
                        sx={{
                          fontSize: '14px',
                          fontWeight: 400,
                          verticalAlign: `${itm?.verticalAlign || 'top'}`
                        }}
                      >
                        <itm.Cell />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <Box
                        sx={{
                          width: '480px',
                          height: 'fit-content',
                          marginBottom: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src='/images/table-empty.svg'
                          alt='Table Empty'
                          style={{ width: '100%', height: 'fit-content' }}
                        />
                      </Box>
                      <Typography
                        component='h3'
                        sx={{ fontSize: '24px', fontWeight: 800 }}
                      >
                        Tidak ada hasil yang ditampilkan
                      </Typography>
                      <Typography sx={{ fontSize: '16px' }}>
                        Kami tidak menemukan data yang anda cari
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        {isPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={pagination?.total || 0}
            rowsPerPage={pagination?.per_page || 10}
            page={pagination?.current_page - 1 || 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginTop: '12px' }}
          />
        )}
      </Fragment>
    )
  }, [columns, rows, title, isPagination, colorTitle, pagination])

  return (
    <>{paper ? <Paper>{TableComponent}</Paper> : <Box>{TableComponent}</Box>}</>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  title: PropTypes.string,
  colorTitle: PropTypes.string,
  isPagination: PropTypes.bool,
  paper: PropTypes.bool,
  pagination: PropTypes.object,
  handlePagination: PropTypes.func,
  handleRows: PropTypes.func
}

export default Table
