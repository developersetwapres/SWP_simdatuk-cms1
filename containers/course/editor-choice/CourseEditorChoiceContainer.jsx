import CourseEditorChoiceComponent from '@/components/course/editor-choice/CourseEditorChoiceComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import CourseEditorChoiceSkeleton from '@/components/course/editor-choice/CourseEditorChoiceSkeleton'

export default connect(
  mapStateToProps('editor',),
  mapActions('getEditorChocie', 'postEditorChoice', 'getListEditorChoice')
)(
  class CourseEditorChoiceContainer extends Component {
    static propTypes = {
      editor: PropTypes.object,
      getEditorChocie: PropTypes.func,
      postEditorChoice: PropTypes.func,
      getListEditorChoice: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        queries: {
          page: 1,
          limit: 1000,
          search: '',
          sort_by: '',
          sort_desc: '',
          status: true
        }
      }
    }

    componentDidMount() {
      this.props.getEditorChocie(this.state.queries)
      this.props.getListEditorChoice()
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
              <CourseEditorChoiceSkeleton />
            ) : (
              <CourseEditorChoiceComponent
                {...this.state}
                {...this.props}
                postEditorChoice={this.props.postEditorChoice}
              />
            )
          }
        </Layout>
      )
    }
  }
)