import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import NonAsnComponent from '@/components/Employee/NonAsn/NonAsnComponent'

const NonAsnContainer = () => {


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
            <NonAsnComponent />
          )
      }
    </Layout>
  )
}

export default NonAsnContainer
