import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ComparisonsContainer from '@/containers/PromosiPegawaiContainer/ComparisonsContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps() {
  const data = getDataFromFile('utama')
  return { props: { data } }
}

const index = (props) => {
  const { data } = props
  return <ComparisonsContainer data={data} />
}

export default WithAuth(index)
