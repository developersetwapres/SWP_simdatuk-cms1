import React, { Component } from 'react'
import { Box } from '@mui/material'
import ExportComponent from '@/components/ExportComponent/Rekapitulasi/ExportRekapitulasiComponent'

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
    }, 2000)
  }


  render() {
    return (
      <Box
        willRender={this.state.willRender}
      >
        <ExportComponent />
      </Box>
    )
  }
}

export default ExportRekapitulasiContainer
