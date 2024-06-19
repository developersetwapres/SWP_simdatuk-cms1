import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import SubEmploymentComponent from '@/components/Employment/SubEmploymentComponent'

export default connect(
  mapStateToProps('recapComposition', 'recapASN', 'recapNonASN', 'recapOutsource'),
  mapActions(
    'getCompositionsCategories',
    'getASNRecapByCategory',
    'getNonASNRecapByCategory',
    'getOutsourceRecapByCategory',
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
        willRender: true,
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

    getRecapData(router) {
      const pagePath = router.asPath
      const query = window.atob(router.query?.subEmployment)

      if (pagePath?.includes('komposisi')) {
        this.props.getCompositionsCategories(query)
      } else if (pagePath?.includes('pegawai-asn')) {
        this.props.getASNRecapByCategory(query)
      } else if (pagePath?.includes('pegawai-non-asn')) {
        // this.props.getNonASNRecapByCategory(query)
        router.replace(`${router.asPath}/pegawai`)
      } else if (pagePath?.includes('pegawai-outsourcing')) {
        // this.props.getOutsourceRecapByCategory(query)
        router.replace(`${router.asPath}/pegawai`)
      }
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <SubEmploymentComponent
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
