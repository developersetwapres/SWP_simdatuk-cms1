import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import BandingkanPegawaiContainer from '@/containers/BandingkanPegawaiContainer/BandingkanPegawaiContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps() {
  const data = getDataFromFile('bandingkan-pegawai')
  return { props: { data } }
}

const index = (props) => {
  const { data } = props
  return <BandingkanPegawaiContainer data={data} />
}

export default WithAuth(index)
