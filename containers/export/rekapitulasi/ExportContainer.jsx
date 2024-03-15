import React, { Component } from 'react'
import { Box } from '@mui/material'
import ExportRekapitulasiComponent from '@/components/export/rekapitulasi/ExportRekapitulasiComponent'

class ExportRekapitulasiContainer extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      willRender: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        willRender: true
      })
    }, 5000)
  }


  render() {
    return (
      <Box
        willRender={this.state.willRender}
      >
        <ExportRekapitulasiComponent />
      </Box>
    )
  }
}

export default ExportRekapitulasiContainer
