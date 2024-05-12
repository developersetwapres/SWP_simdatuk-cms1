/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import { Button, Table } from '@/components/shared'
import { Edit, Info } from '@mui/icons-material'
import Search from '@/components/core/Search'

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

const data = [
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  },
  {
    id: 123,
    createdAt: '01-12-2023 09:12:12',
    name: 'Perubahan jabatan desember 2023',
    periode: 'Desember 2023',
    total: 10
  }
]

const RiwayatGolonganComponent = () => {
  const classes = useStyles()

  const columns = useMemo(
    () => [
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Riwayat Golongan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Periode Riwayat',
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
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.createdAt}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Periode',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.periode}</Typography>
        },
        {
          Header: 'Total',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.total}</Typography>
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
                onClick={() => handleAction('add')}
                icon={<Info style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
              <Button
                text='Edit'
                color='sidatukDraweBase'
                onClick={() => handleAction('bulk')}
                icon={<Edit style={styles.iconButton} />}
                sx={styles.buttonAction}
              />
            </Box>
          )
        }
      ]
    })

    return dataMapping
  }, [data])

  const action = useMemo(() => {
    return (
      <Box>
        <Button text='Tambah' />
      </Box>
    )
  }, [])

  return (
    <LayoutPages summary='Data Riwayat Golongan' action={action}>
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
          placeholder='Cari Nama Riwayat Golongan'
        />
      </Box>
      <Table columns={columns} rows={rows} />
    </LayoutPages>
  )
}

export default RiwayatGolonganComponent
