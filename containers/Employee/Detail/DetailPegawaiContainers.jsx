import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import DetailComponent from '@/components/Employee/Detail/DetailComponent'

const DetailPegawaiContainers = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <DetailComponent />
    </Layout>
  )
}

export default DetailPegawaiContainers
