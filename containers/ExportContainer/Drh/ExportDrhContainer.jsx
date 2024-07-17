import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import ExportDrhComponent from '@/components/ExportComponent/Drh/ExportDrhComponent'

export default connect(
  mapStateToProps(
    'exportDRHData',
    'echelon',
    'grade'
  ),
  mapActions(
    'exportDRH',
    'getEchelonsOptions',
    'getGradesOptions',
    'clearExportDrhState',
  )
)(
  class ExportDrhContainer extends Component {
    static propTypes = {
      echelon: PropTypes.object,
      grade: PropTypes.object,
      exportDRHData: PropTypes.object,
      getEchelonsOptions: PropTypes.func,
      getGradesOptions: PropTypes.func,
      exportDRH: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getEchelonsOptions(queries)
      this.props.getGradesOptions(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <ExportDrhComponent
            {...this.state}
            {...this.props}
            onLoading={this.setLoading}
          />
        </Layout>
      )
    }
  }
)
