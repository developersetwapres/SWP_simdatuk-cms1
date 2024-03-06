import LoginContainer from '@/containers/simdatuk/auth/LoginContainer'
import React, { Component } from 'react'

export default class login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {
  //   const storage = getStorage('setneg_token')
  //   if (storage) {
  //     // Router.push('')
  //   }
  // }
  render() {
    return (
      <LoginContainer/>
    )
  }
}
