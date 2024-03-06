import React, { Component } from 'react'
import UserCreateComponent from '@/components/users/create/UserCreateComponent'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import UserSkeleton from '@/components/users/UserSkeleton'

export default connect(
  mapStateToProps('user', 'command'),
  mapActions(
    'postUsers',
    'getCommandRoles',
    'getCommandUserLevel',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandCategoryTopic'
  )
)(
  class UserCreateContainer extends Component {
    static propTypes = {
      user: PropTypes.object,
      command: PropTypes.object,
      getCommandRoles: PropTypes.func,
      getCommandUserLevel: PropTypes.func,
      getCommandUserPosition: PropTypes.func,
      getCommandUserUnit: PropTypes.func,
      getCommandCategoryTopic: PropTypes.func,
      postUsers: PropTypes.func
    }
    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    async componentDidMount() {
      await this.props.getCommandRoles()
      await this.props.getCommandUserLevel()
      await this.props.getCommandUserPosition()
      await this.props.getCommandUserUnit()
      await this.props.getCommandCategoryTopic()
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
              <UserSkeleton />
            ) : (
              <UserCreateComponent
                {...this.state}
                {...this.props}
                createUser={this.props.postUsers}
              />
            )
          }
        </Layout>
      )
    }
  }
)