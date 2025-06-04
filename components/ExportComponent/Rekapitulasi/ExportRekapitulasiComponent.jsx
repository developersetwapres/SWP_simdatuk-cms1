import React from 'react'
import ExportLayout from '../../core/ExportLayout'
import ExportAsnActive from './AsnAktif/ExportAsnActive'
import ExportAsnNonActive from './AsnNonAktif/ExportAsnNonActive'
import ExportNonAsn from './NonAsn/ExportNonAsn'
import TenagaOutsourcing from './Outsourcing/ExportOutsourcing'

const ExportComponent = () => {
  return (
    <ExportLayout summary='Rekapitulasi Pegawai Sekretariat Wakil Presiden RI'>
      <ExportAsnActive />
      <ExportAsnNonActive />
      <ExportNonAsn />
      <TenagaOutsourcing />
    </ExportLayout>
  )
}

export default ExportComponent
