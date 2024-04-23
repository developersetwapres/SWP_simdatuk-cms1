import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import SubEmploymentComponent from '@/components/Employment/SubEmploymentComponent'

export default connect(
  mapStateToProps('banner'),
  mapActions('getBanners', 'deleteListBanner')
)(
  class SubEmploymentContainer extends Component {
    static propTypes = {
      data: PropTypes.object,
      banner: PropTypes.object,
      getBanners: PropTypes.func,
      deleteListBanner: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 2000)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <SubEmploymentComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
