import React from 'react'
import { Box, Grid } from '@mui/material'
import EmployeeLayout from '../EmployeeLayout'
import { asnNonActive } from '../asn-active/dummiData'
import CardComponent from '../../core/card/CardComponent'

const styles = {
  rootStyle: {
    width: {
      lg: '22vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  }
}

const AsnNonActive = () => {


  const totalAmount = asnNonActive.reduce((acc, pejabat) => acc + pejabat.amount, 0)


  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Aparatur Sipil Negara (ASN) Non Aktif'
        totalAmount={totalAmount}
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
            asnNonActive.map((item, i) =>
              <Grid
                item
                key={i + 1}
              >
                <CardComponent
                  summary={item.name}
                  amount={item.amount}
                  rootStyle={styles.rootStyle}
                />
              </Grid>
            )
          }
        </Grid>
      </EmployeeLayout>
    </Box>
  )
}

export default AsnNonActive
