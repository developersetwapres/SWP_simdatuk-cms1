import React from 'react'
import PropTypes from 'prop-types'
import PetaJabatanContainer from '@/containers/PetaJabatanContainers/PetaJabatanContainer'
import WithAuth from '@/components/shared/WithAuth'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps(ctx) {
  const staff = ctx?.params?.staff

  if (!staff) {
    return {
      redirect: {
        destination: '/rekapitulasi/peta-jabatan',
        permanent: false
      }
    }
  }

  const data = getDataFromFile(atob(staff))
  return { props: { data } }
}

const EmplyementPetaJabatan = (props) => {
  const { data } = props

  return <PetaJabatanContainer data={data} />
}

EmplyementPetaJabatan.propTypes = {
  data: PropTypes.object
}

export default WithAuth(EmplyementPetaJabatan)
