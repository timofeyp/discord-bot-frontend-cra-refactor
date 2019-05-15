import React from 'react'
import { Button, Col, Row, Form, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { addQuestion } from 'modules/questions'
import { FaPowerOff } from 'react-icons/fa'

const questionsArray = questions => questions.map((el, i) =>
  <div key={i}>
    <Form.Row className='justify-content-center'>
      <Col lg={1}>
        <Row>
          <div className='d-flex align-items-center align-self-center justify-content-around'> <FaPowerOff /> {el.num}</div>
        </Row>

      </Col>
      <Col lg={5}>
        <Form.Group
        >
          <InputGroup >

            <Field
              name={`questions.${i}`}
              component='input'
              className='form-control'
              type='text'
              placeholder={`Вопрос ${++i}`}
            />

          </InputGroup>
        </Form.Group>
      </Col>

    </Form.Row>
  </div>)

const Questions = ({ questions, addQuestion }) => {
  return <div>
    { questionsArray(questions) }
    <Form.Row className='justify-content-center'>
      <Button variant='secondary' onClick={() => addQuestion(questions.length + 1)}>Добавить вопрос</Button>
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
