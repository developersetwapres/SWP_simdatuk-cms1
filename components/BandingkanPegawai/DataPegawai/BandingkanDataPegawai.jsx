import EmployeeLayout from '@/components/Employee/EmployeeLayout'
import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import InputTags from '@/components/core/InputTags'
import ListDataPegawai from './ListDataPegawai'
import { dummyDataPegawai } from './DummydataPegawai'

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

const BandingkanDataPegawai = () => {
  const [expandFilter, setExpandFilter] = useState(false)
  const [pegawaiData, setPegawaiData] = useState({
    id: [],
    name: [],
    image: [],
    jabatan: [],
    eselon: [],
    golongan: [],
    nip: [],
    riwayatPendidikan: [],
    riwayatJabatan: [],
    pelatihanStruktural: [],
    pelatihanFungsional: [],
    pelatihanTeknis: [],
    riwayatCatatan: []

  })

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }


  useEffect(() => (
    setPegawaiData(prevState => {
      const newData = { ...prevState }
      for (const key in dummyDataPegawai[0]) {
        newData[key] = dummyDataPegawai.map(item => item[key])
      }
      return newData
    })
  ), [])
  console.log(pegawaiData)

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
          {/* {
            dummyDataPegawai.map((data, index) =>
              <Grid
                key={index}
                lg={6}
              > */}
          <ListDataPegawai
            id={pegawaiData.id}
            imageSource={pegawaiData?.image}
            jabatan={pegawaiData.jabatan}
            names={pegawaiData.name}
            eselon={pegawaiData.eselon}
            golongan={pegawaiData.golongan}
            nip={pegawaiData.nip}
            riwayatPendidikan={pegawaiData.riwayatPendidikan}
            riwayatJabatan={pegawaiData.riwayatJabatan}
            pelatihanStruktural={pegawaiData.pelatihanStruktural}
            pelatihanFungsional={pegawaiData.pelatihanFungsional}
            pelatihanTeknis={pegawaiData.pelatihanTeknis}
            riwayatCatatan={pegawaiData.riwayatCatatan}
          />
          {/* </Grid> */}
          {/* )
          } */}
        </Grid>
      </Paper>
    </EmployeeLayout>
  )
}

export default BandingkanDataPegawai
