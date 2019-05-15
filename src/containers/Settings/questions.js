import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { addQuestion } from 'modules/questions'

const formControl = ({ input, ...props }) =>
  <Form.Control
    {...props}
    {...input}
  />

const questionsArray = questions => questions.map((el, i) =>
  <div>
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
  </div>)

const Questions = ({ questions, addQuestion }) => {
  return <div>
    { questionsArray(questions) }
    <Form.Row className='justify-content-center'>
      <Button variant='secondary' onClick={() => addQuestion()}>Добавить вопрос</Button>
    </Form.Row>
  </div>
}

const mapStateToProps = state => ({
  questions: state.questions.data

})

const mapDispatchToProps = {
  addQuestion
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions)

export default
connect(
  mapStateToProps,
  mapDispatchToProps
)(Connected)
