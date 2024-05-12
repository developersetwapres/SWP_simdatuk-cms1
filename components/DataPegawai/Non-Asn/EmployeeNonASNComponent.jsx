/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react'
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

const data = [
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  },
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  },
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  },
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  },
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  },
  {
    id: 123,
    image: '/simdatuk/imagePegawai.png',
    nama: 'John',
    nip: '12345',
    perbantuan: 'Jenis Perbantuan I',
    jabatan: 'Jabatan I'
  }
]

const EmployeeNonASNComponent = () => {
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
        Header: 'Jenis Perbantuan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jabatan',
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
                src={item?.image}
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
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'NIP',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nip}</Typography>
        },
        {
          Header: 'Perbantuan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.perbantuan}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jabatan}</Typography>
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
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          text='Tambah Massal'
          color='sidatukDraweBase'
          onClick={() => router.push(`${router.asPath}/add-bulk`)}
        />
        <Button
          text='Tambah'
          color='primary'
          onClick={() => handleAction('add')}
        />
      </Box>
    )
  }, [])

  const handleAction = (value) => {
    console.log('action', value)
  }

  return (
    <LayoutPages summary={'Data Pegawai Non ASN'} action={action}>
      <EmployeeFilterComponent />
      <Table columns={columns} rows={rows} />
    </LayoutPages>
  )
}

export default EmployeeNonASNComponent
