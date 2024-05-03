import React from 'react'
import { Box, Grid } from '@mui/material'
import ProfileCard from '@/components/shared/Card/CardProfile'
import { listPegawai } from '../dummyData'
import EmployeeLayout from '@/components/core/LayoutPages'

const LihatProfileComponent = () => {
  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='DEPUTI BIDANG DUKUNGAN KEBIJAKAN PEMERINTAHAN DAN WAWASAN KEBANGSAAN'
        totalAmount={listPegawai.length}
        showExpButton={false}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          sx={{
            gap: '2.3rem',
            padding: 2
          }}
        >
          {listPegawai.map((item, index) => (
            <Grid item key={index + 1}>
              <ProfileCard
                summary={item.position}
                imageSource={item.image}
                name={item.name}
                eselon={item.eselon}
                golongan={item.golongan}
                nip={item.NIP}
              />
            </Grid>
          ))}
        </Grid>
      </EmployeeLayout>
    </Box>
  )
}

export default LihatProfileComponent
