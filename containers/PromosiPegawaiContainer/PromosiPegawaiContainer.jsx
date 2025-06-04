import React, { Component } from 'react'
import PromosiPegawaiComponent from '@/components/PromosiPegawai/PromosiPegawaiComponent'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store'

export default connect(
  mapStateToProps('promotions'),
  mapActions('getUnoccupiedPositions')
)(
  class PromosiPegawaiContainer extends Component {
    static propTypes = {
      promotions: PropTypes.object,
      getUnoccupiedPositions: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true
      }
    }

    componentDidMount() {
      this.props.getUnoccupiedPositions()
    }

    setLoading = (val) => {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <PromosiPegawaiComponent
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
          />
        </Layout>
      )
    }
  }
)
