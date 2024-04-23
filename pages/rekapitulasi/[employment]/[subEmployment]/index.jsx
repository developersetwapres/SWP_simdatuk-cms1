/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import SubEmployementContainer from '@/containers/Employment/SubEmployementContainer'
import { getDataFromFile } from '@/utils/dataLocal'

export async function getServerSideProps(ctx) {
  const employment = ctx?.params?.employment
  const subEmployment = ctx?.params?.subEmployment

  if (!employment) {
    return {
      redirect: {
        destination: '/rekapitulasi/komposisi-pegawai',
        permanent: false
      }
    }
  }

  const datas = getDataFromFile(employment)
  const dataFilter = datas.map((item) => ({
    ...item,
    children: item?.children.filter(
      (itm) => itm?.category == atob(subEmployment)
    )
  }))
  const data = dataFilter.length > 0 ? dataFilter[0]?.children[0] : []

  return { props: { data } }
}

const index = (props) => {
  const { data } = props

  return <SubEmployementContainer data={data} />
}

export default WithAuth(index)
