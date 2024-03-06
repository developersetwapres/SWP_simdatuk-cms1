import React from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableRow } from '@mui/material'
import { Table, IconButton, Button } from '@/components/shared/index'
import { makeStyles } from '@mui/styles'
import { INFORMATION_ICON } from '@/utils/iconConstant'
import { formatRupiah } from '@/utils/number'
import { useRouter } from 'next/router'
import { dangerButtonStyle, successButtonStyle } from '@/utils/theme'

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
    flexDirection: 'column'
  }
})

function CouponSubmissionListComponent({
  items,
  pagination,
  loading,
  handleRejectModal = () => { },
  handleApproveModal = () => { },
  onPaginationChange = () => { }
}) {
  const classes = useStyles()
  const router = useRouter()

  const headers = [
    {
      text: 'Tanggal Pengajuan'
    },
    {
      text: 'NIP',
      width: '100%',
      maxWidth: '200px',
      minWidth: '100px'
    },
    {
      text: 'Nama'
    },
    {
      text: 'Jabatan'
    },
    {
      text: 'Level'
    },
    {
      text: 'Blacklist'
    },
    {
      text: 'Harga'
    },
    {
      text: 'Mengajukan Kupon'
    },
    {
      text: 'Menerima Kupon'
    },
    {
      text: 'Status'
    },
    {
      text: 'Aksi'
    }
  ]

  return (
    <Box
      sx={{
        width: 'auto',
        overflowX: 'scroll',
        marginTop: '52px'
      }}
    >
      <Table
        headers={headers}
        pagination={pagination}
        loading={loading}
        onPaginationChange={onPaginationChange}
      >
        {
          items.length > 0 && (
            items.map((value, index) => (
              <TableRow
                key={index}
                className={classes.tableRow}
              >
                <TableCell>
                  {value.created_at ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user.nip ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user.name ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user.position ?? '-'}
                </TableCell>
                <TableCell>
                  {value.user.level ?? '-'}
                </TableCell>
                <TableCell>
                  {
                    (value.user.blacklist === true
                      ? 'Ya'
                      : 'Tidak') ?? '-'

                  }
                </TableCell>
                <TableCell>
                  {formatRupiah(value.price)}
                </TableCell>
                <TableCell>
                  {value.total_submission ?? '-'}
                </TableCell>
                <TableCell>
                  {value.total_submission_approved ?? ''}
                </TableCell>
                <TableCell>
                  {value.status === 0 || value.status === null ? 'Pengajuan' : ''}
                  {value.status === 1 ? 'Disetujui' : ''}
                  {value.status === 2 ? 'Ditolak' : ''}
                </TableCell>
                <TableCell>
                  <div className={classes.actionParent}>
                    <IconButton
                      path={INFORMATION_ICON}
                      maxWidth={20}
                      onClick={() => router.push(`/manajemen-kupon/pengajuan-kupon/detail/${value.id}`)}
                    />
                    {
                      value.status === 0 || value.status === null && (
                        <>
                          <Button
                            text='Setujui'
                            color='success'
                            sx={{
                              textTransform: 'none',
                              marginBottom: '20px',
                              ...successButtonStyle
                            }}
                            onClick={() => { handleApproveModal(value.id) }}
                          />
                          <Button
                            text='Tolak'
                            color='danger'
                            sx={{
                              textTransform: 'none',
                              ...dangerButtonStyle
                            }}
                            onClick={() => { handleRejectModal(value.id) }}
                          />
                        </>
                      )
                    }
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
    </Box>
  )
}

CouponSubmissionListComponent.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  handleApproveModal: PropTypes.func,
  handleRejectModal: PropTypes.func,
  onPaginationChange: PropTypes.func
}

export default CouponSubmissionListComponent