import React, { Component } from "react";
import DayOnCalendar from "../components/DayOnCalendar";
import './BridgesCalendar.css'
import moment from 'moment'
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import * as Kazzenger from '../kazzenger-core/kazzenger'
import deepEqual from 'deep-equal'

const defaultLocation = { country: 'IT', city: 'Milano' }
const defaultDaysOff = [0, 6]
const defaultKazzengerSettings = {
    ...defaultLocation,
    daysOff: defaultDaysOff,
}

export default class BridgesCalendar extends Component {
    constructor(props) {
        super(props);

        const weeks = this.calculateMonthlyCalendar(moment())

        this.state = {
            weeks: weeks,
            currentMonth: moment(),
            dayOfHolidays: props.dayOfHolidays
        }
    }

    _kazzenger = null
    _kazzengerSettings = null
    getKazzenger = (settings) => {
        if (!this._kazzenger || (settings && !deepEqual(settings, this._kazzengerSettings))) {
            this._kazzengerSettings = settings || defaultKazzengerSettings
            this._kazzenger = new Kazzenger.default(this._kazzengerSettings)
            console.log('creted new Kazzenger')
        }
        return this._kazzenger
    }
    bridgesByMonth = (kazzenger, dayOfHolidays, start, end) => {
        return kazzenger
            .bridgesByMonth({
                start: start.startOf('month').toDate(),
                end: end.endOf('month').toDate(),
                maxHolidaysDistance: 4,
                maxAvailability: dayOfHolidays,
            })
            .map(years => {
                const scores = []
                years.bridges.forEach(bridge => {
                    bridge.rate = kazzenger.rateBridge(bridge)
                    if (bridge.rate > 70) {
                        scores.push(bridge.rate)
                    }
                })
                scores.sort().reverse()
                years.bridges.forEach(bridge => {
                    const index = scores.indexOf(bridge.rate)
                    bridge.isTop = index >= 0 && index < 2
                })
                return years
            })
    }
    bridges = (kazzenger, dayOfHolidays) => {
        //  const now = new Date('2019-01-01T00:00:00Z')
        const now = new Date()
        return kazzenger
            .bridgesByYears({
                start: now,
                end: new Date(`${now.getFullYear() + 2}-12-31T12:00:00Z`),
                maxHolidaysDistance: 4,
                maxAvailability: dayOfHolidays,
            })
            .map(years => {
                const scores = []
                years.bridges.forEach(bridge => {
                    bridge.rate = kazzenger.rateBridge(bridge)
                    if (bridge.rate > 70) {
                        scores.push(bridge.rate)
                    }
                })
                scores.sort().reverse()
                years.bridges.forEach(bridge => {
                    const index = scores.indexOf(bridge.rate)
                    bridge.isTop = index >= 0 && index < 2
                })
                return years
            })
    }
    calculateMonthlyCalendar = (currentMonth, dayOfHolidays = 2) => {
        const previousMonth = moment(currentMonth).subtract(1, 'months')
        const nextMonth = moment(currentMonth).add(1, 'months')
        
        const bridgesByMonth = this.bridgesByMonth(this.getKazzenger(), dayOfHolidays, moment(currentMonth), nextMonth)
        console.log(bridgesByMonth)
        // TODO: da considerare i ponti nel mese precedente e in quello successivo
        const bridgesDayInPreviousMonth = bridgesByMonth.find(bridge => {
            return bridge.months.find(month => month === previousMonth.format('MM'))
        })
        const bridgesInCurrentMonth = bridgesByMonth.find(bridge => {
            const pippo = bridge.months.find(month => {
                return month === currentMonth.toDate().getMonth()
            })
            return pippo !== undefined
        })
        let bridgesDaysInCurrentMonth = []
        if(bridgesInCurrentMonth) {
            bridgesDaysInCurrentMonth = bridgesInCurrentMonth.bridges.map(bridge => {
                const start = parseInt(moment(bridge.start).format('D'))
                const end = parseInt(moment(bridge.end).format('D'))
                const days = []
                for (let i = start; i <= end; i++) {
                    days.push({
                        dayNumber: i,
                        month: moment(bridge.start).format('MMM'),
                    })
                }
                return days
            })
        }

        const daysInCurrentMonth = currentMonth.daysInMonth()
        const daysInPreviousMonth = previousMonth.daysInMonth()
        const extraDays = 35 - daysInCurrentMonth
        const secondHalf = Math.floor(extraDays / 2)
        const firstHalf = secondHalf + (extraDays % 2)
        const startPadding = []
        for (let i = firstHalf; i > 0; i--) {
            startPadding.push({
                dayNumber: daysInPreviousMonth - i + 1,
                month: previousMonth.format('MMM'),
                isBridge: false
            })
        }
        const endPadding = []
        for (let i = 1; i <= firstHalf; i++) {
            endPadding.push({
                dayNumber: i,
                month: nextMonth.format('MMM'),
                isBridge: false
            })
        }
        let days = [...startPadding]

        for (let i = 1; i <= daysInCurrentMonth; i++) {
            days.push({
                dayNumber: i,
                month: currentMonth.format('MMM'),
                isBridge: false
            })
        }
        days = [...days, ...endPadding]
        // per ora prendo solo il primo ponte non sto considerando eventuali sovrapposizioni di giorni, ovvero ponti diversi che hanno giorni in comune
        if(bridgesDaysInCurrentMonth[0]) {
            bridgesDaysInCurrentMonth[0].forEach(bridgeDay => {
                const day = days.find(day => (day.dayNumber === bridgeDay.dayNumber) && (day.month === bridgeDay.month))
                if(day) {
                    day.isBridge = true
                }
            })
        }
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
    componentDidUpdate(prevProps) {
        if (prevProps.dayOfHolidays !== this.props.dayOfHolidays) {
            const weeks = this.calculateMonthlyCalendar(this.state.currentMonth, this.props.dayOfHolidays) 
            this.setState({
                weeks,
                currentMonth: this.state.currentMonth
            })  
        }
    }
    renderDay(dayNumber, month, isBridge) {
        return <DayOnCalendar dayOfTheMonth={dayNumber} month={month} isBridge={isBridge} key={`${dayNumber}${month}`}></DayOnCalendar>
    }

    nextMonth = () => {
        const nextMonth = moment(this.state.currentMonth).add(1, 'months')
        const nextWeeks = this.calculateMonthlyCalendar(nextMonth, this.state.maxWorkDays)

        this.setState({
            weeks: nextWeeks,
            currentMonth: nextMonth
        })
    }

    previousMonth = () => {
        const previousMonth = moment(this.state.currentMonth).subtract(1, 'months')
        const previousWeeks = this.calculateMonthlyCalendar(previousMonth, this.state.maxWorkDays)

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
                        <Row style={{ background: '#80808059' }}>
                            <Col md={4} ></Col>
                            <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.previousMonth}>
                                    <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                                </Button>
                                <h2>{this.state.currentMonth.format('MMMM')}</h2>
                                <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.nextMonth} >
                                    <FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon>
                                </Button>
                            </Col>
                            <Col md={4}></Col>
                        </Row >
                    </Col>
                </ul>
                <ul>
                    {this.state.weeks[0].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month, day.isBridge)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[1].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month, day.isBridge)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[2].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month, day.isBridge)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[3].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month, day.isBridge)
                    })}
                </ul>
                <ul>
                    {this.state.weeks[4].days.map(day => {
                        return this.renderDay(day.dayNumber, day.month, day.isBridge)
                    })}
                </ul>
            </div>
        );
    }
}
