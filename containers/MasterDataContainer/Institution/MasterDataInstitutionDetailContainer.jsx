import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataInstitutionDetailComponent from '@/components/MasterData/Institution/MasterDataInstitutionDetailComponent'

export default connect(
  mapStateToProps('institution'),
  mapActions(
    'getInstitution',
    'deleteInstitution',
    'getInstitutionsOptions',
    'clearInstitutionState'
  )
)(
  class MasterDataInstitutionDetailContainer extends Component {
    static propTypes = {
      institution: PropTypes.object,
      getInstitution: PropTypes.func,
      deleteInstitution: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      clearInstitutionState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
        willRender: false
      }
      this.fetchOptions = this.fetchOptions.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetchOptions(queries) {
      this.props.getInstitutionsOptions(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetchOptions(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataInstitutionDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
