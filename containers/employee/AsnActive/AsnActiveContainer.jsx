import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import AsnActiveComponent from '@/components/Employee/AsnActive/AsnActiveComponent'

const AsnActiveContainer = () => {


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
            <AsnActiveComponent />
          )
      }
    </Layout>
  )
}

export default AsnActiveContainer
