import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import BandingkanDataPegawai from '@/components/BandingkanPegawai/DataPegawai/BandingkanDataPegawai'
import { shortUuidToId } from '@/utils'

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
    'getEmployeesPromotion',
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
      getEmployeesCompare: PropTypes.func,
      getEmployeesPromotion: PropTypes.func
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

    getEmployeesFromStorage(isPromotion) {
      const storedData = localStorage.getItem(
        isPromotion ? 'dataPegawaiPromosi' : 'dataPegawai'
      )
      const employeesIds = storedData ? JSON.parse(storedData) : []
      // Data di localStorage sekarang berupa ID numeric, tidak perlu decode
      const decodedIds = employeesIds?.map(id => {
        const parsedId = parseInt(id)
        if (!isNaN(parsedId)) {
          return parsedId
        }
        console.warn('Invalid storage format - expected numeric ID, got:', id)
        return null
      }).filter(id => id !== null)
      return decodedIds
    }

    fetch(router) {
      const isPromotion = router?.asPath?.includes('/promosi-pegawai')
      const ids = this.getEmployeesFromStorage(isPromotion)

      if (isPromotion) {
        this.props.getEmployeesPromotion({ user_id: ids })
      } else {
        this.props.getEmployeesCompare({ user_id: ids })
      }
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <BandingkanDataPegawai
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
            fetch={this.fetch}
            getEmployeesFromStorage={this.getEmployeesFromStorage}
          />
        </Layout>
      )
    }
  }
)
