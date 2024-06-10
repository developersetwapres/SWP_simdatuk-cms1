import React from 'react'
import {
  Box,
  Typography,
  Button as MuiButton,
  Grid
} from '@mui/material'
import PropTypes from 'prop-types'
import { Input } from '@/components/shared'
import { styled } from '@mui/styles'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Autocomplete } from '@/components/shared'
import UploadFile from '@/components/shared/form/UploadFile'

function InputFile() {
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

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MuiButton
          component='label'
          role={undefined}
          variant='contained'
          color='sidatukDraweBase'
          tabIndex={-1}
          onChange={() => { }}
          sx={{ textTransform: 'none', marginTop: '4px' }}
        >
          Pilih File
          <VisuallyHiddenInput type='file' />
        </MuiButton>

        <Typography>Tidak ada file yang dipilih</Typography>
      </Box>

      <Box
        sx={{
          color: '#444444',
          fontWeight: '400',
          fontSize: '14px',
          textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'left',
            lg: 'left',
            xl: 'left'
          }
        }}
      >
        <p style={{ marginBottom: '-10px' }}>Format File : .png, .jpg</p>
        <p style={{ marginBottom: '-10px' }}>Maksimum Size : 2 MB</p>
        <p style={{ marginBottom: '-10px' }}>Dimensi 240 px x 240 px</p>
        <p style={{ color: '#D32F2F', marginTop: '20px' }}>Error</p>
      </Box>
    </>
  )
}

