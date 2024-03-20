import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import AsnNonActive from '@/components/employee/asn-non-active/AsnNonActiveComponent'

const AsnNonActiveContainer = () => {


  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 2000)
  }, [])


  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <CourseSkeleton />
          ) : (
            <AsnNonActive />
          )
      }
    </Layout>
  )
}

export default AsnNonActiveContainer
