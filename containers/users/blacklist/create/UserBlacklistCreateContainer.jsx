import UserBlacklistCreateComponent from '@/components/users/blacklist/create/UserBlacklistCreateComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/index'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import SpreadSheetSkeleton from '@/components/shared/skeleton/SpreadSheetSkeleton'

export default connect(
  mapStateToProps('importExcel', 'exportExcel'),
  mapActions('importExcelUserBlacklist', 'exportExcelUserBlacklist')
)(
  class UserBlacklistCreateContainer extends Component {
    static propTypes = {
      importExcel: PropTypes.object,
      exportExcel: PropTypes.object,
      exportExcelUserBlacklist: PropTypes.func,
      importExcelUserBlacklist: PropTypes.func
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
              <UserBlacklistCreateComponent
                {...this.state}
                {...this.props}
                importExcelUserBlacklist={this.props.importExcelUserBlacklist}
                exportExcelUserBlacklist={this.props.exportExcelUserBlacklist}
              />
            )
          }
        </Layout>
      )
    }
  }
)
