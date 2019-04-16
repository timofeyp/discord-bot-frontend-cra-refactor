import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'components/Navbar/navbar.css'
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux'
import Calendar from 'containers/Calendar'
import SelectMenu from 'containers/SelectMenu'
import Settings from 'containers/Settings'
import OutsideClickHandler from 'react-outside-click-handler'

class Navibar extends Component {
  render () {
    if (this.props.auth.loggedIn) {
      return (
        <Nav justify variant='tabs' defaultActiveKey='report'>
          <LinkContainer to='/'>
            <Nav.Item>
              <Nav.Link className='menu-text' href='/' eventKey='report'>
                Отчет
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer to='/settings'>
            <Nav.Item>
              <Nav.Link className='menu-text' href='/settings' eventKey='settings'>
                Настройки
              </Nav.Link>
            </Nav.Item>
          </LinkContainer>
          <Nav.Item>
            <Nav.Link eventKey='disabled' disabled>
              {this.props.auth.login}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )
    } else {
      return null
    }
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
  })
)(Navibar)
