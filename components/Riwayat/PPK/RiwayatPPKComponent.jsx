/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Typography } from '@mui/material'
import Search from '@/components/core/Search'
import { makeStyles } from '@mui/styles'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { monthsOptions } from 'libs/months'

const useStyles = makeStyles(() => ({
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '0 0 1rem 0',
    borderRadius: '4px',
    width: '30%',
    alignSelf: 'flex-end',
    padding: '0 10px'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '15px 15px',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  }
}))

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: '100px',
    fontSize: '16px',
    textTransform: 'none'
  }
}

const RiwayatPPKComponent = ({
  performance,
  onSearch = () => {},
  onLoading = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const router = useRouter()
  const classes = useStyles()

  const columns = useMemo(
    () => [
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Riwayat PPK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Periode Riwayat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Periode PPK',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jumlah Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 80,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const data = performance?.data || []
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.created_at || '-'}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Typography>
              {item?.period_month && item?.period_year
                ? `${monthsOptions[item?.period_month - 1]} ${
                    item?.period_year
                  }`
                : '-'}
            </Typography>
          )
        },
        {
          Header: 'Periode PPK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.performance_period || '-'}</Typography>
        },
        {
          Header: 'Total',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.total || '0'}</Typography>
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                text='Detail'
                color='primary'
                onClick={() =>
                  router.push(`${router.pathname}/detail/${btoa(item?.id)}`)
                }
                icon={<Info style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
              <Button
                text='Edit'
                color='sidatukDraweBase'
                onClick={() =>
                  router.push(`${router.pathname}/edit/${btoa(item?.id)}`)
                }
                icon={<Edit style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [performance])

  const action = useMemo(() => {
    return (
      <Box>
        <Button
          text='Tambah'
          onClick={() => router.push(`${router.pathname}/add`)}
        />
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !performance?.loading
    onLoading(state)
  }, [performance])

  return (
    <LayoutPages
      summary='Data Riwayat Penilaian Prestasi Kerja'
      action={action}
    >
      <Box
        sx={{
          width: '100%',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Search
          inputParentClasses={classes.inputParent}
          inputClass={classes.input}
          iconStyle={classes.iconStyle}
          placeholder='Cari Nama Riwayat PPK'
          onSearch={onSearch}
        />
      </Box>
      <Table
        columns={columns}
        rows={rows}
        pagination={performance?.pagination}
        handlePagination={onPaginationChange}
        handleRows={onRowsPerPageChange}
      />
    </LayoutPages>
  )
}

RiwayatPPKComponent.propTypes = {
  performance: PropTypes.object,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default RiwayatPPKComponent
