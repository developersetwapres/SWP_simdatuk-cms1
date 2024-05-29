import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataUserEditComponent from '@/components/MasterData/User/MasterDataUserEditComponent'

export default connect(
  mapStateToProps('role', 'employee', 'user'),
  mapActions(
    'getRoles',
    'getEmployees',
    'getUser',
    'updateUser',
    'clearUserState'
  )
)(
  class MasterDataUserEditContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      employee: PropTypes.object,
      user: PropTypes.object,
      getRoles: PropTypes.func,
      getEmployees: PropTypes.func,
      getUser: PropTypes.func,
      updateUser: PropTypes.func,
      clearUserState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queriesRole: {
          page: 1,
          limit: '',
          search: ''
        },
        queriesEmployee: {
          page: 1,
          limit: 1000,
          search: ''
        },
        willRender: false
      }
      this.fetchRole = this.fetchRole.bind(this)
      this.fetchEmployee = this.fetchEmployee.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetchRole(queries) {
      this.props.getRoles(queries)
    }

    fetchEmployee(queries) {
      this.props.getEmployees(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetchRole(this.state.queriesRole)
      this.fetchEmployee(this.state.queriesEmployee)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataUserEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
