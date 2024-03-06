import React from 'react'
import Layout from './Layout'
// import Paper from '../shared/overrides/Paper'
import Skeleton from '../shared/Skeleton'
import PropTypes from 'prop-types'

function LoadingPage({
  total
}) {
  const mappedTotal = Array(total).fill(0)
  return (
    <Layout>
      {/* <Paper> */}
      {
        mappedTotal.map((_, i) => (
          <Skeleton key={i} />
        ))
      }
      <Skeleton />
      {/* </Paper> */}
    </Layout>
  )
}

LoadingPage.propTypes = {
  total: PropTypes.number
}

export default LoadingPage