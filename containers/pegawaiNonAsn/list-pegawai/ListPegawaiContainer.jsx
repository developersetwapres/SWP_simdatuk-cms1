import React, { useState, useEffect } from 'react'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import ListPegawaiComponent from '@/components/pegawaiNonAsn/list-pegawai/ListPegawaiComponent'

const ListPegawaiContainer = () => {


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
            <ListPegawaiComponent />
          )
      }
    </Layout>
  )
}

export default ListPegawaiContainer
