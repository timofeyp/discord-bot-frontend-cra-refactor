import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils from 'react-day-picker/moment'
import moment from 'moment'
import 'moment/locale/ru'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { changeRequestConditionsDateStart, changeRequestConditionsDateEnd } from 'modules/requestConditions'

function parseDate (str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

function formatDate (date, format, locale) {
  return dateFnsFormat(date, format, { locale })
}

const FORMAT = 'D/M/YYYY'

class Index extends Component {
  constructor (props) {
    super(props)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.state = {
      from: undefined,
      to: undefined
    }
  }
  showFromMonth () {
    const { from, to } = this.state
    if (!from) {
      return
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }
  alignHours = (date) => {
    return moment(date).utcOffset(3, true).hour(0).minute(0).toDate()
  }
  handleFromChange (from) {
    this.props.onDateChangeStart(this.alignHours(from))
    this.setState({ from })
  }
  handleToChange (to) {
    this.props.onDateChangeEnd(this.alignHours(to))
    this.setState({ to }, this.showFromMonth)
  }
  render () {
    const { from, to } = this.state
    const modifiers = { start: from, end: to }
    return (
      <div className='InputFromTo calendar'>
        <DayPickerInput
          value={from}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          dayPickerProps={{
            localeUtils: MomentLocaleUtils,
            locale: 'ru',
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        —{' '}
        <span className='InputFromTo-to'>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            dayPickerProps={{
              localeUtils: MomentLocaleUtils,
              locale: 'ru',
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 300px;
    height: 360px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
  .DayPickerInput {
    background-color: #fbfbfb;
  }
  Input {
    background-color: #fbfbfb;
    border: 2px solid #dcdcdc;
    border-radius: 5px;
  }
`}</style>
        </Helmet>
      </div>
    )
  }
}

export default connect(
  state => ({ requestConditions: state.requestConditions }),
  dispatch => ({
    onDateChangeStart: (date) => dispatch(changeRequestConditionsDateStart(date)),
    onDateChangeEnd: (date) => dispatch(changeRequestConditionsDateEnd(date))
  })
)(Index)
