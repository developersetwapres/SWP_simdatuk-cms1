import React from 'react'
import LayoutComponent from './LayoutBanner/LayoutComponent'

const EmployeeTypeComponent = () => {
  return (
    <>
      <LayoutComponent
        title='Pegawai Bukan ASN'
        subtitle='Jumlah pegawai bukan ASN yang ada di Sekretariat Wakil Presiden'
        nameDataLeft='Perbantuan'
        leftData='143'
        nameDataRight='Perbantuan'
        rightData='190'
        name='type'
      />
    </>
  )
}

export default EmployeeTypeComponent
