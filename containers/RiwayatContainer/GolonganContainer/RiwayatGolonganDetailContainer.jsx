import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatGolonganDetailComponent from '@/components/Riwayat/Golongan/RiwayatGolonganDetailComponent'

export default connect(
  mapStateToProps('grade'),
  mapActions('getGrade', 'clearGradeState')
)(
  class RiwayatGolonganDetailContainer extends Component {
    static propTypes = {
      grade: PropTypes.object,
      getGrade: PropTypes.func,
      clearGradeState: PropTypes.func
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
          <RiwayatGolonganDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
