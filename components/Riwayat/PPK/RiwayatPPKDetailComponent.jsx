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
    nilai: 90
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    nilai: 90
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    nilai: 90
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    nilai: 90
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    nilai: 90
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    nilai: 90
  }
]

const RiwayatPPKDetailComponent = () => {
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
        width: 300,
        align: 'left'
      },
      {
        Header: 'Nilai Prestasi Kerja',
        width: 300,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 50,
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
          Header: 'Nilai',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.nilai}</Typography>
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
                    `/data-riwayat/ppk/detail/pegawai/${btoa(item?.id)}`
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
            router.push(`/data-riwayat/ppk/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat PPK'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Riwayat PPK */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat PPK</Typography>
              <Typography sx={styles?.fontItem}>PPK Desember 2023</Typography>
            </Box>
          </Grid>
          {/* Periode Riwayat */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Riwayat</Typography>
              <Typography sx={styles?.fontItem}>Desember 2023</Typography>
            </Box>
          </Grid>
          {/* Periode PPK */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode PPK</Typography>
              <Typography sx={styles?.fontItem}>Desember 2023</Typography>
            </Box>
          </Grid>
          {/* Nama Penilaian Prestasi Kerja */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Penilaian Prestasi Kerja</Typography>
              <Typography sx={styles?.fontItem}>Penilaian bulanan</Typography>
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

export default RiwayatPPKDetailComponent
