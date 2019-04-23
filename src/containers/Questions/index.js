import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import 'containers/Questions/questions.css'
import { setQuetion } from 'modules/questions'

const formControl = ({ input, ...props }) =>
  <Form.Control
    {...props}
    {...input}
  />

const Questions = () => {
  const arr = [1, 2, 3]
  return arr.map((el, i) =>
    <Form.Row className='justify-content-center'>
      <Col lg={6}>
        <Form.Group
        >
          <Field
            name={`questions.${i}`}
            component={formControl}
            type='text'
            placeholder={`Вопрос ${++i}`}
          />
        </Form.Group>
      </Col>
    </Form.Row>

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

export default
connect(
  mapStateToProps,
  mapDispatchToProps
)(Connected)
