import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import PetaJabatanComponent from '@/components/PetaJabatan/PetaJabatanComponent'

export default connect(
  mapStateToProps('diagram', 'exportDiagram'),
  mapActions('getDiagrams', 'exportDiagrams')
)(
  class PetaJabatanContainer extends Component {
    static propTypes = {
      diagram: PropTypes.object,
      exportDiagram: PropTypes.object,
      exportDiagrams: PropTypes.func,
      getDiagrams: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
    }

    fetch(id) {
      this.props.getDiagrams(id)
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 2000)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <PetaJabatanComponent
            onFetch={this.fetch}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
