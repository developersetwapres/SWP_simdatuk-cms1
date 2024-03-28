import EmployeeLayout from '@/components/Employee/EmployeeLayout'
import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import InputTags from '@/components/core/InputTags'
import ListDataPegawai from './ListDataPegawai'
import { dataPegawai } from './dataPegawai'
// Dummy Data
const filterData = [
  { title: 'Jabatan' },
  { title: 'Eselon' },
  { title: 'Golongan' },
  { title: 'NIP/NRP' },
  { title: 'Riwayat Pendidikan' },
  { title: 'Riwayat Pekerjaan' }
]


// End Dummy Data

const DataPegawai = () => {
  const [expandFilter, setExpandFilter] = useState(false)


  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }





  return (
    <EmployeeLayout
      summary='Bandingkan Pegawai'
      showExpButton={true}
      reset={true}
      addBtn={true}
    >
      <Paper
        sx={{
          padding: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography
              fontWeight='500'
            >
              Data Pegawai
            </Typography>
          </Box>
          <Box
            onClick={handleFilterClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '5px',
              width: '7rem',
              height: '3rem',
              borderRadius: '10px',
              border: '2px solid #895700',
              cursor: 'pointer'
            }}
          >
            <FilterAltIcon
              color='primary'
              sx={{
                fontSize: '20px',
                cursor: 'pointer'
              }}
            />
            <Typography
              color='primary'
              sx={{
                fontWeight: '500'
              }}
            >
              Filter
            </Typography>
          </Box>
        </Box>
        {
          expandFilter && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                fontWeight='500'
              >
                Filter Data
              </Typography>
              <Box
                width='90%'
              >
                <InputTags
                  id='filter'
                  listValue={filterData}
                  placeholder='Pilih Filter Data'
                />
              </Box>
            </Box>
          )
        }
        <Grid
          container
          direction='row'
        >
          {
            dataPegawai.map((data, index) =>
              <Grid
                key={index}
                lg={6}
              >
                <ListDataPegawai
                  index={index}
                  imageSource={data?.image}
                  jabatan={data.jabatan}
                  name={data.name}
                  eselon={data.eselon}
                  golongan={data.golongan}
                  nip={data.nip}
                  riwayatPendidikan={data.riwayatPendidikan}
                  riwayatJabatan={data.riwayatJabatan}
                  pelatihanStruktural={data.riwayatPelatihanStruktural}
                  pelatihanFungsional={data.pelatihanFungsional}
                  pelatihanTeknis={data.pelatihanTeknis}
                  riwayatCatatan={data.riwayatCatatan}
                />
              </Grid>
            )
          }
        </Grid>
      </Paper>
    </EmployeeLayout>
  )
}

export default DataPegawai
