import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmploymentComponent from '@/components/Employment/EmploymentComponent'

export default connect(
  mapStateToProps(
    'recapComposition',
    'recapASN',
    'recapNonASN',
    'recapOutsource',
    'exportRecapData'
  ),
  mapActions(
    'getCompositions',
    'getCompositionsCategories',
    'getASNRecap',
    'getASNRecapByCategory',
    'getNonASNRecap',
    'getNonASNRecapByCategory',
    'getOutsourceRecap',
    'getOutsourceRecapByCategory',
    'exportRecap'
  )
)(
  class EmploymentContainer extends Component {
    static propTypes = {
      recapComposition: PropTypes.object,
      recapASN: PropTypes.object,
      recapNonASN: PropTypes.object,
      recapOutsource: PropTypes.object,
      exportRecapData: PropTypes.object,
      getCompositions: PropTypes.func,
      getCompositionsCategories: PropTypes.func,
      getASNRecap: PropTypes.func,
      getASNRecapByCategory: PropTypes.func,
      getNonASNRecap: PropTypes.func,
      getNonASNRecapByCategory: PropTypes.func,
      getOutsourceRecap: PropTypes.func,
      getOutsourceRecapByCategory: PropTypes.func,
      exportRecap: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        recapData: {}
      }
      this.setRender = this.setRender.bind(this)
      this.setRecapData = this.setRecapData.bind(this)
    }

    componentDidMount() {}

    setRecapData(data) {
      this.setState({ recapData: data })
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmploymentComponent
            {...this.state}
            {...this.props}
            setRender={this.setRender}
            setRecapData={this.setRecapData}
          />
        </Layout>
      )
    }
  }
)
