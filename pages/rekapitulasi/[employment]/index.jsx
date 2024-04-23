/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmploymentContainer from '@/containers/Employment/EmployementContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps(ctx) {
  const employment = ctx?.params?.employment

  if (!employment) {
    return {
      redirect: {
        destination: '/rekapitulasi/komposisi-pegawai',
        permanent: false
      }
    }
  }

  const data = getDataFromFile(employment)
  return { props: { data } }
}

const index = (props) => {
  const { data } = props

  return <EmploymentContainer data={data} />
}

export default WithAuth(index)
