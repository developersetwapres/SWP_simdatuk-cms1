import React, { useEffect, useMemo, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import InputTags from '@/components/core/InputTags'
import ListDataPegawai from './ListDataPegawai'
import { dummyDataPegawai } from './DummydataPegawai'
import { useRouter } from 'next/router'
import { Button } from '@/components/shared'
import LayoutPages from '@/components/core/LayoutPages'
import ButtonExport from '@/components/core/ButtonExport'

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
  const router = useRouter()
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

  const action = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button text='Tambah Pegawai' color='primary' onClick={() => {}} />
        <Button
          text='Reset Pegawai'
          color='sidatukDraweBase'
          onClick={() => {}}
        />
        <ButtonExport
          data={[
            { name: 'PDF', action: () => {} },
            { name: 'XLS', action: () => {} },
            { name: 'CSV', action: () => {} }
          ]}
        />
      </Box>
    )
  }, [])

  const handleFilterClick = () => {
    setExpandFilter(!expandFilter)
  }

  useEffect(() => {
    setPegawaiData((prevState) => {
      const newData = { ...prevState }
      for (const key in dummyDataPegawai[0]) {
        newData[key] = dummyDataPegawai.map((item) => item[key])
      }
      return newData
    })
  }, [])

  return (
    <LayoutPages
      handleBack={() => router.back()}
      summary='Bandingkan Pegawai'
      action={action}
    >
      <Paper sx={{ padding: '20px' }}>
        <Box sx={{ marginBottom: '20px' }}>
          <Box
            sx={{
              marginBottom: '12px',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography fontWeight='500'>Data Pegawai</Typography>
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
          {expandFilter && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography fontWeight='500'>Filter Data</Typography>
                <Box width='90%'>
                  <InputTags
                    id='filter'
                    listValue={filterData}
                    placeholder='Pilih Filter Data'
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: '12px',
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
                <Button text='Selesai' />
              </Box>
            </Box>
          )}
        </Box>
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
      </Paper>
    </LayoutPages>
  )
}

export default BandingkanDataPegawai
