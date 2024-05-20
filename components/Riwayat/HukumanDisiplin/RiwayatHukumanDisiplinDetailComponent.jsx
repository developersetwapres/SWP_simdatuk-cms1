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
  itemWrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
  fontItem: { fontWeight: 600 }
}

const data = [
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  },
  {
    id: 123,
    nama: 'Ibnu Iskandar, S.E. / 180004051',
    golongan: 'Golongan I',
    jabatan: 'Jabatan I',
    jenisHukuman: 'Teguran Tertulis',
    tingkatHukuman: 'Ringan',
    pemotonganTunjangan: 0.25,
    waktuPemotongan: 3,
    noSkHukuman: 'No SK Hukuman',
    tanggalSkHukuman: '00-00-00',
    tanggalHukuman: '00-00-00',
    pejabatBerwenang: 'Deputi Bidang Administrasi',
    namaPejabatBerwenang: 'Sapto Harjono Wahjoe Sedjati, S.Sos., M.A.'
  }
]

const RiwayatHukumanDisiplinDetailComponent = () => {
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
        width: 400,
        minWidth: 260,
        align: 'left'
      },
      {
        Header: 'Golongan',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Jabatan',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Jenis Hukuman',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Tingkat Hukuman',
        width: 400,
        minWidth: 160,
        align: 'left'
      },
      {
        Header: 'Pemotongan Tunjangan Kinerja (Persentase)',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Jangka Waktu Pemotongan (Bulan)',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'No SK Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal SK Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Tanggal Hukuman Disiplin',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Pejabat Berwenang',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Nama Pejabat Berwenang',
        width: 400,
        minWidth: 200,
        align: 'left'
      },
      {
        Header: 'Aksi',
        width: 200,
        minWidth: 200,
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
          Header: 'Golongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.golongan}</Typography>
        },
        {
          Header: 'Jabatan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jabatan}</Typography>
        },
        {
          Header: 'Jenis Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.jenisHukuman}</Typography>
        },
        {
          Header: 'Tingkat Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tingkatHukuman}</Typography>
        },
        {
          Header: 'Pemotongan Tunjangan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.pemotonganTunjangan}</Typography>
        },
        {
          Header: 'Waktu Pemotongan',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.waktuPemotongan}</Typography>
        },
        {
          Header: 'No SK Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.noSkHukuman}</Typography>
        },
        {
          Header: 'Tanggal SK Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tanggalSkHukuman}</Typography>
        },
        {
          Header: 'Tanggal Hukuman',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.tanggalHukuman}</Typography>
        },
        {
          Header: 'Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.pejabatBerwenang}</Typography>
        },
        {
          Header: 'Nama Pejabat Berwenang',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.namaPejabatBerwenang}</Typography>
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
                    `/data-riwayat/hukuman-disiplin/detail/pegawai/${btoa(
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
              `/data-riwayat/hukuman-disiplin/edit/${router?.query?.id}`
            )
          }
        />
      </Box>
    )
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat HukumanDisiplin'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }}>
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat Hukuman Disiplin</Typography>
              <Typography sx={styles?.fontItem}>
                Perubahan HukumanDisiplin desember 2023
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Riwayat</Typography>
              <Typography sx={styles?.fontItem}>Desember 2023</Typography>
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

export default RiwayatHukumanDisiplinDetailComponent
