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

const JabatanFungsionalComponent = () => {
  const totalAmount = keteranganJabatan[2].child.reduce(
    (sum, child) => sum + child.amount,
    0
  )

  return (
    <EmployeeLayout summary='Jabatan Pimpinan Tinggi' totalAmount={totalAmount}>
      <AsnDataList
        cardStyle={styles.cardStyle}
        data={keteranganJabatan[2].child}
      />
    </EmployeeLayout>
  )
}

export default JabatanFungsionalComponent
