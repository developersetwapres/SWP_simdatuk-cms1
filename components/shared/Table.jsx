import React from 'react'
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

// const styles = {
//   paper: {
//     padding: '20px',
//     borderRadius: '12px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
//   }
// }

function Table({ columns, rows, title, isPagination = true }) {
  return (
    <Paper>
      <Box sx={{ marginBottom: '12px', display: title ? 'flex' : 'none' }}>
        <Typography
          component='H4'
          color='primary'
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
              rows.map((row) => (
                <TableRow key={row.name}>
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
                      height: '400px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
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
          count={100}
          rowsPerPage={10}
          page={0}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: '12px' }}
        />
      )}
    </Paper>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  title: PropTypes.string,
  isPagination: PropTypes.bool
}

export default Table
