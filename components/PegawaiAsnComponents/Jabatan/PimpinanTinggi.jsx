import AsnDataList from '@/components/shared/Card/AsnDataList'
import React from 'react'
import { keteranganJabatan } from '../dummyData'
import EmployeeLayout from '@/components/Employee/EmployeeLayout'

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

const PimpinanTinggiComponent = () => {
  const getCardData = (data) => {
    console.log(data)
  }

  const totalAmount = keteranganJabatan[0].child.reduce(
    (sum, child) => sum + child.amount,
    0
  )

  return (
    <EmployeeLayout summary='Jabatan Pimpinan Tinggi' totalAmount={totalAmount}>
      <AsnDataList
        cardStyle={styles.twoCardStyle}
        data={keteranganJabatan[0].child}
        cardData={getCardData}
      />
    </EmployeeLayout>
  )
}

export default PimpinanTinggiComponent
