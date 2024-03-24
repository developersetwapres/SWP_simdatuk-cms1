import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import AsnNonActiveComponent from '@/components/Employee/AsnNonActive/AsnNonActiveComponent'

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
            <AsnNonActiveComponent />
          )
      }
    </Layout>
  )
}

export default AsnNonActiveContainer
