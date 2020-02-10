import React, { Component } from "react"
import DayOnCalendar from "../components/DayOnCalendar"
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { calculateCalendarDays, addCustomHoliday } from '../actions/bridges'
import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

moment.locale('it')
class ConnectedBridgesCalendar extends Component {
    renderDay = (calendarDay) => {
        const { day, bridges, isHoliday, isWeekend } = calendarDay
        return <DayOnCalendar
            dayOfTheMonth={day.format('D')}
            month={day.format('MMM')}
            bridges={bridges}
            isWeekend={isWeekend}
            isHoliday={isHoliday}
            day={day}
            addCustomHoliday={this.props.addCustomHoliday}
            key={`${day.format('D')}${day.format('MMM')}`}>
        </DayOnCalendar>
    }

    nextMonth = () => {
        const nextMonth = moment(this.props.currentMonth).add(1, 'months')
        this.props.calculateCalendarDays(nextMonth)
    }

    previousMonth = () => {
        const previousMonth = moment(this.props.currentMonth).subtract(1, 'months')
        this.props.calculateCalendarDays(previousMonth)
    }
    render() {
        const { weeks, currentMonth } = this.props
        return (
            <Container className='calendar' style={{ height: '90%', display: 'flex', flexDirection: 'column', overflowY: 'overlay' }}>
                <Row style={{height: '50px'}}>
                    <Col md={2} ></Col>
                    <Col md={8} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button className="circular-btn" style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        </Button>
                        <h2>{currentMonth.format('MMMM - YYYY')}</h2>
                        <Button className="circular-btn" style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                            <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <Row className="weekdays" style={{display: 'flex', flexDirection: 'row', height: '5.5%', flexWrap: 'nowrap'}}>
                    <Col className="calendar-header">Dom</Col>
                    <Col className="calendar-header">Lun</Col>
                    <Col className="calendar-header">Mar</Col>
                    <Col className="calendar-header">Mer</Col>
                    <Col className="calendar-header">Gio</Col>
                    <Col className="calendar-header">Ven</Col>
                    <Col className="calendar-header">Sab</Col>
                </Row>
                {weeks.map((week, index) => {
                    return <Row style={{height: '14.5%'}} key={`week-${index}`}>
                        {week.days.map(day => {
                            return this.renderDay(day)
                        })}
                        <Range kay={`week-${index}`} />
                    </Row>
                })}
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        bridges: state.bridges,
        selectedBridges: state.selectedBridges,
        weeks: state.weeks,
        dayOfHolidays: state.dayOfHolidays,
        currentMonth: state.currentMonth
    };
};
function mapDispatchToProps(dispatch) {
    return {
        calculateCalendarDays: currentMonth => dispatch(calculateCalendarDays(currentMonth)),
        addCustomHoliday: customHoliday => dispatch(addCustomHoliday(customHoliday))
    }
}
const BridgesCalendar = connect(mapStateToProps, mapDispatchToProps)(ConnectedBridgesCalendar);
export default BridgesCalendar 