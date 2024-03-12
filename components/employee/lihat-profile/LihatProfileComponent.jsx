import React from 'react'
import { Box, Grid } from '@mui/material'
import EmployeeLayout from '../EmployeeLayout'
import { eselon1 } from '../asn-active/dummiData'
import ProfileCard from '@/components/core/card/ProfileCard'


const LihatProfileComponent = () => {


  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Pejabat Pimpinan Tinggi Madya (Eselon I)'
        totalAmount={eselon1.length}
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
            eselon1.map((item, index) =>
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

export default LihatProfileComponent
