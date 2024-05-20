/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'

const styles = {
  iconStyle: {
    fontSize: '20px'
  },
  iconButton: {
    margin: '0 8px 0 -4px',
    fontSize: '20px'
  },
  buttonAction: {
    width: 'fit-content',
    fontSize: '16px',
    textTransform: 'none'
  },
  font: {
    fontWeight: 600
  },
  wrapperItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
}

const data = [
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Penata Tingkat I (III/d)',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  }
]

const RiwayatPelatihanStrukturalDetailComponent = () => {
  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 10,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai / NIP',
        width: 340,
        align: 'left'
      },
      {
        Header: 'Sertifikat',
        width: 340,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 40,
        align: 'left'
      }
    ],
    []
  )

  const rows = useMemo(() => {
    const dataMapping = data.map((item, index) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{index + 1}</Typography>
        },
        {
          Header: 'Nama',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nama}</Typography>
        },
        {
          Header: 'Sertifikat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                text='Lihat File'
                color='primary'
                onClick={() => {
                  const url =
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hMF2m2-4-0O_viJ73WJWS5Ldo-bK1rkf4MlOULk64Q&s'
                  window.open(url, '_blank')
                }}
                sx={styles.buttonAction}
              />
            </Box>
          )
        },
        {
          Header: 'Aksi',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                text='Detail Profil'
                color='primary'
                onClick={() =>
                  router.push(
                    `/data-riwayat/pelatihan-struktural/detail/pegawai/${btoa(
                      item?.id
                    )}`
                  )
                }
                icon={<Info style={styles.iconButton} />}
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
        <Button
          text='Edit'
          color='sidatukDraweBase'
          icon={<Edit style={styles.iconButton} />}
          onClick={() =>
            router.push(
              `/data-riwayat/pelatihan-struktural/edit/${router?.query?.id}`
            )
          }
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Pelatihan Struktural'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Diklat */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Nama Diklat</Typography>
              <Typography sx={styles?.font}>Diklat PIM Tk.IV</Typography>
            </Box>
          </Grid>
          {/* Periode */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={styles?.font}>Desember 2023</Typography>
            </Box>
          </Grid>
          {/* No Surat Perintah */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>No Surat Perintah</Typography>
              <Typography sx={styles?.font}>Nomor 74 Tahun 2023</Typography>
            </Box>
          </Grid>
          {/* Jenjang */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Jenjang</Typography>
              <Typography sx={styles?.font}>-</Typography>
            </Box>
          </Grid>
          {/* Tanggal Pelaksanaan */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Tanggal Pelaksanaan</Typography>
              <Typography sx={styles?.font}>00-00-00</Typography>
            </Box>
          </Grid>
          {/* Penyelenggara */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Penyelenggara</Typography>
              <Typography sx={styles?.font}>Kemensetneg</Typography>
            </Box>
          </Grid>
          {/* Durasi */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Durasi Pelatihan (Hari)</Typography>
              <Typography sx={styles?.font}>2</Typography>
            </Box>
          </Grid>
          {/* Materi */}
          <Grid item xs={6}>
            <Box sx={styles?.wrapperItem}>
              <Typography>Link Materi Pelatihan</Typography>
              <Button
                text='Lihat Materi'
                style={{ width: '140px' }}
                onClick={() => {
                  const url = 'https://youtube.com'
                  window.open(url, '_blank')
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Table
          columns={columns}
          rows={rows}
          title='Daftar Pegawai'
          colorTitle='simdatukPrimary'
          paper={false}
        />
      </Paper>
    </LayoutPages>
  )
}

export default RiwayatPelatihanStrukturalDetailComponent
