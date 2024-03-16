import AsnDataList from '@/components/core/card/AsnDataList'
import EmployeeLayout from '@/components/employee/EmployeeLayout'
import React from 'react'
import { keteranganJabatan } from '../dummyData'

const styles = {
  cardStyle: {
    width: {
      lg: '22.5vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  },
  twoCardStyle: {
    width: {
      lg: '35vw',
      md: '20vw',
      sm: '25vw',
      xs: '50vw'
    },
    height: '200px'
  }
}

const JabatanAdministrasiComponent = () => {

  const getCardData = (data) => {
    console.log(data)
  }

  const totalAmount = keteranganJabatan[1].child.reduce((sum, child) => sum + child.amount, 0)

  return (
    <EmployeeLayout
      summary='Jabatan Pimpinan Tinggi'
      totalAmount={totalAmount}
    >
      <AsnDataList
        cardStyle={styles.cardStyle}
        data={keteranganJabatan[1].child}
        cardData={getCardData}
      />
    </EmployeeLayout>
  )
}

export default JabatanAdministrasiComponent
