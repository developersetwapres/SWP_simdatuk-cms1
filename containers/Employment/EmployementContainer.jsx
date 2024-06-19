import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmploymentComponent from '@/components/Employment/EmploymentComponent'

export default connect(
  mapStateToProps('recapComposition', 'recapASN', 'recapNonASN', 'recapOutsource'),
  mapActions(
    'getCompositions',
    'getCompositionsCategories',
    'getASNRecap',
    'getASNRecapByCategory',
    'getNonASNRecap',
    'getNonASNRecapByCategory',
    'getOutsourceRecap',
    'getOutsourceRecapByCategory',
  )
)(
  class EmploymentContainer extends Component {
    static propTypes = {
      recapComposition: PropTypes.object,
      recapASN: PropTypes.object,
      recapNonASN: PropTypes.object,
      recapOutsource: PropTypes.object,
      getCompositions: PropTypes.func,
      getCompositionsCategories: PropTypes.func,
      getASNRecap: PropTypes.func,
      getASNRecapByCategory: PropTypes.func,
      getNonASNRecap: PropTypes.func,
      getNonASNRecapByCategory: PropTypes.func,
      getOutsourceRecap: PropTypes.func,
      getOutsourceRecapByCategory: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        recapData: {}
      }
      this.getRecapData = this.getRecapData.bind(this)
      this.setRender = this.setRender.bind(this)
      this.setRecapData = this.setRecapData.bind(this)
    }

    componentDidMount() { }

    setRecapData(data) {
      this.setState({ recapData: data })
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    getRecapData(pagePath) {
      if (pagePath?.includes('komposisi')) {
        this.props.getCompositions()
      } else if (pagePath?.includes('pegawai-asn')) {
        this.props.getASNRecap()
      } else if (pagePath?.includes('pegawai-non-asn')) {
        this.props.getNonASNRecap()
      } else if (pagePath?.includes('pegawai-outsourcing')) {
        this.props.getOutsourceRecap()
      }
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmploymentComponent
            {...this.state}
            {...this.props}
            getRecapData={this.getRecapData}
            setRender={this.setRender}
            setRecapData={this.setRecapData}
          />
        </Layout>
      )
    }
  }
)
