import SortBannerComponent from '@/components/banner/sort-banner/SortBannerComponent'
import React, { Component } from 'react'
import { mapActions, mapStateToProps } from '@/store/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import SortBannerSkeleton from '@/components/banner/skeleton/SortBannerSkeleton'

export default connect(
  mapStateToProps('banner'),
  mapActions('getSortBanner', 'patchSortBanner')
)(
  class SortBannerContainer extends Component {
    static propTypes = {
      banner: PropTypes.object,
      getSortBanner: PropTypes.func,
      patchSortBanner: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      this.props.getSortBanner()
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
              <SortBannerSkeleton />
            ) : (
              <SortBannerComponent
                {...this.state}
                {...this.props}
                patchSortBanner={this.props.patchSortBanner}
              />
            )
          }
        </Layout>
      )
    }
  }
)