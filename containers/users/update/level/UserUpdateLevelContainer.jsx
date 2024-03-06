import UserUpdateLevelComponent from '@/components/users/update/level/UserUpdateLevelComponent'
import React, { Component } from 'react'
import { mapStateToProps, mapActions } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import SpreadSheetSkeleton from '@/components/shared/skeleton/SpreadSheetSkeleton'

export default connect(
  mapStateToProps('importExcel', 'exportExcel'),
  mapActions('importExcelUserLevel', 'exportExcelUserLevel')
)(
  class UserUpdateLevelContainer extends Component {
    static propTypes = {
      importExcel: PropTypes.object,
      exportExcel: PropTypes.object,
      exportExcelUserLevel: PropTypes.func,
      importExcelUserLevel: PropTypes.func
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
              <UserUpdateLevelComponent
                {...this.state}
                {...this.props}
                importExcelUserLevel={this.props.importExcelUserLevel}
                exportExcelUserLevel={this.props.exportExcelUserLevel}
              />
            )
          }
        </Layout>
      )
    }
  }
)

