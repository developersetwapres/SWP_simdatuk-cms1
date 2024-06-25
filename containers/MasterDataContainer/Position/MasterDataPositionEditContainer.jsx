import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataPositionEditComponent from '@/components/MasterData/Position/MasterDataPositionEditComponent'

export default connect(
  mapStateToProps('echelon', 'position'),
  mapActions(
    'getEchelonsOptions',
    'getPositions',
    'getPosition',
    'updatePosition',
    'getPositionsOrders',
    'clearRoleState'
  )
)(
  class MasterDataPositionEditContainer extends Component {
    static propTypes = {
      echelon: PropTypes.object,
      position: PropTypes.object,
      getEchelonsOptions: PropTypes.func,
      getPositions: PropTypes.func,
      getPosition: PropTypes.func,
      updatePosition: PropTypes.func,
      getPositionsOrders: PropTypes.func,
      clearRoleState: PropTypes.func
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
      this.fetchHierarchy = this.fetchHierarchy.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getPositions({
        ...queries,
        filterParent: true,
        parentId: ''
      })
      this.props.getPositionsOrders({ id: null })
      this.props.getEchelonsOptions(queries)
    }

    fetchHierarchy(id) {
      this.props.getPositions({
        ...this.state.queries,
        filterParent: true,
        parentId: id
      })
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
          <MasterDataPositionEditComponent
            onLoading={this.setLoading}
            onFetchHierarchy={this.fetchHierarchy}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
