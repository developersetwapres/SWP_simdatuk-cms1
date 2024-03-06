import CouponCreateSpreadsheetComponent from '@/components/coupon/create/spreadsheet/CouponCreateSpreadsheetComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/index'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import SpreadSheetSkeleton from '@/components/shared/skeleton/SpreadSheetSkeleton'

export default connect(
  mapStateToProps('exportExcel', 'importExcel'),
  mapActions('exportExcelCoupon', 'importExcelCoupon')
)(

  class CouponCreateSpreadsheetContainer extends Component {
    static propTypes = {
      exportExcel: PropTypes.object,
      importExcel: PropTypes.object,
      importExcelCoupon: PropTypes.func,
      exportExcelCoupon: PropTypes.func
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
          {
            this.state.willRender === false ? (
              <SpreadSheetSkeleton />
            ) : (
              <CouponCreateSpreadsheetComponent
                {...this.state}
                {...this.props}
                exportExcelCoupon={this.props.exportExcelCoupon}
                importExcelCoupon={this.props.importExcelCoupon}
              />
            )
          }
        </Layout>
      )
    }
  }
)