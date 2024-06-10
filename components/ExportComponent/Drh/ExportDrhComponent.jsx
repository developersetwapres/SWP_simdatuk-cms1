/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button } from '@/components/shared'
import { Box, Paper, Typography, Divider, Grid } from '@mui/material'
import { Autocomplete } from '@/components/shared'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { useSelector } from 'react-redux'

const ExportDrhComponent = ({
  role,
  queries,
  onFetch = () => {},
  onFetchOptions = () => {},
  onSearch = () => {},
  onLoading = () => {},
  onPaginationChange = () => {},
  onRowsPerPageChange = () => {},
  deleteRole = () => {}
}) => {
  const modal = useSelector((state) => state.modalReducer)

  const [modalDelete, setModalDelete] = useState(false)
  const [deleteValue, setDeleteValue] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSetValue = (val) => {
    const data = role?.options.filter((itm) => itm?.name == val)[0]
    setDeleteValue(data)
  }

  const handleDelete = () => {
    const payload = {
      id: deleteId,
      data: { role_id: deleteValue?.id }
    }

    deleteRole(payload)
  }

  const handleModal = () => {
    const newVal = !modalDelete

    setModalDelete(newVal)

    if (!newVal) {
      setDeleteId(null)
      setDeleteValue(null)
    }
  }

  const options = useMemo(() => {
    let newOptions = []
    const datas = role?.options

    if (datas) {
      if (deleteId) {
        const newData = datas
          .filter((itm) => itm?.id !== deleteId)
          .map((itm) => itm?.name)
        newOptions = newData
      } else {
        const newData = datas.map((itm) => itm?.name)
        newOptions = newData
      }
    }

    return newOptions
  }, [role, deleteId])

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Reset' color='danger' onClick={() => {}} />
        <Button text='Export' onClick={() => {}} />
      </Box>
    )
  }, [])

  useEffect(() => {
    const state = !role?.loading
    onLoading(state)
  }, [role])

  useEffect(() => {
    if (modal?.code !== null) handleModal()
    if (!modal?.modal && role?.data.length > 0) {
      onFetch(queries)
      onFetchOptions()
    }
  }, [modal])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <LayoutPages summary='Export DRH' action={action}>
        <Paper sx={{ padding: 2 }}>
          <Typography fontSize='12' color='#895700' fontWeight='700'>
            Filter Data
          </Typography>
          <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

          <Grid container direction='row' spacing={3} rowSpacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Satuan Organisasi'
                multiple={true}
                label='Satuan Organisasi'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Pegawai'
                multiple={true}
                label='Pegawai'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Deputi'
                multiple={true}
                label='Deputi'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Eselon'
                multiple={true}
                label='Eselon'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Golongan'
                multiple={true}
                label='Golongan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Keterangan Jabatan'
                multiple={true}
                label='Keterangan Jabatan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Riwayat Pendidikan'
                multiple={true}
                label='Riwayat Pendidikan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Jenis Kelamin'
                multiple={true}
                label='Jenis Kelamin'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Umur'
                multiple={true}
                label='Umur'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Status Perkawinan'
                multiple={true}
                label='Status Perkawinan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Batas Usia Pensiun'
                multiple={true}
                label='Batas Usia Pensiun'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Masa Kerja Keseluruhan'
                multiple={true}
                label='Masa Kerja Keseluruhan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={['a', 'b']}
                name={`name`}
                placeholder='Pilih Masa Kerja Golongan'
                multiple={true}
                label='Masa Kerja Golongan'
                error={''}
                onChange={(val) => {}}
              />
            </Grid>
          </Grid>
        </Paper>
      </LayoutPages>

      <ModalConfirmDelete
        label='Role Pengguna'
        title='Hapus Data Role Pengguna'
        copytext='Apakah anda yakin akan menghapus data role pengguna ? Jika ya, silahkan pilih role pengguna lain sebagai pengganti'
        options={options}
        open={modalDelete}
        value={deleteValue?.name || null}
        isLoading={role?.loading}
        handleModal={handleModal}
        handleDelete={handleDelete}
        handleSetValue={handleSetValue}
      />
    </Box>
  )
}

ExportDrhComponent.propTypes = {
  role: PropTypes.object,
  queries: PropTypes.object,
  onFetch: PropTypes.func,
  onFetchOptions: PropTypes.func,
  onSearch: PropTypes.func,
  onLoading: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  deleteRole: PropTypes.func
}

export default ExportDrhComponent
