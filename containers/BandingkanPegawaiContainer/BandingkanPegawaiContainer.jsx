import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import BandingkanPegawaiComponent from '@/components/BandingkanPegawai/BandingkanPegawaiComponent'

export default connect(
  mapStateToProps(
    'promotions',
    'employee',
    'echelon',
    'disciplinary',
    'grade',
    'group'
  ),
  mapActions(
    'getBriefEmployees',
    'getEmployees',
    'getEchelonsOptions',
    'getDisciplinariesOptions',
    'getGradesOptions',
    'getGroups'
  )
)(
  class BandingkanPegawaiContainer extends Component {
    static propTypes = {
      router: PropTypes.object,
      promotions: PropTypes.object,
      employee: PropTypes.object,
      echelon: PropTypes.object,
      grade: PropTypes.object,
      group: PropTypes.object,
      disciplinary: PropTypes.object,
      getEmployees: PropTypes.func,
      getBriefEmployees: PropTypes.func,
      getEchelonsOptions: PropTypes.func,
      getDisciplinariesOptions: PropTypes.func,
      getGradesOptions: PropTypes.func,
      getGroups: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        filters: {
          group_id: '',
          echelon_id: '',
          grade_id: '',
          education_level: '',
          max_age: '',
          disciplinary_id: '',
          cpns_year: '',
          greade_year: '',
          credit_score: '',
          competency_point: ''
        },
        queries: {
          page: 1,
          limit: 10,
          search: ''
        },
        allDataQuery: {
          page: 1,
          limit: 999999,
          search: ''
        },
        dataFromStorage: []
      }
      this.fetch = this.fetch.bind(this)
      this.fetchMasterData = this.fetchMasterData.bind(this)
      this.fetchStorage = this.fetchStorage.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onFilter = this.onFilter.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.initData = this.initData.bind(this)
    }

    fetch(queries) {
      this.props.getBriefEmployees(queries)
    }

    fetchStorage(isPromotion) {
      const key = isPromotion ? 'dataPegawaiPromosi' : 'dataPegawai'
      const storedData = localStorage.getItem(key)
      const retrievedArray = storedData ? JSON.parse(storedData) : []

      this.setState({
        dataFromStorage: retrievedArray?.map(id => parseInt(atob(id)))
      })
    }

    fetchMasterData(queries) {
      this.props.getEchelonsOptions(queries)
      this.props.getDisciplinariesOptions(queries)
      this.props.getGradesOptions(queries)
      this.props.getGroups(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page
      }
      this.setState({ queries })
      this.fetch({ ...queries, data: this.state.filters })
    }

    onRowsPerPageChange(limit) {
      const queries = {
        ...this.state.queries,
        page: 1,
        limit
      }
      this.setState({ queries })
      this.fetch({ ...queries, data: this.state.filters })
    }

    onSearch(value) {
      const queries = {
        ...this.state.queries,
        search: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch({ ...queries, data: this.state.filters })
    }

    onFilter(filters) {
      const queries = {
        ...this.state.queries,
        filters
      }
      this.setState({ queries })
      this.fetch({ ...queries, data: filters })
    }

    onClearState() {
      const queries = {
        ...this.state.queries,
        search: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch({ ...queries, data: this.state.filters })
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    initData(isPromotion) {
      this.fetchStorage(isPromotion)
      this.fetch({ ...this.state.queries, data: this.state.filters })
      this.fetchMasterData(this.state.allDataQuery)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <BandingkanPegawaiComponent
            {...this.state}
            {...this.props}
            onSearch={this.onSearch}
            onFilter={this.onFilter}
            onLoading={this.setLoading}
            onPaginationChange={this.onPaginationChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
            initData={this.initData}
          />
        </Layout>
      )
    }
  }
)
