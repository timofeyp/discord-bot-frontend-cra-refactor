import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'components/Navbar/navbar.css'

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
        <Navbar bsPrefix='navbar' sticky='top' bg='light' variant='light'>
          <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-primary'>Search</Button>
          </Form>
        </Navbar>
      )
    } else {
      return null
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
