import React, { Component } from 'react'
import { Box } from '@mui/material'
import ExportRiwayatHidup from '@/components/export/riwayat-hidup/ExportRiwayatHidupComponent'

class ExportRiwayatHidupContainer extends Component {
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
        <ExportRiwayatHidup />
      </Box>
    )
  }
}

export default ExportRiwayatHidupContainer
