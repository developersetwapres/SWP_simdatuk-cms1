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
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  fontItem: {
    fontWeight: 600
  }
}

const data = [
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    rating: 'Sesuai Ekspektasi',
    predikat: 'Baik',
    pencapaian: 'Baik'
  }
]

const RiwayatSKPDetailComponent = () => {
  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 60,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Rating Perilaku Kerja',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Predikat Kinerja Pegawai',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Capaian Kinerja Organisasi',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 160,
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
          Header: 'Rating',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.rating}</Typography>
        },
        {
          Header: 'Predikat',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.predikat}</Typography>
        },
        {
          Header: 'Pencapaian',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.pencapaian}</Typography>
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
                    `/data-riwayat/skp/detail/pegawai/${btoa(item?.id)}`
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
            router.push(`/data-riwayat/skp/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat SKP'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Penghargaan */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat Jabatan</Typography>
              <Typography sx={styles?.fontItem}>
                Perubahan jabatan desember 2023
              </Typography>
            </Box>
          </Grid>
          {/* Periode */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={styles?.fontItem}>Desember 2023</Typography>
            </Box>
          </Grid>
          {/* Periode Penilaian */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Penilaian</Typography>
              <Typography sx={styles?.fontItem}>Q1</Typography>
            </Box>
          </Grid>
          {/* Tahun */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Tahun</Typography>
              <Typography sx={styles?.fontItem}>2023</Typography>
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

export default RiwayatSKPDetailComponent
