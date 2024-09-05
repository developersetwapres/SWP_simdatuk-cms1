import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatHukumanDisiplinDetailComponent from '@/components/Riwayat/HukumanDisiplin/RiwayatHukumanDisiplinDetailComponent'

export default connect(
  mapStateToProps('disciplinary'),
  mapActions('getDisciplinary', 'clearDisciplinaryState', 'deleteDisciplinary')
)(
  class RiwayatHukumanDisiplinDetailContainer extends Component {
    static propTypes = {
      disciplinary: PropTypes.object,
      getDisciplinary: PropTypes.func,
      deleteDisciplinary: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.setLoading = this.setLoading.bind(this)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <RiwayatHukumanDisiplinDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
