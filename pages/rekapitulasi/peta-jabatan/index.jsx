import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PetaJabatanContainer from '@/containers/PetaJabatanContainers/PetaJabatanContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps() {
  const data = getDataFromFile('utama')
  return { props: { data } }
}

const index = (props) => {
  const { data } = props
  return <PetaJabatanContainer data={data} />
}

export default WithAuth(index)
