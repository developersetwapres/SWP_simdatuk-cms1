import React from 'react'
import { Box } from '@mui/material'
import EmployeeLayout from '../EmployeeLayout'
import AsnDataList from '@/components/shared/Card/AsnDataList'
import { tenagaOutsourcing, nonOutsourcing } from '../AsnActive/dummiData'

const styles = {
  cardStyle: {
    width: {
      lg: '22vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  }
}

const OutsourcingComponent = () => {
  const totalPejabat = [...tenagaOutsourcing, ...nonOutsourcing]

  const totalAmount = totalPejabat.reduce(
    (acc, pejabat) => acc + pejabat.amount,
    0
  )

  return (
    <Box
      sx={{
        paddingTop: '20px'
      }}
    >
      <EmployeeLayout
        summary='Tenaga Outsourcing dan Non Outsourcing'
        totalAmount={totalAmount}
        showExpButton={false}
      >
        <AsnDataList
          data={tenagaOutsourcing}
          name='Non Aparatur Sipil Negara (Non ASN)'
        />
        <AsnDataList
          cardStyle={styles.cardStyle}
          data={nonOutsourcing}
          name='Tim Nasional Percepatan Penanggulangan Kemiskinan (TNP2K)'
        />
      </EmployeeLayout>
    </Box>
  )
}

export default OutsourcingComponent
