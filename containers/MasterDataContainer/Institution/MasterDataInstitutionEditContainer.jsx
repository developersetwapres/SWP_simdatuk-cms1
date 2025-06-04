import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataInstitutionEditComponent from '@/components/MasterData/Institution/MasterDataInstitutionEditComponent'

export default connect(
  mapStateToProps('institution'),
  mapActions('getInstitution', 'updateInstitution', 'clearInstitutionState')
)(
  class MasterDataInstitutionEditContainer extends Component {
    static propTypes = {
      institution: PropTypes.object,
      getInstitution: PropTypes.func,
      updateInstitution: PropTypes.func,
      clearInstitutionState: PropTypes.func
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
          <MasterDataInstitutionEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
