import React, { Component } from 'react'
import { ListGroup, Alert } from 'react-bootstrap'
import 'containers/ReportsCarousel/reportCarousel.css'
import { connect } from 'react-redux'
import { getNextPageReports } from 'modules/reports'
import Report from 'components/Report'
import Carousel from 'react-slick'
import 'react-animated-slider/build/horizontal.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Index extends Component {
  componentDidUpdate() {

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.reports.length === 0) {
     this.slider.slickGoTo(0)
    }
    return prevState
  }


  constructor (props) {
    super(props)
    this.changeSliderPage = this.changeSliderPage.bind(this)
    this.state = {
      skip: 0,
      slideIndex: 1,
      settings: {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => {
          this.setState({ slideIndex : (++index) })
          this.changeSliderPage(index)
        }
      }
    }
  }

  changeSliderPage (index) {
    if ((index + 1) === this.props.reports.length) {
      this.props.onGetNextPageReports(this.slider, this.props.reports[index]._id)
    }
  }

  render () {
    if (this.props.auth) {
      return (
        <div className={'listGroup'}>
          <Carousel ref={c => (this.slider = c)} {...this.state.settings}>
            {this.props.reports.map(report => <Report className={ListGroup} key={report._id} report={report} />)}
          </Carousel>
          <div className={'status'}>{this.state.slideIndex} из {this.props.totalDocs}</div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(
  state => ({
    auth: state.auth.loggedIn,
    reports: state.reports,
    totalDocs: state.pagination.totalDocs
  }),
  dispatch => ({
    onGetNextPageReports: (slider, id) => dispatch(getNextPageReports(slider, id))
  })
)(Index)
