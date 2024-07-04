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
    'notes'
  ),
  mapActions(
    'exportComparison',
    'clearExportComparisonState',
    'getEmployee',
    'getNotesByUserID',
    'updateNotesByUserID'
  )
)(
  class BandingkanDataPegawaiContainer extends Component {
    static propTypes = {
      exportComparisonStore: PropTypes.object,
      employee: PropTypes.object,
      notes: PropTypes.object,
      getEmployee: PropTypes.func,
      exportComparison: PropTypes.func,
      clearExportComparisonState: PropTypes.func,
      getNotesByUserID: PropTypes.func,
      updateNotesByUserID: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        employeesDetails: []
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.getEmployeesFromStorage = this.getEmployeesFromStorage.bind(this)
    }

    getEmployeesFromStorage() {
      const storedData = localStorage.getItem('dataPegawai')
      return storedData ? JSON.parse(storedData) : []
    }

    fetch() {
      this.getEmployeesFromStorage()?.forEach((item) => {
        this.props.getEmployee(item?.id)
      })
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch()
    }

    componentDidUpdate(prevProps) {
      const employee = this.props?.employee

      if (employee !== prevProps.employee) {
        const hasItem = this.state.employeesDetails
          ?.filter(i => i?.id == employee?.detail?.id)
          ?.length > 0
        const availableInStorage = this.getEmployeesFromStorage()
          ?.filter(e => e?.id == employee?.detail?.id)
          ?.length > 0

        if (employee?.detail?.id && !hasItem && availableInStorage) {
          this.setState({
            employeesDetails: [
              ...this.state.employeesDetails,
              employee?.detail
            ]
          })
        }
      }
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
