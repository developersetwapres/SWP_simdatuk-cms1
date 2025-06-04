import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import SubEmploymentComponent from '@/components/Employment/SubEmploymentComponent'

export default connect(
  mapStateToProps(
    'recapComposition',
    'recapASN',
    'recapNonASN',
    'recapOutsource'
  ),
  mapActions(
    'getCompositionsCategories',
    'getASNRecapByCategory',
    'getNonASNRecapByCategory',
    'getOutsourceRecapByCategory'
  )
)(
  class SubEmploymentContainer extends Component {
    static propTypes = {
      recapComposition: PropTypes.object,
      recapASN: PropTypes.object,
      recapNonASN: PropTypes.object,
      recapOutsource: PropTypes.object,
      getCompositionsCategories: PropTypes.func,
      getASNRecapByCategory: PropTypes.func,
      getNonASNRecapByCategory: PropTypes.func,
      getOutsourceRecapByCategory: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true
      }
      this.setRender = this.setRender.bind(this)
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <SubEmploymentComponent
            {...this.state}
            {...this.props}
            setRender={this.setRender}
          />
        </Layout>
      )
    }
  }
)
