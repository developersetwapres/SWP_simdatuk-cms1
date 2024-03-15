import React from 'react'
import ExportLayout from '../../core/ExportLayout'
import ExportAsnActive from './asn-aktif/ExportAsnActive'
import ExportAsnNonActive from './asn-non-aktif/ExportAsnNonActive'
import ExportNonAsn from './non-asn/ExportNonAsn'
import TenagaOutsourcing from './outsourcing/ExportOutsourcing'

const ExportComponent = () => {




  return (
    <ExportLayout
      summary='Rekapitulasi Pegawai Sekretariat Wakil Presiden RI'
    >
      <ExportAsnActive />
      <ExportAsnNonActive />
      <ExportNonAsn />
      <TenagaOutsourcing />
    </ExportLayout>
  )
}

export default ExportComponent
