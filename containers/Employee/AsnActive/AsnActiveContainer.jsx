import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import AsnActiveComponent from '@/components/Employee/AsnActive/AsnActiveComponent'

const AsnActiveContainer = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <AsnActiveComponent />
    </Layout>
  )
}

export default AsnActiveContainer
