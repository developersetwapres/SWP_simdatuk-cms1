import CouponComponent from '@/components/coupon/CouponComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import { format } from 'date-fns'

export default connect(
  mapStateToProps('coupon', 'command'),
  mapActions('getCoupon', 'deleteCouponList', 'getCommandOrganizer')
)(
  class CouponContainer extends Component {
    static propTypes = {
      coupon: PropTypes.object,
      command: PropTypes.object,
      getCoupon: PropTypes.func,
      deleteCouponList: PropTypes.func,
      getCommandOrganizer: PropTypes.func
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
          providerId: '',
          startDate: '',
          endDate: '',
          status: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onProvider = this.onProvider.bind(this)
      this.onDateRange = this.onDateRange.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.onStatus = this.onStatus.bind(this)
    }

    fetch(queries) {
      this.props.getCoupon(queries)
    }

    onSearch(value) {
      const queries = {
        ...this.state.queries,
        search: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onProvider(val) {
      const queries = {
        ...this.state.queries,
        providerId: val || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onDateRange(date) {
      const startHour = new Date(date[0])
      const endHour = new Date(date[1]).setHours(23, 59, 59, 999)
      const queries = {
        ...this.state.queries,
        startDate: format(startHour, 'yyyy-MM-dd HH:mm:ss'),
        endDate: format(endHour, 'yyyy-MM-dd HH:mm:ss'),
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)

    }

    onStatus(val) {
      const queries = {
        ...this.state.queries,
        status: val,
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
      this.props.getCommandOrganizer()
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 5000)
    }

    onClearState() {
      const queries = {
        ...this.state,
        startDate: '',
        endDate: '',
        search: '',
        providerId: '',
        status: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }


    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <CouponComponent
            {...this.props}
            {...this.state}
            onSearch={this.onSearch}
            onPaginationChange={this.onPaginationChange}
            deleteCouponList={this.props.deleteCouponList}
            onProvider={this.onProvider}
            onDateRange={this.onDateRange}
            onClearState={this.onClearState}
            onStatus={this.onStatus}
          />
        </Layout>
      )
    }
  }
)