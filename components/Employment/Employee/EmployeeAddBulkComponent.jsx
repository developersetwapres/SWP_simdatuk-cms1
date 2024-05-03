import React, { useMemo, useState } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { useRouter } from 'next/router'
import { Button, Table } from '@/components/shared'
import {
  Box,
  Typography,
  Button as MuiButton,
  List,
  ListItem
} from '@mui/material'
import Paper from '@/components/shared/overrides/Paper'
import { styled } from '@mui/styles'
import { FiberManualRecord } from '@mui/icons-material'

const data = [
  {
    id: 123,
    nama: 'John',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Chris',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Evan',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Martin',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  },
  {
    id: 123,
    nama: 'Emily',
    tanggal: '19-12-2023 13:31:19',
    aktifitas: 'Tambah Massal Data Pegawai'
  }
]

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const style = {
  font: {
    fontSize: '14px',
    fontWeight: 400
  },
  textFile: {
    width: '220px',
    fontSize: '14px',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  dot: {
    marginRight: '6px',
    fontSize: '8px'
  },
  listItem: {
    padding: '2px 12px'
  },
  listTextTitle: {
    margin: 'unset',
    fontSize: '14px',
    fontWeight: 600
  },
  listText: {
    margin: 'unset',
    fontSize: '14px',
    display: 'flex'
  },
  listTextBold: {
    margin: '0 4px',
    fontSize: '14px',
    fontWeight: 600
  }
}

const EmployeeAddBulkComponent = () => {
  const router = useRouter()

  const [selectedFile, setSelectedFile] = useState(null)

  const columns = useMemo(
    () => [
      {
        Header: 'Tanggal',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Nama Pengguna',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Detail Aktivitas',
        width: 200,
        align: 'left'
      }
    ],
    []
  )

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const rows = useMemo(() => {
    const dataMapping = data.map((item) => {
      return [
        {
          Header: 'Tanggal',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tanggal}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Aktifitas',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.aktifitas}</Typography>
        }
      ]
    })

    return dataMapping
  }, [data])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary={'Tambah Massal Data Pegawai'}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 1
            }}
          >
            <Button
              text='Download File Template'
              color='sidatukDraweBase'
              onClick={() => {}}
              sx={{ textTransform: 'none' }}
            />
            <MuiButton
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              onChange={handleFileChange}
              sx={{ textTransform: 'none' }}
            >
              Pilih File
              <VisuallyHiddenInput type='file' />
            </MuiButton>
            <Typography sx={style?.textFile}>
              {selectedFile?.name || 'Tidak Ada File yang Dipilih'}
            </Typography>
          </Box>
          <Box>
            <Typography sx={style?.font}>Format File : .csv, .xlsx</Typography>
            <Typography sx={style?.font}>Maksimum Size : 2 MB</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              text='Update File'
              color='success'
              onClick={() => {}}
              sx={{ textTransform: 'none' }}
            />
            <Button
              text='Reset File'
              color='danger'
              onClick={() => setSelectedFile(null)}
              sx={{ textTransform: 'none' }}
            />
          </Box>
          <Box>
            <Typography sx={style?.listTextTitle}>
              Cara Tambah Data Pegawai Secara Massal
            </Typography>
            <List>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Klik tombol
                  <Typography component='span' sx={style?.listTextBold}>
                    Download File Template
                  </Typography>
                </Typography>
              </ListItem>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Isi data sesuai dengan
                  <Typography component='span' sx={style?.listTextBold}>
                    Format File Template
                  </Typography>
                  yang sudah di download
                </Typography>
              </ListItem>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Isi data sesuai dengan
                  <Typography component='span' sx={style?.listTextBold}>
                    Format File Template
                  </Typography>
                  yang sudah di download
                </Typography>
              </ListItem>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Klik tombol Pilih File, kemudian pilih File Template yang
                  sudah di isi
                </Typography>
              </ListItem>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Jika sudah sesuai, anda bisa klik tombol
                  <Typography component='span' sx={style?.listTextBold}>
                    Update File
                  </Typography>
                </Typography>
              </ListItem>
              <ListItem sx={style?.listItem}>
                <FiberManualRecord style={style?.dot} />
                <Typography sx={style?.listText}>
                  Jika belum sesuai, anda bisa klik tombol
                  <Typography component='span' sx={style?.listTextBold}>
                    Reset File
                  </Typography>
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Paper>
        <Table title='Riwayat Aktivitas' columns={columns} rows={rows} />
      </Box>
    </LayoutPages>
  )
}

export default EmployeeAddBulkComponent
