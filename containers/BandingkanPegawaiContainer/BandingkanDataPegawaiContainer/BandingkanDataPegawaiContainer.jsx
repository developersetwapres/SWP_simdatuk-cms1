import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import BandingkanDataPegawai from '@/components/BandingkanPegawai/DataPegawai/BandingkanDataPegawai'

export default connect(
  mapStateToProps(
    'exportComparisonStore',
    'employee',
    'notes',
    'promotions',
  ),
  mapActions(
    'exportComparison',
    'clearExportComparisonState',
    'getEmployee',
    'getEmployeesCompare',
    'getNotesByUserID',
    'updateNotesByUserID'
  )
)(
  class BandingkanDataPegawaiContainer extends Component {
    static propTypes = {
      exportComparisonStore: PropTypes.object,
      promotions: PropTypes.object,
      employee: PropTypes.object,
      notes: PropTypes.object,
      getEmployee: PropTypes.func,
      exportComparison: PropTypes.func,
      clearExportComparisonState: PropTypes.func,
      getNotesByUserID: PropTypes.func,
      updateNotesByUserID: PropTypes.func,
      getEmployeesCompare: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.getEmployeesFromStorage = this.getEmployeesFromStorage.bind(this)
    }

    getEmployeesFromStorage() {
      const storedData = localStorage.getItem('dataPegawai')
      const employeesIds = storedData ? JSON.parse(storedData) : []
      const decodedIds = employeesIds?.map(id => parseInt(atob(id)))
      return decodedIds
    }

    fetch() {
      const ids = this.getEmployeesFromStorage()
      this.props.getEmployeesCompare({ user_id: ids })
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch()
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <BandingkanDataPegawai
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
          />
        </Layout>
      )
    }
  }
)
