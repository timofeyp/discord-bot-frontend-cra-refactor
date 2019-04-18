import React, { Component } from 'react'
import axios from 'axios/index'
import { Form, InputGroup, HelpBlock, ControlLabel, FormControl, Checkbox, Col, Row, ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap'
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

  checkButton = ({ input, ...props }) =>
    <Form.Check
      inline
      custom
      {...props} {...input}
    />

  formControl = ({ input, meta, ...props }) =>
    <Form.Control
      {...props}
      {...input}
    />

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
        <Row className='justify-content-md-center'>
          { [ `Пн`, `Вт`, `Ср`, `Чт`, `Пт`, `Сб`, `Вс` ].map((day, i) => {
            ++i
            return <Field
              name={`day.${i}`}
              component={this.checkButton}
              id={i}
              label={`Пн`}
              type={`checkbox`}
            />
          }
          ) }
        </Row>
        <Row className='justify-content-md-center'>
            <InputGroup className='input-time'>
              <InputGroup.Prepend>
                <InputGroup.Text>Ч</InputGroup.Text>
              </InputGroup.Prepend>
              <Field
                name={`hours`}
                component={this.formControl}
                type={`text`}
              />
              <InputGroup.Prepend>
                <InputGroup.Text>М</InputGroup.Text>
              </InputGroup.Prepend>
              <Field
                name={`minutes`}
                component={this.formControl}
                type={`text`}
              />
            </InputGroup>
        </Row>
        <Row className='justify-content-md-center' />
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
