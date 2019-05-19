import React, { useImperativeHandle, useRef } from 'react'
import { Button, Col, Row, Form, InputGroup, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { addQuestion } from 'modules/questions'
import { FaPowerOff } from 'react-icons/fa'
import { findDOMNode } from 'react-dom'
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

const cardSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const style = {
  // border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  // marginBottom: '.5rem',
  // backgroundColor: 'white',
  // cursor: 'move',
};

const cardTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component
    )).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

class Question extends React.Component {
  render () {
    const {
      index,
      id,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const opacity = isDragging ? 0 : 1
    return (
      connectDragSource &&
    connectDropTarget &&
    connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }}>
        <Form.Row className='justify-content-center'>
          <Col lg={6}>
            <InputGroup className='mb-3 question-input'>
              <InputGroup.Prepend>
                <InputGroup.Text className='prepend-text'><FaPowerOff /></InputGroup.Text>
              </InputGroup.Prepend>
              <Field
                name={`questions.${index}`}
                component='input'
                className='form-control'
                type='text'
                placeholder={`Вопрос ${id}`}
              />
            </InputGroup>
          </Col>
        </Form.Row>
      </div>)
    )
    )
  }
}

export default flow(
  DragSource(
    'question',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget('question', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Question)
