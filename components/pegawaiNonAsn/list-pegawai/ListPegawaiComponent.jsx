import React from 'react'
import { Box, Grid } from '@mui/material'
import ProfileCard from '@/components/core/card/ProfileCard'
import EmployeeLayout from '@/components/employee/EmployeeLayout'
import { listPegawai } from '@/components/pegawaiAsnComponent/dummyData'


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
          {
            listPegawai.map((item, index) =>
              <Grid
                item
                key={index + 1}
              >
                <ProfileCard
                  summary={item.position}
                  imageSource={item.image}
                  name={item.name}
                  eselon={item.eselon}
                  golongan={item.golongan}
                  nip={item.NIP}
                />
              </Grid>
            )
          }
        </Grid>
      </EmployeeLayout>
    </Box>
  )
}

export default ListPegawaiComponent
