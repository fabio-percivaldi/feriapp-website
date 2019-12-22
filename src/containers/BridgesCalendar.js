import React, { Component } from "react";
import DayOnCalendar from "../components/DayOnCalendar";
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default class BridgesCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weeks: this.calculateMonthlyCalendar(moment()),
            currentMonth: moment()
        }
    }
    calculateMonthlyCalendar(currentMonth) {
        
        console.log('|||||||||||||||||| ', currentMonth)
        const daysInCurrentMonth = currentMonth.daysInMonth()
        const daysInPreviousMonth = moment(currentMonth).subtract(1, 'months').daysInMonth()
        const extraDays = 35 - daysInCurrentMonth
        const secondHalf = Math.floor(extraDays / 2)
        const firstHalf = secondHalf + (extraDays % 2)
        const startPadding = []
        for (let i = firstHalf; i > 0; i--) {
            startPadding.push({
                dayNumber: daysInPreviousMonth - i + 1,
                month: moment(currentMonth).subtract(1, 'months').format('MMM')
            })
        }
        const endPadding = []
        for (let i = 1; i <= firstHalf; i++) {
            endPadding.push({
                dayNumber: i,
                month: moment(currentMonth).add(1, 'months').format('MMM')
            })
        }
        let days = [...startPadding]

        for (let i = 1; i <= daysInCurrentMonth; i++) {
            days.push({
                dayNumber: i,
                month: currentMonth.format('MMM')
            })
        }
        days = [...days, ...endPadding]
        return [
            {
                days: days.slice(0, 7)
            },
            {
                days: days.slice(7, 14)
            },
            {
                days: days.slice(14, 21)
            },
            {
                days: days.slice(21, 28)
            },
            {
                days: days.slice(28, 35)
            },
        ]
    }
    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        this.setState({ isLoading: false });
    }
    renderDay(dayNumber, month) {
        return <DayOnCalendar dayOfTheMonth={dayNumber} month={month} isBridge={false} key={`${dayNumber}${month}`}></DayOnCalendar>
    }

    nextMonth = () => {
        const nextMonth = moment(this.state.currentMonth).add(1, 'months')
        const nextWeeks = this.calculateMonthlyCalendar(nextMonth)

        this.setState({
            weeks: nextWeeks,
            currentMonth: nextMonth
        })
    }

    previousMonth = () => {
        const previousMonth = moment(this.state.currentMonth).subtract(1, 'months')
        const previousWeeks = this.calculateMonthlyCalendar(previousMonth)

        this.setState({
            weeks: previousWeeks,
            currentMonth: previousMonth
        })
    }
    render() {
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
                        <Row style={{background: '#80808059'}}>
                            <Col md={4} ></Col>
                            <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                                <Button bsStyle="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                                </Button>
                                <h2>{this.state.currentMonth.format('MMMM')}</h2>
                                <Button bsStyle="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                                    <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                                </Button>
                            </Col>
                            <Col md={4}></Col>
                        </Row >
                    </Col>
                </ul>
                <ul>
                    {this.state.weeks[0].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[1].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[2].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[3].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[4].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month)
                    })}
                </ul>
            </div>
        );
    }
}
