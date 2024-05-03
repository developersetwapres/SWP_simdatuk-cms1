import React from 'react'
import { Box, Grid } from '@mui/material'
import ProfileCard from '@/components/shared/Card/CardProfile'
import { listPegawai } from '@/components/PegawaiAsnComponents/dummyData'
import EmployeeLayout from '@/components/core/LayoutPages'

const ListPegawaiComponent = () => {
  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Staf Khusus Wakil Presiden'
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

export default ListPegawaiComponent
