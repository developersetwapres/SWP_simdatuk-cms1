import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import PegawaiNonAsnComponent from '@/components/pegawaiNonAsn/PegawaiNonAsnComponent'


export default connect(
  mapStateToProps('banner'),
  mapActions('getBanners', 'deleteListBanner')
)(
  class PegawaiNonAsnContainer extends Component {
    static propTypes = {
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
      }, 5000)
    }


    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <PegawaiNonAsnComponent
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)