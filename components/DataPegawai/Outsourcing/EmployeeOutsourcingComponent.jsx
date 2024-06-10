/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '../../core/LayoutPages'
import { Box } from '@mui/system'
import { Button, Table } from '@/components/shared'
import { Edit, Info } from '@mui/icons-material'
import { Typography } from '@mui/material'
import EmployeeFilterComponent from '../EmployeeFilterComponent'
import { useRouter } from 'next/router'

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

const EmployeeOutsourcingComponent = ({
  employee,
  onLoading = () => { },
  onSearch = () => { },
  onPaginationChange = () => { },
  onRowsPerPageChange = () => { }
}) => {
  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        Header: 'Foto',
        width: 80,
        align: 'left'
      },
      {
        Header: 'Nama',
        width: 200,
        align: 'left'
      },
      {
        Header: 'NIP / NRP',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenis Outsourcing',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan',
        width: 240,
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
    const data = employee?.data
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Foto',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box
              sx={{
                width: '90px',
                height: '120px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={item?.photo_profile}
                alt='Image'
                style={{ width: 'fit-content', height: '100%' }}
              />
            </Box>
          )
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name || '-'}</Typography>
        },
        {
          Header: 'NIP',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => {
            const nip = item?.employee_id_number
            const nrp = item?.employee_registration_number
            return <Typography>{`${nip}${nrp ? ` / ${nrp}` : ''}`}</Typography>
          }
        },
        {
          Header: 'Outsourcing',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.employment_type || '-'}</Typography>
        },
        {
          Header: 'Keterangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{'-'}</Typography>
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
                onClick={() => router.push(`${router.pathname}/detail/${btoa(item?.id)}`)}
                icon={<Info style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
              <Button
                text='Edit'
                color='sidatukDraweBase'
                onClick={() => router.push(`${router.pathname}/edit/${btoa(item?.id)}`)}
                icon={<Edit style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [employee])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          text='Tambah Massal'
          color='sidatukDraweBase'
          onClick={() => router.push(`${router.asPath}/add-bulk`)}
        />
        <Button
          text='Tambah'
          color='primary'
          onClick={() => router.push(`${router.asPath}/add`)}
        />
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !employee?.loading
    onLoading(state)
  }, [employee])

  return (
    <LayoutPages summary={'Data Pegawai Outsourcing'} action={action}>
      <EmployeeFilterComponent onSearch={onSearch} options={{ echelon: [] }} />
      <Table
        columns={columns}
        rows={rows}
        pagination={employee?.pagination}
        handlePagination={onPaginationChange}
        handleRows={onRowsPerPageChange}
      />
    </LayoutPages>
  )
}

EmployeeOutsourcingComponent.propTypes = {
  employee: PropTypes.object,
  echelon: PropTypes.object,
  onLoading: PropTypes.func,
  onSearch: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
}

export default EmployeeOutsourcingComponent
