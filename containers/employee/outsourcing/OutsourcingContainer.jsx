import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import OutsourcingComponent from '@/components/employee/outsourcing/OutsourcingComponent'

const OutsourcingContainer = () => {


  const [willRender, setWillRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
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
            <OutsourcingComponent />
          )
      }
    </Layout>
  )
}

export default OutsourcingContainer
