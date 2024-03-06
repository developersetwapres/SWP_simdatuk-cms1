import CategoryCreateComponent from '@/components/category/create/CategoryCreateComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import CategorySkeleton from '@/components/category/CategorySkeleton'

export default connect(
  mapStateToProps('category'),
  mapActions('postCategory', 'getProgramPKASN')
)(
  class CategoryCreateContainer extends Component {
    static propTypes = {
      category: PropTypes.object,
      postCategory: PropTypes.func,
      getProgramPKASN: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      this.props.getProgramPKASN()
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 5000)
    }

    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          {
            this.state.willRender === false ? (
              <CategorySkeleton />
            ) : (
              <CategoryCreateComponent
                {...this.state}
                {...this.props}
                postCategory={this.props.postCategory}
              />
            )
          }
        </Layout>
      )
    }
  }
)