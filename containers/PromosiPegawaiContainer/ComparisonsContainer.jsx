import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ComparisonsComponent from '@/components/PromosiPegawai/ComparisonsComponent'
import Layout from '@/components/core/Layout'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store'

export default connect(
  mapStateToProps(
    'promotions',
    'exportPromotionData'
  ),
  mapActions(
    'getEmployeesPromotion',
    'exportPromotionUsers',
    'clearExportPromotionState'
  )
)(
  class ComparisonsContainer extends Component {
    static propTypes = {
      promotions: PropTypes.object,
      exportPromotionData: PropTypes.object,
      getEmployeesPromotion: PropTypes.func,
      exportPromotionUsers: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.getEmployeesFromStorage = this.getEmployeesFromStorage.bind(this)
    }

    getEmployeesFromStorage() {
      const storedData = localStorage.getItem('dataPegawaiPromosi')
      const employeesIds = storedData ? JSON.parse(storedData) : []
      const decodedIds = employeesIds?.map(id => parseInt(atob(id)))
      return decodedIds
    }

    fetch() {
      const ids = this.getEmployeesFromStorage()
      this.props.getEmployeesPromotion({ user_id: ids })
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
          <ComparisonsComponent
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
          />
        </Layout>
      )
    }
  }
)
