import React from 'react'
import ChartLayout from './Chart/ChartLayout'

const ChartComponent = () => {
  return (
    <>
      <ChartLayout
        title='Unit Kerja'
        subtitle='Detail unit kerja yang ada di Sekretariat Wakil Presiden'
      />
      <ChartLayout
        title='Pendidikan Pegawai'
        subtitle='Detail pendidikan pegawai yang ada di Sekretariat Wakil Presiden'
      />
    </>
  )
}

export default ChartComponent
