import CouponSubmissionComponent from '@/components/coupon/submission/CouponSubmissionComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import { formatDate } from '@/utils/index'

export default connect(
  mapStateToProps(
    'couponSubmission',
    'command'
  ),
  mapActions(
    'getCouponSubmission',
    'getCourseLevel',
    'getCommandMenu',
    'rejectCouponSubmissionList',
    'approveCouponSubmission',
    'getCommandCoupon'
  )
)(
  class CouponSubmissionContainer extends Component {
    static propTypes = {
      couponSubmission: PropTypes.object,
      command: PropTypes.object,
      getCourseLevel: PropTypes.func,
      getCouponSubmission: PropTypes.func,
      getCommandMenu: PropTypes.func,
      rejectCouponSubmissionList: PropTypes.func,
      approveCouponSubmission: PropTypes.func,
      getCommandCoupon: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          sortBy: '',
          sortDesc: '',
          search: '',
          blacklist: false,
          level: '',
          position: '',
          status: '',
          startDate: ''
        }
      }
      this.fetch = this.fetch.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onBlacklist = this.onBlacklist.bind(this)
      this.onLevel = this.onLevel.bind(this)
      this.onStatus = this.onStatus.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onDateRange = this.onDateRange.bind(this)
    }

    fetch(queries) {
      this.props.getCouponSubmission(queries)
    }

    onSearch(val) {
      const queries = {
        ...this.state.queries,
        search: val || ''
      }
      this.setState({ queries })
      this.fetch(this.state.queries)
    }

    onBlacklist(val) {
      const queries = {
        ...this.state.queries,
        blacklist: val.value || false
      }
      this.setState({ queries })
      this.fetch(this.state.queries)
    }

    onLevel(val) {
      const queries = {
        ...this.state.queries,
        level: val || ''
      }

      this.setState({ queries })
      this.fetch(this.state.queries)
    }

    onStatus(val) {
      const queries = {
        ...this.state.queries,
        status: val || ''
      }

      this.setState({ queries })
      this.fetch(this.state.queries)
    }

    onPaginationChange(page) {
      const { limit, sortBy, sortDesc, search, blacklist, level, position, status, startDate } = this.state.queries
      this.fetch({ page, limit, sortBy, sortDesc, search, blacklist, level, position, status, startDate })
    }

    onDateRange(date) {
      const queries = {
        ...this.state.queries,
        startDate: formatDate(date)
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    async componentDidMount() {
      this.fetch(this.state.queries)
      await this.props.getCourseLevel()
      await this.props.getCommandMenu()
      await this.props.getCommandCoupon()
    }

    render() {
      return (
        <CouponSubmissionComponent
          {...this.state}
          {...this.props}
          onSearch={this.onSearch}
          onBlacklist={this.onBlacklist}
          onLevel={this.onLevel}
          onStatus={this.onStatus}
          rejectCouponSubmissionList={this.props.rejectCouponSubmissionList}
          approveCouponSubmission={this.props.approveCouponSubmission}
          onPaginationChange={this.onPaginationChange}
          onDateRange={this.onDateRange}
        />
      )
    }
  }
)