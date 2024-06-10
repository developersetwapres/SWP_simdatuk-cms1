/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutPages from '@/components/core/LayoutPages'
import { Button, Table } from '@/components/shared'
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Checkbox,
  Button as MuiButton
} from '@mui/material'
import { Autocomplete } from '@/components/shared'
import FormControlLabel from '@mui/material/FormControlLabel'
import ModalConfirmDelete from '@/components/shared/Modal/ModalConfirmDelete'
import { useSelector } from 'react-redux'

const ExportEmployeeComponent = ({
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

  const columns = useMemo(() => {
    const col = [
      {
        Header: 'No',
        width: 600,
        align: 'left'
      },
      {
        Header: 'Nama',
        width: 600,
        align: 'left'
      }
    ]
    return col
  }, [role])

  const rows = useMemo(() => {
    const dataMapping = role?.data.map((item) => {
      return [
        {
          Header: 'No',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        },
        {
          Header: 'Name',
          align: 'left',
          verticalAlign: 'top',
          Cell: () => <Typography>{item?.name}</Typography>
        }
      ]
    })

    return dataMapping
  }, [role])

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
      <LayoutPages summary='Export Pegawai' action={action}>
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

        <Paper sx={{ padding: 2 }}>
          <Typography fontSize='12' color='#895700' fontWeight='700'>
            Jenis File Export
          </Typography>
          <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <FormControlLabel control={<Checkbox />} label='CSV' />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel control={<Checkbox />} label='XLSX' />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel control={<Checkbox />} label='PDF' />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ padding: 2 }}>
          <Typography fontSize='12' color='#895700' fontWeight='700'>
            Hasil Export Data
          </Typography>
          <Divider sx={{ border: '1px solid #929292', margin: '10px 0px' }} />

          <Box
            sx={{
              border: '1px solid #000',
              borderRadius: 1,
              padding: '0px 6px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight='700'>Data Diri</Typography>
              <FormControlLabel control={<Checkbox />} label='Pilih Semua' />
            </Box>

            <Grid container>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Nama' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Jabatan' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Keterangan Jabatan'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Eselon' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Golongan' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='NIP/NRP' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Tempat, Tanggal Lahir'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Umur' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Agama' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Jenis Kelamin'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Status Perkawinan'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Instansi Induk'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Satuan Organisasi'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Unit Kerja' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='No. Karpeg/No. Karis/No. Karsu'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Masa Kerja Keseluruhan'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Masa Kerja Golongan'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='NPWP' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Status Pegawai'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Alamat Tempat Tinggal Saat Ini'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Komplek' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='No. Telepon Rumah'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='No. HP' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Alamat Kantor'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='No. Telepon Kantor'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Email' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Batas Usia Pensiun'
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              border: '1px solid #000',
              borderRadius: 1,
              padding: '0px 6px',
              marginTop: 2
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight='700'>Data Riwayat</Typography>
              <FormControlLabel control={<Checkbox />} label='Pilih Semua' />
            </Box>

            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Pendidikan'
                />
              </Grid>

              <Grid container sx={{ paddingLeft: 4 }}>
                <Grid item xs={4}>
                  <FormControlLabel control={<Checkbox />} label='Strata III' />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel control={<Checkbox />} label='Strata II' />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Diploma IV/Strata I'
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Akademi/Diploma III/Sarjana Muda'
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Diploma I/II'
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='SLTA/Sederajat'
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='SLTP/Sederajat'
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='SD/Sederajat'
                  />
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Jabatan'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Golongan'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Pelatihan Struktural'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Pelatihan Fungsional'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Pelatihan Teknis'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Penghargaan'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Riwayat SKP' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Penetapan Angka Kredit Terakhir'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Penilaian Prestasi Kerja'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Hukuman Disiplin'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Riwayat Keluarga'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Riwayat Cuti' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox />} label='Catatan' />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Hasil Assessment'
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Hasil Uji Kompetensi'
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Hasil Talent Pool'
                />
              </Grid>
            </Grid>
          </Box>

          <MuiButton
            component='label'
            role={undefined}
            color='sidatukDraweBase'
            variant='contained'
            tabIndex={-1}
            onChange={() => {}}
            sx={{ textTransform: 'none', marginTop: 3 }}
          >
            Lihat Preview
          </MuiButton>
        </Paper>
      </LayoutPages>

      <LayoutPages>
        <Paper>
          <Table
            divider
            title='Preview Data'
            columns={columns}
            rows={rows}
            pagination={role?.pagination}
            handlePagination={onPaginationChange}
            handleRows={onRowsPerPageChange}
          />
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

ExportEmployeeComponent.propTypes = {
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

export default ExportEmployeeComponent
