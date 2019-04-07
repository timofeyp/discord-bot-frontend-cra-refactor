import React, { Component } from 'react'
import {
  FormGroup,
  Row,
  Col
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, Field } from 'redux-form'
import 'containers/Questions/questions.css'
import OutsideClickHandler from 'react-outside-click-handler'
import { setQuetion } from 'modules/questions'

class Index extends Component {
  state = {
    questionsCache: [
      {
        current: '',
        prev: ''
      },
      {
        current: '',
        prev: ''
      },
      {
        current: '',
        prev: ''
      }
    ]
  }

  componentDidMount () {
    this.props.questions.data.forEach((question) => {
      this.props.array.push(question.num, question.text)
    })
  }

  handleChangeQuestion = (e, n) => {
    this.setState((prevState) => {
      let questionsCache = [ ...prevState.questionsCache ]
      questionsCache[n].current = e.target.value
      return questionsCache
    })
  }

  handleClickOutsideQuestion = (n) => {
    if (this.state.questionsCache[n].prev !== this.state.questionsCache[n].current) {
      this.props.onQuestionChange(n, this.state.questionsCache[n].current)
      this.setState((prevState) => {
        let { questionsCache } = prevState
        questionsCache[n].prev = questionsCache[n].current
        return questionsCache
      })
    }
  }

  render () {
    return (
      <FormGroup>
        <Row>
          <Col xs={12} md={12}>
            <OutsideClickHandler onOutsideClick={() => this.handleClickOutsideQuestion(0)} >
              <Field
                className='text-input-form'
                name='1'
                component='input'
                type='text'
                placeholder='Вопрос 1'
                onChange={e => this.handleChangeQuestion(e, 0)}
              />
            </OutsideClickHandler>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <OutsideClickHandler onOutsideClick={() => this.handleClickOutsideQuestion(1)} >
              <Field
                className='text-input-form'
                name='2'
                component='input'
                type='text'
                placeholder='Вопрос 2'
                onChange={e => this.handleChangeQuestion(e, 1)}
              />
            </OutsideClickHandler>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <OutsideClickHandler onOutsideClick={() => this.handleClickOutsideQuestion(2)} >
              <Field
                className='text-input-form'
                name='3'
                component='input'
                type='text'
                placeholder='Вопрос 3'
                onChange={e => this.handleChangeQuestion(e, 2)}
              />
            </OutsideClickHandler>
          </Col>
        </Row>
      </FormGroup>
    )
  }
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
)(Index)

export default compose(
  reduxForm({
    form: 'questions'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Connected)
