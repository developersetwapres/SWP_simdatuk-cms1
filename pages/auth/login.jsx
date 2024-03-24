import LoginContainer from '@/containers/Auth/LoginContainer'
import React, { Component } from 'react'
import { getStorage } from '@/utils/storage'
import Router from 'next/router'

export default class login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const storage = getStorage('setneg_token')
    if (storage) {
      Router.push('/manajemen-pengguna/pengguna')
    }
  }

  render() {
    return (
      <LoginContainer
        {...this.state}
        {...this.props}
      />
    )
  }
}