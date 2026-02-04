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
      
      const decodedIds = employeesIds?.map(item => {
        const parsedId = parseInt(item)
        if (!isNaN(parsedId)) {
          return parsedId
        }
        
        console.warn('Invalid storage format - expected numeric ID, got:', item)
        return null
      }).filter(id => id !== null)
      
      if (decodedIds.length === 0 && employeesIds.length > 0) {
        console.warn('Storage contains invalid data format. Please reselect employees.')
        localStorage.removeItem('dataPegawaiPromosi')
      }
      
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
