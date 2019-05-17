import React, { useImperativeHandle, useRef } from 'react'
import { Button, Col, Row, Form, InputGroup, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { addQuestion } from 'modules/questions'
import { FaPowerOff } from 'react-icons/fa'
import Question from 'containers/Settings/question'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd'
import { XYCoord } from 'dnd-core'
import flow from 'lodash/flow'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const cardSource = {
  beginDrag (props) {
    return {
      num: props.num,
    }
  }
}

const questionsArray = questions =>
  <div className='questions'>
    {questions.map((el, i) =>
      <Question key={i} num={i} />)}
  </div>

const Questions = ({ questions, addQuestion }) => <div>
  { questions.map((el, i) =>
    <Question key={i} num={i} />) }
  <Form.Row className='justify-content-center'>
    <Button variant='secondary' onClick={() => addQuestion(questions.length + 1)}>Добавить вопрос</Button>
  </Form.Row>
</div>

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

export default DragDropContext(HTML5Backend)(Connected)
