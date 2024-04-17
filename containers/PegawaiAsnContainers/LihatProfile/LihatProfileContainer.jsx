import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import LihatProfileComponent from '@/components/PegawaiAsnComponents/LihatProfile/LihatProfileComponent'

const LihatProfileContainer = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <LihatProfileComponent />
    </Layout>
  )
}

export default LihatProfileContainer
