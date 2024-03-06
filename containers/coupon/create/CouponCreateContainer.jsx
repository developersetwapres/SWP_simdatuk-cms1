import CouponCreateComponent from '@/components/coupon/create/CouponCreateComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import CouponSkeleton from '@/components/coupon/skeleton/CouponSkeleton'

export default connect(
  mapStateToProps('coupon', 'command'),
  mapActions('postCoupon', 'getCommandOrganizer', 'getCommandCourses', 'filterCourseByProvider')
)(

  class CouponCreateContainer extends Component {
    static propTypes = {
      coupon: PropTypes.object,
      command: PropTypes.object,
      getCommandOrganizer: PropTypes.func,
      getCommandCourses: PropTypes.func,
      postCoupon: PropTypes.func,
      filterCourseByProvider: PropTypes.func
    }
    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    async componentDidMount() {
      await this.props.getCommandOrganizer()
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
              <CouponSkeleton />
            ) : (
              <CouponCreateComponent
                {...this.state}
                {...this.props}
                postCoupon={this.props.postCoupon}
                filterCourseByProvider={this.props.filterCourseByProvider}
              />
            )
          }

        </Layout>
      )
    }
  }
)