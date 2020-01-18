import React, { Component } from "react"
import DayOnCalendar from "../components/DayOnCalendar"
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row } from "react-bootstrap";
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
            <div className="calendar" style={{ heigth: '100vh' }}>
                <ul className="weekdays">
                    <li>Domenica</li>
                    <li>Lunedì</li>
                    <li>Martedì</li>
                    <li>Mercoledì</li>
                    <li>Giovedì</li>
                    <li>Venerdì</li>
                    <li>Sabato</li>
                </ul>
                <ul>
                    <Col md={12}>
                        <Row>
                            <Col md={3} ></Col>
                            <Col md={6} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                                </Button>
                                <h2>{currentMonth.format('MMMM - YYYY')}</h2>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                                    <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                                </Button>
                            </Col>
                            <Col md={3}></Col>
                        </Row >
                    </Col>
                </ul>
                {weeks.map((week, index) => {
                    return <ul key={`week-${index}`}>
                        {week.days.map(day => {
                            return this.renderDay(day)
                        })}
                    </ul>
                })}
            </div>
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