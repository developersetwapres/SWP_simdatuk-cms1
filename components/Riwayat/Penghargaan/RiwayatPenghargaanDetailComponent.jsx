/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import { Box, Grid, Typography } from '@mui/material'
import { Edit, Info } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Paper from '@/components/shared/overrides/Paper'
import { monthOptions } from 'libs/types/options'

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

const RiwayatPenghargaanDetailComponent = ({
  recognition,
  decree,
  getRecognition = () => { },
  clearRecognitionState = () => { },
  onLoading = () => { }
}) => {
  const router = useRouter()

  const dataDecree = useMemo(() => {
    return decree?.data
  }, [decree])

  const data = useMemo(() => {
    return recognition?.detail
  }, [recognition])

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        width: 60,
        align: 'left'
      },
      {
        Header: 'Nama Pegawai',
        width: 600,
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
    const data = recognition?.detail?.users || []
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
          Cell: () => <Typography>{item?.name || '-'}</Typography>
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
                    `/data-riwayat/penghargaan/detail/pegawai/${btoa(item?.user_id)}`
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
  }, [recognition])

  const action = useMemo(() => {
    return (
      <Box>
        <Button
          text='Edit'
          color='sidatukDraweBase'
          icon={<Edit style={styles.iconButton} />}
          onClick={() =>
            router.push(`/data-riwayat/penghargaan/edit/${router?.query?.id}`)
          }
        />
      </Box>
    )
  }, [])

  const handleGetDecreeType = (val) => {
    const dataFilter = dataDecree.find((itm) => itm?.id == val)
    return dataFilter?.name
  }

  const handleParsePeriod = (month, year) => {
    return month && year ? `${monthOptions[month - 1]} ${year}` : '-'
  }

  useEffect(() => {
    // Get Detail User
    const id = router?.query?.id
    if (id) getRecognition(atob(id))

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearRecognitionState)

    return () => {
      router.events.off('routeChangeComplete', clearRecognitionState)
    }
  }, [router])

  useEffect(() => {
    const state =
      !recognition?.loading && Object.entries(recognition?.detail).length > 0
    onLoading(state)
  }, [recognition])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Detail Riwayat Penghargaan'
      action={action}
    >
      <Paper style={{ padding: '24px 20px' }}>
        <Grid container sx={{ marginBottom: '26px' }} spacing={3}>
          {/* Nama Penghargaan */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Nama Riwayat Jabatan</Typography>
              <Typography sx={styles?.fontItem}>{data?.name || '-'}</Typography>
            </Box>
          </Grid>
          {/* Periode */}
          <Grid item xs={6}>
            <Box sx={styles?.itemWrapper}>
              <Typography>Periode Input Riwayat</Typography>
              <Typography sx={styles?.fontItem}>
                {handleParsePeriod(data?.period_month, data?.period_year)}
              </Typography>
            </Box>
          </Grid>
          {/* Keterangan Penghargaan */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Keterangan Penghargaan</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.description || '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Jenis SK */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Jenis SK</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.type_of_decree
                  ? handleGetDecreeType(data?.type_of_decree)
                  : '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Tanggal SK */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Tanggal SK</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.decree_date || '-'}
              </Typography>
            </Box>
          </Grid>
          {/* No SK Penghargaan */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>No SK Penghargaan</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.decree_number || '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Tahun SK */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Tahun SK</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.decree_year ? `Tahun ${data?.decree_year}` : '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Instansi Pemberi Penghargaan */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Instansi Pemberi Penghargaan</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.awarding_institution || '-'}
              </Typography>
            </Box>
          </Grid>
          {/* Tanggal Terima */}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography>Tanggal Terima</Typography>
              <Typography sx={styles?.fontItem}>
                {data?.date_of_receipt || '-'}
              </Typography>
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

RiwayatPenghargaanDetailComponent.propTypes = {
  recognition: PropTypes.object,
  decree: PropTypes.object,
  getRecognition: PropTypes.func,
  clearRecognitionState: PropTypes.func,
  onLoading: PropTypes.func
}

export default RiwayatPenghargaanDetailComponent
