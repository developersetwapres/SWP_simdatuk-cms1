import BannerCreateComponent from '@/components/banner/create/BannerCreateComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import BannerSkeleton from '@/components/banner/skeleton/BannerSkeleton'

export default connect(
  mapStateToProps('banner', 'command'),
  mapActions('postBanner', 'getCommandCourses')
)(
  class BannerCreateContainer extends Component {
    static propTypes = {
      banner: PropTypes.object,
      command: PropTypes.object,
      getCommandCourses: PropTypes.func,
      postBanner: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    async componentDidMount() {
      await this.props.getCommandCourses()
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
              <BannerSkeleton />
            ) : (
              <BannerCreateComponent
                {...this.state}
                {...this.props}
                postBanner={this.props.postBanner}
              />
            )
          }

        </Layout>
      )
    }
  }
)