import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import ListPegawaiComponent from '@/components/PegawaiNonAsn/ListPegawai/ListPegawaiComponent'

const ListPegawaiContainer = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <ListPegawaiComponent />
    </Layout>
  )
}

export default ListPegawaiContainer
