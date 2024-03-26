import React from 'react'
import InputTags from '../core/InputTags'
import { Box, Grid } from '@mui/material'
import { Button } from '../shared'
import PropTypes from 'prop-types'

const style = {
  rootStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  displayHide: {
    display: 'none'
  }
}

const top100Films = [
  { title: 'Eselon 1' },
  { title: 'Eselon 2' },
  { title: 'Eselon 3' },
  { title: 'Eselon 4' },
  { title: 'Eselon 5' }
]

const BandingPegawaiForm = ({
  expand
}) => {

  console.log(expand)
  return (
    <Box
      sx={expand ? style.rootStyle : style.displayHide}
    >
      <Grid
        container
        item
        justifyContent='space-between'
        spacing={1}
      >
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Eselon'
            placeholder='Pilih Eselon'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Golongan'
            placeholder='Pilih Golongan'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Riwayat Pendidikan'
            placeholder='Pilih Riwayat Pendidikan'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Umur Maksimal'
            placeholder='Pilih Umur Maksimal'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Riwayat Hukum Disiplin'
            placeholder='Pilih Riwayat Hukum Disiplin'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Penilaian Kinerja Pegawai'
            placeholder='Pilih Penilaian Kinerja Pegawai'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Masa Kerja Keselurhan'
            placeholder='Pilih Masa Kerja Keselurhan'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Masa Keja Golongan'
            placeholder='Pilih Masa Keja Golongan'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Angka Kredit'
            placeholder='Pilih Angka Kredit'
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          sm={12}
        >
          <InputTags
            listValue={top100Films}
            inputLabel='Uji Kompetensi'
            placeholder='Pilih Uji Kompetensi'
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <Button
          text='Reset Filter'
          sx={{
            backgroundColor: '#d32f2f'
          }}
        />
        <Button
          text='Selesai'
        />
      </Box>
    </Box>
  )
}

BandingPegawaiForm.propTypes = {
  expand: PropTypes.bool
}

export default BandingPegawaiForm
