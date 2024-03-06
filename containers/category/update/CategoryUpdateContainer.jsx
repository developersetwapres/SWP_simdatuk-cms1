import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CategorySkeleton from '@/components/category/CategorySkeleton'
import CategoryUpdateComponent from '@/components/category/update/CategoryUpdateComponent'

const CategoryUpdateContainer = ({
  router,
  category,
  getCourseCategoryById = () => { },
  updateCourseCategory = () => { },
  getProgramPKASN = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    getProgramPKASN()
  }, [getProgramPKASN])

  useEffect(() => {
    if (!router.isReady) return
    getCourseCategoryById(router.query.id)
  }, [router, getCourseCategoryById])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <CategorySkeleton />
          ) : (
            <CategoryUpdateComponent
              category={category}
              updateCourseCategory={updateCourseCategory}
            />
          )
      }
    </Layout>
  )
}

CategoryUpdateContainer.propTypes = {
  router: PropTypes.object,
  category: PropTypes.object,
  getCourseCategoryById: PropTypes.func,
  updateCourseCategory: PropTypes.func,
  getProgramPKASN: PropTypes.func
}

export default connect(
  mapStateToProps('category'),
  mapActions('getCourseCategoryById', 'updateCourseCategory', 'getProgramPKASN')
)(CategoryUpdateContainer)