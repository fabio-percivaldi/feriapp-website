import React, { Component } from "react"
import DayOnCalendar from "../components/DayOnCalendar"
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { calculateCalendarDays } from '../actions/bridges'

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
                <Row className="weekdays" style={{display: 'flex', flexDirection: 'row', height: '5.5%', flexWrap: 'nowrap'}}>
                    <Col className="calendar-header">Domenica</Col>
                    <Col className="calendar-header">Lunedì</Col>
                    <Col className="calendar-header">Martedì</Col>
                    <Col className="calendar-header">Mercoledì</Col>
                    <Col className="calendar-header">Giovedì</Col>
                    <Col className="calendar-header">Venerdì</Col>
                    <Col className="calendar-header">Sabato</Col>
                </Row>
                <Row style={{height: '7.5%'}}>
                    <Col md={2} ></Col>
                    <Col md={8} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        </Button>
                        <h2>{currentMonth.format('MMMM - YYYY')}</h2>
                        <Button style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                            <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                {weeks.map((week, index) => {
                    return <Row style={{height: '14.5%'}} key={`week-${index}`}>
                        {week.days.map(day => {
                            return this.renderDay(day)
                        })}
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
        calculateCalendarDays: currentMonth => dispatch(calculateCalendarDays(currentMonth))
    }
}
const BridgesCalendar = connect(mapStateToProps, mapDispatchToProps)(ConnectedBridgesCalendar);
export default BridgesCalendar 