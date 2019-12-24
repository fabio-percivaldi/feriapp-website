import React, {Component} from "react"
import DayOnCalendar from "../components/DayOnCalendar"
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { calculateCalendarDays } from '../actions/bridges'


class ConnectedBridgesCalendar extends Component {
    renderDay = (calendarDay) => {
        const {day, isBridge} = calendarDay 
        return <DayOnCalendar 
        dayOfTheMonth={day.format('D')} 
        month={day.format('MMM')} 
        isBridge={isBridge} 
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
        const {weeks, currentMonth} = this.props
        return (
            <div className="calendar" style={{ heigth: '100vh' }}>
                <ul className="weekdays">
                    <li>Sunday</li>
                    <li>Monday</li>
                    <li>Tuesday</li>
                    <li>Wednesday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
                <ul>
                    <Col md={12}>
                        <Row style={{ background: '#80808059' }}>
                            <Col md={4} ></Col>
                            <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                                </Button>
                                <h2>{currentMonth.format('MMMM')}</h2>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                                    <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                                </Button>
                            </Col>
                            <Col md={4}></Col>
                        </Row >
                    </Col>
                </ul>
                <ul>
                    {weeks[0].days.map(day => {
                        return this.renderDay(day)
                    })}
                </ul>
                <ul>
                    {weeks[1].days.map(day => {
                        return this.renderDay(day)
                    })}
                </ul>
                <ul>
                    {weeks[2].days.map(day => {
                        return this.renderDay(day)
                    })}
                </ul>
                <ul>
                    {weeks[3].days.map(day => {
                        return this.renderDay(day)
                    })}
                </ul>
                <ul>
                    {weeks[4].days.map(day => {
                        return this.renderDay(day)
                    })}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => {
    if (state.selectedBridge) {
        const start = parseInt(moment(state.selectedBridge.start).format('D'))
        const end = parseInt(moment(state.selectedBridge.end).format('D'))
        const days = []
        for (let i = start; i <= end; i++) {
            days.push({
                dayNumber: i,
                month: moment(state.selectedBridge.start).format('MMM'),
            })
        }
        // const weeks = JSON.parse(JSON.stringify(weeks))
        // console.log('|||||||||||||', state.selectedBridge)
    }
    return {
        bridges: state.bridges,
        selectedBridge: state.selectedBridge,
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