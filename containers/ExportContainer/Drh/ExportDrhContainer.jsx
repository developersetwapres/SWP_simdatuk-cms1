import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import ExportDrhComponent from '@/components/ExportComponent/Drh/ExportDrhComponent'

export default connect(
  mapStateToProps('exportDRH', 'echelon', 'grade', 'position'),
  mapActions(
    'exportDRH',
    'getEchelonsOptions',
    'getGradesOptions',
    'getPositions'
  )
)(
  class ExportDrhContainer extends Component {
    static propTypes = {
      echelon: PropTypes.object,
      grade: PropTypes.object,
      position: PropTypes.object,
      exportDRH: PropTypes.object,
      getPositions: PropTypes.func,
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
      this.props.getPositions({ ...queries, filterParent: false, parentId: '' })
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
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
