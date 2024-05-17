import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPelatihanStrukturalEditComponent from '@/components/Riwayat/Pelatihan/Struktural/RiwayatPelatihanStrukturalEditComponent'

export default connect(
  mapStateToProps('banner'),
  mapActions('getBanners', 'deleteListBanner')
)(
  class RiwayatPelatihanStrukturalEditContainer extends Component {
    static propTypes = {
      banner: PropTypes.object,
      data: PropTypes.object,
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
          <RiwayatPelatihanStrukturalEditComponent
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
