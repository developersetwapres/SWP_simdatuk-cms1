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
  }
}

const data = [
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    jabatan: 'Kepala Subbagian Administrasi',
    jenjangJabatan: 'Eselon II',
    keteranganJabatan: 'Promosi',
    tmt: '10-12-2023',
    noSk: 'Nomor 132 Tahun 2023'
  }
]

const RiwayatJabatanDetailComponent = () => {
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
        Header: 'Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Jenjang Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Keterangan Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'TMT Menjabat',
        width: 200,
        align: 'left'
      },
      {
        Header: 'No SK Jabatan',
        width: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 200,
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
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jabatan}</Typography>
        },
        {
          Header: 'Jenjang Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jenjangJabatan}</Typography>
        },
        {
          Header: 'Keterangan Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.keteranganJabatan}</Typography>
        },
        {
          Header: 'TMT',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tmt}</Typography>
        },
        {
          Header: 'No SK',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.noSk}</Typography>
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
                    `/data-riwayat/jabatan/detail/pegawai/${btoa(item?.id)}`
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
            router.push(`/data-riwayat/jabatan/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Jabatan'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Nama Riwayat Jabatan</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Perubahan jabatan desember 2023
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={{ fontWeight: 600 }}>Desember 2023</Typography>
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

export default RiwayatJabatanDetailComponent
