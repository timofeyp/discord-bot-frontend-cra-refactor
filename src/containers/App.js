import React, { Component, PropTypes } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios/index'
import 'assets/sass/app.scss'
import { connect } from 'react-redux'
import ReportList from 'containers/ReportsCarousel'
import Navbar from 'components/Navbar'
import Settings from 'containers/Settings'
import { loginToSystem, sessionCheck } from 'modules/auth'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from 'containers/Login'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

class App extends Component {
  async componentDidMount () {
    this.props.sessionCheck()
  }

  loadingCheck = () => !this.props.auth.dataHasLoaded && this.props.auth.isLoading

  render () {
    if (this.loadingCheck()) {
      return <div className={'loading'}>LOADING</div>
    } else {
      return (
        <div className={this.props.auth.loggedIn ? 'root-auth' : 'root-no-auth'}>
          <Login />
          <Navbar />
          <Switch>
            <Route exact path='/' component={ReportList} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  sessionCheck
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
