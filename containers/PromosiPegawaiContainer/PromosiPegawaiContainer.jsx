import React, { Component } from 'react'
import PromosiPegawaiComponent from '@/components/PromosiPegawai/PromosiPegawaiComponent'
import Layout from '@/components/core/Layout'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '@/store'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class PromosiPegawaiContainer extends Component {
    static propTypes = {}

    constructor(props) {
      super(props)
      this.state = {
        willRender: true
      }
    }

    componentDidMount() { }

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
