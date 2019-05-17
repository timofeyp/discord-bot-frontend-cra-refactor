import React, { useEffect } from 'react'
import { Form, InputGroup, Container, FormControl, Col, Button } from 'react-bootstrap'
import connect from 'react-redux/es/connect/connect'
import { getSettings } from 'modules/settings'
import Questions from 'containers/Settings/questions'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { FaPowerOff } from 'react-icons/fa'

const checkButton = ({ input, ...props }) =>
  <Form.Check
    inline
    custom
    {...props} {...input}
  />

const days = () =>
  [ `Пн`, `Вт`, `Ср`, `Чт`, `Пт`, `Сб`, `Вс` ].map((day, i) =>
    <Field
      key={i}
      name={`days.${i}`}
      component={checkButton}
      id={`days.${i}`}
      label={day}
      type={`checkbox`}
    />)

let settings = ({ getSettings, settings }) => {
  useEffect(() => {
    getSettings()
  }, settings
  )
  return (
    <Container className='settings'>
      <Form.Row className='justify-content-center'>
        <Col lg={6}>
          <Form.Group
          >
            <Form.Label>Токен <FaPowerOff style={{ color: 'green' }} /></Form.Label>
            <Field
              type='text'
              name='token'
              component='input'
              className='form-control'
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
            component='input'
            className='form-control'
            type={`text`}
          />
          <InputGroup.Append className='time-append'>
            <InputGroup.Text>М</InputGroup.Text>
          </InputGroup.Append>
          <Field
            name={`minutes`}
            component='input'
            className='form-control'
            type={`text`}
          />
        </InputGroup>
      </Form.Row>
      <FieldArray name='questions' component={Questions} />
    </Container>
  )
}

const mapStateToProps = state => ({
  settings: state.settings,
  initialValues: { questions: state.questions.initialValuesArray }
})

const mapDispatchToProps = {
  getSettings
}

settings = reduxForm({
  form: 'settings'
})(settings)

settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(settings)

export default settings
