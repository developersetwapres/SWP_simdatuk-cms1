import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import PetaJabatanComponent from '@/components/petaJabatan/PetaJabatan'

export default connect(
  mapStateToProps('banner'),
  mapActions('getBanners', 'deleteListBanner')
)(
  class PetaJabantanContainer extends Component {
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
      }, 3000)
    }


    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <PetaJabatanComponent
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)