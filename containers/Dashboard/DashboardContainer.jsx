import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import DashboardComponent from '@/components/Dashboard/DashboardComponent'

export default connect(
  mapStateToProps('dashboardReducer'),
  mapActions('getSummaries')
)(
  class DashboardContainer extends Component {
    static propTypes = {
      props: PropTypes.any,
      getSummaries: PropTypes.func,
      dashboardReducer: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        month: 1,
        datas: {
          educational_employees: [],
          gender_employees: {},
          total_government_employees: {},
          total_non_government_employees: {},
          users: [],
          work_unit: []
        }
      }
      this.setRender = this.setRender.bind(this)
      this.getCurrentMonth = this.getCurrentMonth.bind(this)
      this.handleChangeMonth = this.handleChangeMonth.bind(this)
      this.setDatas = this.setDatas.bind(this)
    }

    setDatas(datas) {
      this.setState({ datas: { ...datas } })
    }

    getCurrentMonth() {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      return currentMonth + 1
    }

    handleChangeMonth(month) {
      this.setState({ month }, () => {
        this.props.getSummaries({ month })
      })
    }

    componentDidMount() {
      this.setState({ month: this.getCurrentMonth() }, () => {
        this.props.getSummaries({ month: this.getCurrentMonth() })
      })
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <DashboardComponent
            {...this.state}
            {...this.props}
            handleChangeMonth={this.handleChangeMonth}
            setDatas={this.setDatas}
            setRender={this.setRender}
          />
        </Layout>
      )
    }
  }
)
