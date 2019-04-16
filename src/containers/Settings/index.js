import React, { Component } from 'react'
import axios from 'axios/index'
import { Form, FormGroup, HelpBlock, ControlLabel, FormControl, Checkbox, Col, Row, ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap'
import connect from 'react-redux/es/connect/connect'
import 'containers/Settings/settings.css'
import { setSettings } from 'modules/settings'
import Questions from 'containers/Questions'
import { compose } from 'redux'
import { reduxForm, Field } from 'redux-form'
import OutsideClickHandler from 'react-outside-click-handler'
import { FaPowerOff } from 'react-icons/fa'

class Index extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      value: '',
      checkbox: [],
      onlineStatus: false,
      tokenCurrent: '',
      tokenPrev: ''
    }
  }

  componentDidMount () {
    this.props.array.push('token', this.props.settings.token)
    this.checkStatus()
    setInterval(() => {
      this.checkStatus()
    }, 30000)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.settings.pollDaysOfWeek === ' ') {
      return { ...prevState, checkbox: [], token: nextProps.settings.token }
    } else if (nextProps.settings.pollDaysOfWeek.length) {
      return { ...prevState, checkbox: nextProps.settings.pollDaysOfWeek.trim().split(',').map(i => parseInt(i)), token: nextProps.settings.token }
    } else {
      return prevState
    }
  }

  checkStatus = async () => {
    const status = await axios.get('/api/settings/get-status-secure')
    this.setState({ onlineStatus: status.data.onlineStatus })
  }

  getValidationState = () => {
    const length = this.state.value.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
    this.props.onSettingsChange({ ...this.props.settings, token: e.target.value })
  }

  handleChangeToken = (e) => {
    this.setState({ tokenCurrent: e.target.value })
  }

  handleClickOutsideToken = () => {
    if (this.state.tokenPrev !== this.state.tokenCurrent) {
      this.props.onSettingsChange({ ...this.props.settings, token: this.state.tokenCurrent })
      this.setState({ tokenPrev: this.state.tokenCurrent })
    }
  }

  handleCheckbox = (e) => {
    let newPollDaysOfWeek = []
    if (this.state.checkbox.includes(e)) {
      newPollDaysOfWeek = [ ...this.state.checkbox.filter(item => item !== e) ]
      if (newPollDaysOfWeek.length) {
        this.props.onSettingsChange({ ...this.props.settings, pollDaysOfWeek: newPollDaysOfWeek.toString().replace(/ /g, '') })
      } else {
        this.props.onSettingsChange({ ...this.props.settings, pollDaysOfWeek: ' ' })
      }
    } else {
      newPollDaysOfWeek = [ ...this.state.checkbox.concat(e) ]
      this.props.onSettingsChange({ ...this.props.settings, pollDaysOfWeek: newPollDaysOfWeek.toString().replace(/ /g, '') })
    }
  }

  handleClickHoursUp = (e) => {
    e.preventDefault()
    this.props.onSettingsChange({ ...this.props.settings, pollHours: ((this.props.settings.pollHours < 23) ? ++this.props.settings.pollHours : 0) })
  }

  handleClickHoursDown = (e) => {
    e.preventDefault()
    this.props.onSettingsChange({ ...this.props.settings, pollHours: ((this.props.settings.pollHours > 0) ? --this.props.settings.pollHours : 23) })
  }

  handleClickMinutesUp = (e) => {
    e.preventDefault()
    this.props.onSettingsChange({ ...this.props.settings, pollMinutes: ((this.props.settings.pollMinutes < 59) ? ++this.props.settings.pollMinutes : 0) })
  }

  handleClickMinutesDown = (e) => {
    e.preventDefault()
    this.props.onSettingsChange({ ...this.props.settings, pollMinutes: ((this.props.settings.pollMinutes > 0) ? --this.props.settings.pollMinutes : 59) })
  }

  render () {
    return (
      <form >
        <Form.Group
          controlId='formBasicText'
          validationState={this.getValidationState()}
        >
          <Form.Label>Токен <FaPowerOff style={{ color: this.state.onlineStatus ? 'green' : 'red' }} /></Form.Label>

          <OutsideClickHandler onOutsideClick={this.handleClickOutsideToken} >
            <Field
              className='text-input-form'
              type='text'
              name='token'
              component='input'
              value={this.state.token}
              placeholder='Необходимо ввести token бота'
              onChange={this.handleChangeToken}
            />
          </OutsideClickHandler>

          <FormControl.Feedback />
          <Form.Text className='text-muted'>После ввода токена бот подключится автоматически</Form.Text>
        </Form.Group>
        <Form.Group >
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(1)} checked={this.state.checkbox.includes(1)}>Пн</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(2)} checked={this.state.checkbox.includes(2)}>Вт</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(3)} checked={this.state.checkbox.includes(3)}>Ср</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(4)} checked={this.state.checkbox.includes(4)}>Чт</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(5)} checked={this.state.checkbox.includes(5)}>Пт</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(6)} checked={this.state.checkbox.includes(6)}>Сб</Form.Check>
          <Form.Check type='checkbox' inline onChange={() => this.handleCheckbox(7)} checked={this.state.checkbox.includes(7)}>Вс</Form.Check>
          &nbsp;
          <div className={'time-change'} >
            <ButtonToolbar>
              <ButtonGroup bsSize='small'>
                <Button onClick={(e) => this.handleClickHoursDown(e)}>-</Button>
                <Button disabled>{this.props.settings.pollHours}</Button>
                <Button onClick={(e) => this.handleClickHoursUp(e)}>+</Button>
              </ButtonGroup>
            </ButtonToolbar>
            &nbsp;
            &nbsp;
            &nbsp;
            <ButtonToolbar>
              <ButtonGroup bsSize='small'>
                <Button onClick={(e) => this.handleClickMinutesDown(e)}>-</Button>
                <Button disabled>{this.props.settings.pollMinutes}</Button>
                <Button onClick={(e) => this.handleClickMinutesUp(e)}>+</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Form.Group>
        <Questions state={this.props.state} />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.settings
})

const mapDispatchToProps = dispatch => ({
  onSettingsChange: (settings) => dispatch(setSettings(settings))
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

export default compose(
  reduxForm({
    form: 'settings'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Connected)
