import React, { Component } from 'react'
import PositionsComponent from '@/components/PromosiPegawai/PositionsComponent'
import Layout from '@/components/core/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store'

export default connect(
  mapStateToProps('promotions'),
  mapActions('getUnoccupiedPositionsDetail')
)(
  class PositionsContainer extends Component {
    static propTypes = {
      promotions: PropTypes.object,
      getUnoccupiedPositionsDetail: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true,
        positionInfo: {}
      }
      this.fetch = this.fetch.bind(this)
    }

    fetch(router) {
      const id = router?.query?.id

      if (id) {
        const ids = atob(id)?.split('-')
        const positionId = ids[0]
        const echelonId = ids[1]
        const name = ids[2] || '-'
        const total = ids[3] || '0'

        this.setState({
          ...this.state,
          positionInfo: {
            name,
            total
          }
        }, () => {
          this.props.getUnoccupiedPositionsDetail({
            echelon_id: echelonId,
            position_id: positionId
          })
        })
      }
    }

    setLoading = (val) => {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <PositionsComponent
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
            fetch={this.fetch}
          />
        </Layout>
      )
    }
  }
)
