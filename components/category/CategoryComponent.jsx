import React from 'react'
import CategoryToolbarComponent from './CategoryToolbarComponent'
import PropTypes from 'prop-types'
import CategoryListComponent from './CategoryListComponent'

function CategoryComponent({
  category,
  queries,
  onClearState = () => { },
  onPaginationChange = () => { },
  deleteCourseCategoryList = () => { },
  onSearch = () => { }
}) {
  return (
    <>
      {/* Category Toolbar */}
      <CategoryToolbarComponent
        queries={queries}
        onClearState={onClearState}
        onSearch={onSearch}
      />
      {/* Category List */}
      <CategoryListComponent
        items={category?.category}
        pagination={category?.pagination}
        onPaginationChange={onPaginationChange}
        deleteCourseCategoryList={deleteCourseCategoryList}
        loading={category?.loading}
        resetPagination={queries?.page}
      />
    </>
  )
}

CategoryComponent.propTypes = {
  category: PropTypes.object,
  queries: PropTypes.object,
  onClearState: PropTypes.func,
  onPaginationChange: PropTypes.func,
  deleteCourseCategoryList: PropTypes.func,
  onSearch: PropTypes.func
}

export default CategoryComponent