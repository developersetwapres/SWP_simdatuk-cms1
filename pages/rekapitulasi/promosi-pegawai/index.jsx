import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PromosiPegawaiContainer from '@/containers/PromosiPegawaiContainer/PromosiPegawaiContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps() {
  const data = getDataFromFile('utama')
  return { props: { data } }
}

const index = (props) => {
  const { data } = props
  return <PromosiPegawaiContainer data={data} />
}

export default WithAuth(index)
