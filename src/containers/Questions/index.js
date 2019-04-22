import React, { Component } from 'react'
import {
  FormGroup,
  Row,
  Col, Form
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import 'containers/Questions/questions.css'
import OutsideClickHandler from 'react-outside-click-handler'
import { setQuetion } from 'modules/questions'

const formControl = ({ input, ...props }) =>
  <Form.Control
    {...props}
    {...input}
  />

const Questions = () => {
  const arr = [1, 2, 3]
  return arr.map((el, i) =>
    <Row>
      <Col xs={12} md={12}>
        <OutsideClickHandler >
          <Field
            className='text-input-form'
            name={++i}
            component={formControl}
            type='text'
            placeholder={`Вопрос ${i}`}
          />
        </OutsideClickHandler>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  onQuestionChange: (num, text) => dispatch(setQuetion(num, text))
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions)

export default compose(
  reduxForm({
    form: 'questions'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Connected)
