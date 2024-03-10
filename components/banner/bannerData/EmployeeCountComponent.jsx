import React from 'react'
import LayoutComponent from './LayoutBanner/LayoutComponent'

const EmployeeCountComponent = () => {
  return (
    <>
      <LayoutComponent
        title='Jumlah Pegawai'
        subtitle='Jumlah pegawai yang ada di Sekretariat Wakil Presiden'
        nameDataLeft='Seluruhnya'
        leftData='294'
        nameDataRight='Aktif'
        rightData='228'
        name='count'
      />
    </>
  )
}

export default EmployeeCountComponent
