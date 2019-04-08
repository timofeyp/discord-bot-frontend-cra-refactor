import React, { Component, PropTypes } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios/index'
import './app.css'
import { connect } from 'react-redux'
import ReportList from 'containers/ReportsCarousel'
import Navibar from 'components/Navbar'
import Settings from 'containers/Settings'
import { loginToSystem } from 'modules/auth'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from 'containers/Login'

class App extends Component {
  async componentDidMount () {
    if (localStorage.getItem('jwtToken')) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      await this.props.onLogin(null, { jwt: localStorage.getItem('jwtToken') })
      this.setState({ dataHasGot: true })
    }
  }

  render () {
    if (!this.props.auth.dataHasLoaded && this.props.auth.isLoading) {
      return <div className={'loading'}>LOADING</div>
    } else {
      return (
        <div className={'root'}>
          <Login />
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    onLogin: (event, authData) => dispatch(loginToSystem(event, authData))
  })
)(App)
