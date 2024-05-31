import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmploymentComponent from '@/components/Employment/EmploymentComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class EmploymentContainer extends Component {
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
          <EmploymentComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
