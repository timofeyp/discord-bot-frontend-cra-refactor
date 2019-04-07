import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Tab, Col, Row } from 'react-bootstrap'
import 'components/Navbar/navbar.css'
import Login from 'containers/Login'
import { connect } from 'react-redux'
import Calendar from 'containers/Calendar'
import SelectMenu from 'containers/SelectMenu'
import Settings from 'containers/Settings'
import OutsideClickHandler from 'react-outside-click-handler'

class Navibar extends Component {
  constructor (props) {
    super(props)
    this.myInput = React.createRef()
  }
  state = {
    key: null
  }
  handleSelect = (key) => {
    this.setState({ key })
  }
  render () {
    if (this.props.auth) {
      return (
        <OutsideClickHandler onOutsideClick={() => this.setState({ key: null })
        }
        >
          <Navbar ref='navbar' fluid fixedTop className={'form'}>

            <Tab.Container
              activeKey={this.state.key}
              onSelect={this.handleSelect}
              id='tabs-with-dropdown'
            >
              <Row className='clearfix'>
                <Col sm={12}>
                  <Nav className={'delete-border1'} bsStyle='tabs'>
                    <NavItem eventKey='find'>Параметры поиска</NavItem>
                    <NavItem eventKey='param'>Настройки</NavItem>
                    <Login />
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey='find'><div className={'tab-pane-first'}><Calendar /><div id={'select-menu'}><SelectMenu /></div></div></Tab.Pane>
                    <Tab.Pane eventKey='param'><div className={'tab-pane-first'}><Settings id={'select-menu'} /></div></Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>

          </Navbar>
        </OutsideClickHandler>
      )
    } else {
      return (
        <Navbar fluid fixedTop className={'form'}>
          <Navbar.Header>
            <Navbar.Brand>
              <b>DISCORD BOT MENU</b>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight >
            <Login />
          </Nav>
        </Navbar>
      )
    }
  }
}

export default connect(
  state => ({
    auth: state.auth.loggedIn
  }),
  dispatch => ({
  })
)(Navibar)
