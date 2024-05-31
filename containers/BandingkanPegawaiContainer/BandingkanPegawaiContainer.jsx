import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import BandingkanPegawaiComponent from '@/components/BandingkanPegawai/BandingkanPegawaiComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class BannerContainer extends Component {
    static propTypes = {
      data: PropTypes.array,
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
          <BandingkanPegawaiComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
