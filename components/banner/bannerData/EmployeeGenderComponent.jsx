import React from 'react'
import LayoutComponent from './LayoutBanner/LayoutComponent'

const EmployeeGenderComponent = () => {
  return (
    <>
      <LayoutComponent
        title='Jenis Kelamin Pegawai'
        subtitle='Jumlah jenis kelamin yang ada di Sekretariat Wakil Presiden'
        nameDataLeft='Pria'
        leftData='155'
        nameDataRight='Wanita'
        rightData='133'
        name='gender'
      />
    </>
  )
}

export default EmployeeGenderComponent
