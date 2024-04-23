/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import PropTypes from 'prop-types'
import WithAuth from '@/components/shared/WithAuth'
import EmployeesContainer from '@/containers/Employment/Employee/EmployeesContainer'
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

  function filterRecursive(items) {
    return items.flatMap((item) => {
      if (item.category === atob(subEmployment)) {
        return [item]
      }
      if (item.children) {
        return filterRecursive(item.children)
      }
      return []
    })
  }

  const datas = getDataFromFile(employment)
  const dataFilter = datas.flatMap((item) => {
    if (item.children) {
      return item.children.flatMap((child) => {
        return filterRecursive(child.children)
      })
    }
    return []
  })
  const data = dataFilter.length > 0 ? dataFilter[0] : []

  return { props: { data } }
}

const Employees = (props) => {
  const { data } = props

  return <EmployeesContainer data={data} />
}

Employees.propTypes = {
  data: PropTypes.object
}

export default WithAuth(Employees)
