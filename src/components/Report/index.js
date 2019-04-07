import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import moment from 'moment/moment'

class Index extends Component {
  render () {
    return (
      <Jumbotron bsClass='jumbo' >
        <b>{this.props.report.author.name}</b>
        <br />
        <b>{moment(this.props.report.created).format('DD.MM.YYYY - hh:mm') }</b>
        <br />
        {this.props.report.reports.map(report => <p key={report._id}> <b>{report.reportNum}. </b> {report.text}</p>)}
        <br />
        <br />
      </Jumbotron >
    )
  }
}

export default Index
