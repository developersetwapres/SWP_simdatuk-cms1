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
        willRender: true
      }
      this.fetch = this.fetch.bind(this)
    }

    fetch(router) {
      const id = router?.query?.id

      if (id) {
        const ids = atob(id)?.split('-')
        const echelonId = ids[1]
        const positionId = ids[0]
        this.props.getUnoccupiedPositionsDetail({
          echelon_id: echelonId,
          position_id: positionId
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
