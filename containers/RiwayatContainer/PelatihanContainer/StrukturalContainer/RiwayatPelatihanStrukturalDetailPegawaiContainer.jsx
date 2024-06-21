import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'

export default connect(
  mapStateToProps('employee', 'institution', 'residence'),
  mapActions('getEmployee', 'getInstitutionsOptions', 'getResidences')
)(
  class RiwayatPelatihanStrukturalDetailPegawaiContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      residence: PropTypes.object,
      getEmployee: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      getResidences: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        }
      }
      this.setRender = this.setRender.bind(this)
      this.fetch = this.fetch.bind(this)
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    fetch(queries) {
      this.props.getInstitutionsOptions(queries)
      this.props.getResidences(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeDetailComponent
            setRender={this.setRender}
            {...this.props}
            {...this.state}
          />
        </Layout>
      )
    }
  }
)
