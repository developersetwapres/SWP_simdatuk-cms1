import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PositionsContainer from '@/containers/PromosiPegawaiContainer/PositionsContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps() {
  const data = getDataFromFile('utama')
  return { props: { data } }
}

const index = (props) => {
  const { data } = props
  return <PositionsContainer data={data} />
}

export default WithAuth(index)
