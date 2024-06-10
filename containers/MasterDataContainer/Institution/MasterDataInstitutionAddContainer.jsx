import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataInstitutionAddComponent from '@/components/MasterData/Institution/MasterDataInstitutionAddComponent'

export default connect(
  mapStateToProps('institution'),
  mapActions('postInstitution')
)(
  class MasterDataInstitutionAddContainer extends Component {
    static propTypes = {
      institution: PropTypes.object,
      postInstitution: PropTypes.func
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
          <MasterDataInstitutionAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
