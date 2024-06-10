/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Table } from '@/components/shared'
import { Box, Typography } from '@mui/material'
import Search from '@/components/core/Search'
import { makeStyles } from '@mui/styles'

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

const MasterDataGroupComponent = ({
  grade,
  onSearch = () => {},
  onLoading = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const classes = useStyles()

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'Jenis Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Pangkat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Golongan/Ruang',
        width: 200,
        align: 'left'
      }
    ]
    return col
  }, [])

  const rows = useMemo(() => {
    const data = grade?.options || []
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.type}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.code}</Typography>
        }
      ]
    })

    return dataMapping
  }, [grade])

  useEffect(() => {
    const state = !grade?.loading
    onLoading(state)
  }, [grade])

  return (
    <LayoutPages summary='Master Data Golongan'>
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
          placeholder='Cari Pangkat'
          onSearch={onSearch}
        />
      </Box>
      <Table
        columns={columns}
        rows={rows}
        pagination={grade?.paginationOptions}
        handlePagination={onPaginationChange}
        handleRows={onRowsPerPageChange}
      />
    </LayoutPages>
  )
}

MasterDataGroupComponent.propTypes = {
  grade: PropTypes.object,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default MasterDataGroupComponent
