import OrganizerCreateComponent from '@/components/organizer/create/OrganizerCreateComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import OrganizerSkeleton from '@/components/organizer/OrganizerSkeleton'

export default connect(
  mapStateToProps('provider'),
  mapActions('postProvider')
)(
  class OrganizerCreateContainer extends Component {
    static propTypes = {
      provider: PropTypes.object,
      postProvider: PropTypes.func
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
              <OrganizerSkeleton />
            ) : (
              <OrganizerCreateComponent
                {...this.state}
                {...this.props}
                postProvider={this.props.postProvider}
              />
            )
          }
        </Layout>
      )
    }
  }
)
