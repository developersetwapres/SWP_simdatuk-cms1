import UserRoleCreateComponent from '@/components/users/role/create/UserRoleCreateComponent'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import UserRoleSkeleton from '@/components/users/role/UserRoleSkeleton'

export default connect(
  mapStateToProps('role', 'command'),
  mapActions('postRole', 'getCommandMenu')
)(
  class UserRoleCreateContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      command: PropTypes.object,
      getCommandMenu: PropTypes.func,
      postRole: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      this.props.getCommandMenu()
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
              <UserRoleSkeleton />
            ) : (
              <UserRoleCreateComponent
                {...this.state}
                {...this.props}
                postRole={this.props.postRole}
              />
            )
          }
        </Layout>
      )
    }
  }
)
