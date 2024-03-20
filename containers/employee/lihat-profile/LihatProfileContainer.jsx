import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import LihatProfileComponent from '@/components/employee/lihat-profile/LihatProfileComponent'

const LihatProfileContainer = () => {


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
            <LihatProfileComponent />
          )
      }
    </Layout>
  )
}

export default LihatProfileContainer
