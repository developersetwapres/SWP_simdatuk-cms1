import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataPositionAddComponent from '@/components/MasterData/Position/MasterDataPositionAddComponent'

export default connect(
  mapStateToProps('echelon', 'position'),
  mapActions(
    'getEchelonsOptions',
    'getPositions',
    'postPosition',
    'getPositionsOrders'
  )
)(
  class MasterDataPositionAddContainer extends Component {
    static propTypes = {
      echelon: PropTypes.object,
      position: PropTypes.object,
      getEchelonsOptions: PropTypes.func,
      getPositions: PropTypes.func,
      postPosition: PropTypes.func,
      getPositionsOrders: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: '',
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchHierarchy = this.fetchHierarchy.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getPositionsOrders({ id: null })
      this.props.getEchelonsOptions(queries)
    }

    fetchHierarchy(id, type) {
      this.props.getPositions({
        ...this.state.queries,
        filterParent: true,
        parentId: id,
        type: type
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
          <MasterDataPositionAddComponent
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