function EmployeeForm({ pageType }) {
  return (
    <>
      <Box>
        <Typography fontWeight={700}>Foto Profil</Typography>

        <InputFile />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label='Nama *'
              placeholder='Masukkan Nama'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          {pageType != 'OUTSOURCING' && (
            <>
              <Grid item xs={6}>
                <Input
                  label='Nama Gelar Depan'
                  placeholder='Masukkan Nama Gelar Depan'
                  name='name'
                  value={''}
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label='Nama Gelar Belakang'
                  placeholder='Masukkan Nama Gelar Belakang'
                  name='name'
                  value={''}
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Input
              label='NIP *'
              placeholder='Masukkan NIP'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          {pageType != 'OUTSOURCING' && (
            <Grid item xs={6}>
              <Input
                label='NRP'
                placeholder='Masukkan NRP'
                name='name'
                value={''}
                error={''}
                onChange={(val) => console.log(val)}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <Input
              label='Tempat Lahir *'
              placeholder='Masukkan Tempat Lahir'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <DatePickerDay
              value={''}
              name={'dateOfBirth'}
              label='Tanggal Lahir *'
              placeholder='dd-mm-yyyy'
              error={''}
              onChange={(val) => {
                console.log(val)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Agama'
              multiple={true}
              label='Agama *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Jenis Kelamin'
              multiple={true}
              label='Jenis Kelamin *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Status Perkawinan'
              multiple={true}
              label='Status Perkawinan *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            {pageType == 'ASN' && (
              <Autocomplete
                options={['a', 'b']}
                name='employementType'
                placeholder='Pilih Jenis Pegawai'
                multiple={true}
                label='Jenis Pegawai *'
                error={''}
                onChange={(val) => console.log(val)}
              />
            )}
            {pageType == 'NON_ASN' && (
              <Autocomplete
                options={['a', 'b']}
                name='employementType'
                placeholder='Pilih Jenis Perbantuan'
                multiple={true}
                label='Jenis Perbantuan *'
                error={''}
                onChange={(val) => console.log(val)}
              />
            )}
            {pageType == 'ASN' && (
              <Autocomplete
                options={['a', 'b']}
                name='employementType'
                placeholder='Pilih Jenis Outsourcing'
                multiple={true}
                label='Jenis Outsourcing *'
                error={''}
                onChange={(val) => console.log(val)}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Jabatan'
              multiple={true}
              label='Jabatan *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <DatePickerDay
              value={''}
              name={'dateOfBirth'}
              label='TMT Menjabat *'
              placeholder='dd-mm-yyyy'
              error={''}
              onChange={(val) => {
                console.log(val)
              }}
            />
          </Grid>

          {pageType != 'OUTSOURCING' && (
            <>
              <Grid item xs={6}>
                <Autocomplete
                  options={['a', 'b']}
                  name={`name`}
                  placeholder='Pilih Golongan'
                  multiple={true}
                  label='Golongan *'
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>

              <Grid item xs={6}>
                <DatePickerDay
                  value={''}
                  name={'dateOfBirth'}
                  label='TMT Golongan *'
                  placeholder='dd-mm-yyyy'
                  error={''}
                  onChange={(val) => {
                    console.log(val)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={['a', 'b']}
                  name={`name`}
                  placeholder='Pilih Eselon'
                  multiple={true}
                  label='Eselon *'
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>

              <Grid item xs={6}>
                <DatePickerDay
                  value={''}
                  name={'dateOfBirth'}
                  label='TMT Eselon'
                  placeholder='dd-mm-yyyy'
                  error={''}
                  onChange={(val) => {
                    console.log(val)
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={['a', 'b']}
                  name={`name`}
                  placeholder='Pilih Instansi Induk'
                  multiple={true}
                  label='Instansi Induk *'
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  options={['a', 'b']}
                  name={`name`}
                  placeholder='Pilih Satuan Organisasi'
                  multiple={true}
                  label='Satuan Organisasi *'
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Tingkat'
              multiple={true}
              label='Tingkat *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='Nama Sekolah/Universitas *'
              placeholder='Masukkan Nama Sekolah/Universitas'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='Tahun Lulus *'
              placeholder='Masukkan Tahun Lulus'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          {pageType != 'OUTSOURCING' && (
            <>
              <Grid item xs={6}>
                <Autocomplete
                  options={['a', 'b']}
                  name={`name`}
                  placeholder='Pilih Unit Kerja'
                  multiple={true}
                  label='Unit Kerja *'
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  label='No. Karpeg'
                  placeholder='Masukkan No. Karpeg'
                  name='name'
                  value={''}
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadFile
                  label='Kartu Pegawai'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  name={'name'}
                  value={''}
                  error={''}
                  onDelete={() => { }}
                  onChange={(val) => {
                    console.log(val)
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  label='No. Karis'
                  placeholder='Masukkan No. Karis'
                  name='name'
                  value={''}
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label='No. Karsu'
                  placeholder='Masukkan No. Karsu'
                  name='name'
                  value={''}
                  error={''}
                  onChange={(val) => console.log(val)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Input
              label='NPWP'
              placeholder='Masukkan NPWP'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Status Pegawai'
              multiple={true}
              label='Status Pegawai *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='No. KK *'
              placeholder='Masukkan No. KK *'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label='No. NIK *'
              placeholder='Masukkan No. NIK'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              options={['a', 'b']}
              name={`name`}
              placeholder='Pilih Komplek'
              multiple={true}
              label='Komplek *'
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label='Alamat Tempat Tinggal Saat Ini'
              placeholder='Masukkan Alamat Tempat Tinggal Saat Ini'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='No. Telepon Rumah'
              placeholder='Masukkan No. Telepon Rumah'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label='No. HP'
              placeholder='Masukkan No. HP'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='Alamat Kantor'
              placeholder='Masukkan Alamat Kantor'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label='No. Telepon Kantor'
              placeholder='Masukkan No. Telepon Kantor'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              label='Email'
              placeholder='Masukkan Email'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>

          {pageType == 'OUTSOURCING' && (
            <Grid item xs={6}>
              <Input
                label='Keterangan'
                placeholder='Masukkan Keterangan'
                name='name'
                value={''}
                error={''}
                onChange={(val) => console.log(val)}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <Input
              label='Kontak Darurat(Nama, Nomor Handphone, Hubungan dengan pegawai)*'
              placeholder='Masukkan Kontak Darurat'
              name='name'
              value={''}
              error={''}
              onChange={(val) => console.log(val)}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

EmployeeForm.propTypes = {
  pageType: PropTypes.string.isRequired
}

export default EmployeeForm