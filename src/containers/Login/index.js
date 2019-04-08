import React, { Component } from 'react'
import './login.css'
import { Navbar, FormControl, FormGroup, Button, NavItem, InputGroup, Form, Col } from 'react-bootstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { EXIT_FROM_SYSTEM, getReports } from 'modules/auth'
import { FaSignOutAlt, FaDiscord } from 'react-icons/fa'
import { onExit, loginToSystem } from 'modules/auth'

class Index extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      hasAuthorized: false
    }
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onUnlogin = (e) => {
    const emptyState = { ...this.state, username: '', password: '' }
    this.setState(emptyState)
    e.preventDefault()
    this.props.onExit()
    localStorage.removeItem('jwtToken')
  }

  onLogin = (e) => {
    e.preventDefault()
    this.props.loginToSystem()
  }

  reduxFormControl = ({ input, meta, ...props }) => {
    return <Form.Control
      {...props}
      {...input}
    />
  }

  render () {
    if (!this.props.loggedIn) {
      return (
        <Form className='login-form'>
          <Form.Row className='row justify-content-md-center'>
            <Form.Label className='login-form-label'><FaDiscord className='login-form-icon' /></Form.Label>
          </Form.Row>
          <Form.Group controlId='formBasicEmail'>
            <Field
              name='username'
              component={this.reduxFormControl}
              type='text'
              placeholder='Имя пользователя'
              className='form-input'
              required
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Field
              name='password'
              component={this.reduxFormControl}
              type='text'
              placeholder='Пароль'
              className='form-input'
              required
            />
          </Form.Group>
          <Button variant='dark'
            type='submit'
            size='sm'
            onClick={event => this.onLogin(event)}
          >
            Вход
          </Button>
        </Form>
      )
    } else {
      return (
        <NavItem disabled>
          {this.props.loggedIn}
          {' '}
          <Button bsSize='xsmall' onClick={event => this.onUnlogin(event)}>
            <FaSignOutAlt glyph='log-out' /> Выход
          </Button>
        </NavItem>
      )
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
})

const mapDispatchToProps = {
  onExit,
  loginToSystem
}

export default compose(
  reduxForm({
    form: 'login'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Index)
