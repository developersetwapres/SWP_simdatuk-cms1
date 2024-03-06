import CourseOrganizerComponent from '@/components/course/organizer/CourseOrganizerComponent'
import React, { Component } from 'react'
import { mapStateToProps } from '@/store/'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import CourseOrganizerSkeleton from '@/components/course/organizer/CourseOrganizerSkeleton'

export default connect(
  mapStateToProps('providerCourse'),
  mapActions('getUpdateProvider', 'updateBulkProvider')
)(
  class CourseOrganizerContainer extends Component {
    static propTypes = {
      providerCourse: PropTypes.object,
      getUpdateProvider: PropTypes.func,
      updateBulkProvider: PropTypes.func
    }

    static propTypes = {
      course: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      this.props.getUpdateProvider()
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
              <CourseOrganizerSkeleton />
            ) : (
              <CourseOrganizerComponent
                {...this.state}
                {...this.props}
                updateBulkProvider={this.props.updateBulkProvider}
              />
            )
          }
        </Layout>
      )
    }
  }
)