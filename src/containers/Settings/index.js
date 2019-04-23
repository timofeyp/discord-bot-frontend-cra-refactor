import React, { useEffect } from 'react'
import axios from 'axios/index'
import { Form, InputGroup, Container, FormControl, Col } from 'react-bootstrap'
import connect from 'react-redux/es/connect/connect'
import 'containers/Settings/settings.css'
import { setSettings, getSettings } from 'modules/settings'
import Questions from 'containers/Questions'
import { compose } from 'redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { FaPowerOff } from 'react-icons/fa'

const checkButton = ({ input, ...props }) =>
  <Form.Check
    inline
    custom
    {...props} {...input}
  />

const formControl = ({ input, ...props }) =>
  <Form.Control
    {...props}
    {...input}
  />

const days = () =>
  [ `Пн`, `Вт`, `Ср`, `Чт`, `Пт`, `Сб`, `Вс` ].map((day, i) =>
    <Field
      name={`days.${i}`}
      component={checkButton}
      id={`days.${i}`}
      label={day}
      type={`checkbox`}
    />)

const settings = ({ getSettings, settings }) => {
  useEffect(() => {
    getSettings()
  }, settings
  )

  return (
    <Container className='settings-container'>
      <Form.Row className='justify-content-center'>
        <Col lg={6}>
          <Form.Group
          >
            <Form.Label>Токен <FaPowerOff style={{ color: 'green' }} /></Form.Label>
            <Field
              type='text'
              name='token'
              component={formControl}
              placeholder='discord application token'
            />
            <FormControl.Feedback />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className='justify-content-center'>
        <FieldArray name='days' component={days} />
      </Form.Row>
      <Form.Row className='justify-content-center'>
        <InputGroup className='input-time'>
          <InputGroup.Prepend>
            <InputGroup.Text>Ч</InputGroup.Text>
          </InputGroup.Prepend>
          <Field
            name={`hours`}
            component={formControl}
            type={`text`}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>М</InputGroup.Text>
          </InputGroup.Prepend>
          <Field
            name={`minutes`}
            component={formControl}
            type={`text`}
          />
        </InputGroup>
      </Form.Row>
      <FieldArray name='questions' component={Questions} />
    </Container>
  )
}

const mapStateToProps = state => ({
  settings: state.settings
})

const mapDispatchToProps = {
  getSettings
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(settings)

export default compose(
  reduxForm({
    form: 'settings'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Connected)
