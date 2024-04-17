import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import OutsourcingComponent from '@/components/Employee/Outsourcing/OutsourcingComponent'

const OutsourcingContainer = () => {
  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])

  return (
    <Layout willRender={willRender}>
      <OutsourcingComponent />
    </Layout>
  )
}

export default OutsourcingContainer
