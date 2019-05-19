import React, { useImperativeHandle, useRef, useState, useEffect } from 'react'
import { Button, Col, Row, Form, InputGroup, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { addQuestion, moveQuestion } from 'modules/questions'
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
const update = require('immutability-helper')

const cardSource = {
  beginDrag (props) {
    return {
      num: props.num
    }
  }
}

class Questions extends React.Component {
  moveCard = (dragIndex, hoverIndex) => {
    this.props.moveQuestion(dragIndex, hoverIndex)
  }

  render () {
    const comp = (a, b) => a.num > b.num ? 1 : -1
    return (<div>
      {this.props.questions
        // .sort(comp)
        .map((card, i) => (
          <Question
            key={card.num}
            index={i}
            id={card.num}
            moveCard={this.moveCard}
          />
        ))
      }
      <Form.Row className='justify-content-center'>
        <Button variant='secondary' onClick={() => this.props.addQuestion(this.props.questions.length + 1)}>Добавить вопрос</Button>
      </Form.Row>
    </div>)
  }
}

const mapStateToProps = state => ({
  questions: state.questions.data

})

const mapDispatchToProps = {
  addQuestion,
  moveQuestion
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions)

export default DragDropContext(HTML5Backend)(Connected)
