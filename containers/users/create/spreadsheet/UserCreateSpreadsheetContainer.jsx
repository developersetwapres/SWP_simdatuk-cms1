import UserCreateSpreadsheetComponent from '@/components/users/create/spreadsheet/UserCreateSpreadsheetComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/index'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import SpreadSheetSkeleton from '@/components/shared/skeleton/SpreadSheetSkeleton'

export default connect(
  mapStateToProps('importExcel', 'exportExcel'),
  mapActions('importExcelUser', 'exportExcelUser')
)(
  class UserCreateSpreadsheetContainer extends Component {
    static propTypes = {
      importExcel: PropTypes.object,
      exportExcel: PropTypes.object,
      exportExcelUser: PropTypes.func,
      importExcelUser: PropTypes.func
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
              <UserCreateSpreadsheetComponent
                {...this.state}
                {...this.props}
                importExcelUser={this.props.importExcelUser}
                exportExcelUser={this.props.exportExcelUser}
              />
            )
          }
        </Layout>
      )
    }
  }
)

