import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataEmployementTypeAddComponent from '@/components/MasterData/EmployementType/MasterDataEmployementTypeAddComponent'

export default connect(
  mapStateToProps('employmentType'),
  mapActions('postEmploymentType')
)(
  class MasterDataEmployementTypeAddContainer extends Component {
    static propTypes = {
      employmentType: PropTypes.object,
      postEmploymentType: PropTypes.func
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
          <MasterDataEmployementTypeAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
