import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataEmployementTypeDetailComponent from '@/components/MasterData/EmployementType/MasterDataEmployementTypeDetailComponent'

export default connect(
  mapStateToProps('employmentType'),
  mapActions(
    'getEmploymentType',
    'deleteEmploymentType',
    'clearEmploymentTypeState'
  )
)(
  class MasterDataEmployementTypeDetailContainer extends Component {
    static propTypes = {
      employmentType: PropTypes.object,
      getEmploymentType: PropTypes.func,
      deleteEmploymentType: PropTypes.func,
      clearEmploymentTypeState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.setLoading = this.setLoading.bind(this)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataEmployementTypeDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
