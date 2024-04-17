import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import AsnNonActiveComponent from '@/components/Employee/AsnNonActive/AsnNonActiveComponent'

const AsnNonActiveContainer = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <AsnNonActiveComponent />
    </Layout>
  )
}

export default AsnNonActiveContainer
