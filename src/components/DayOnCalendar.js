import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import './DayOnCalendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
export default class DayOnCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridges: props.bridges,
            dayOfTheMonth: '',
            month: '',
            isLocked: false,
            day: props.day,
            holidayName: props.holidayName
        }
    }
    toggleLock = () => {
        this.setState({
            isLocked: !this.state.isLocked
        })
        this.props.addCustomHoliday({
            date: this.props.day,
            name: 'Custom Holiday'
        })
    }
    renderLockButton = () => {
        if (((!this.props.isHoliday && !this.props.isWeekend) || this.state.isLocked) && !this.isDayInThePast(this.props.day)) {
            return <Button title="Blocca il giorno come festivo" className={this.state.isLocked ? 'unlock-btn' : 'lock-btn'} style={{ marginBottom: 'auto' }} onClick={this.toggleLock}>
                <FontAwesomeIcon icon={this.state.isLocked ? faLock : faLockOpen}></FontAwesomeIcon>
            </Button>
        }
    }
    isDayInThePast = (day) => {
        return moment(day).isBefore(moment().subtract(1, 'days'))
    }
    render() {
        let className = this.props.isWeekend ? 'weekend' : 'defaultDay'
        className = this.props.isHoliday ? 'holiday' : className
        if (this.isDayInThePast(this.props.day)) {
            className += ' past-day'
        }
        return (
            <Col className={className} style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                <Row title={this.props.holidayName} style={{ height: '30px', justifyContent: 'space-around' }}>
                    <h3 style={{ marginTop: 'auto' }}>{this.props.dayOfTheMonth}</h3>
                    {this.renderLockButton()}
                </Row>
                {this.props.bridges.map(bridge => {
                    const { background } = bridge
                    if (Object.keys(bridge).length > 0) {
                        return <Row key={`${this.props.month}${this.props.dayOfTheMonth}`} title={`Festivi: ${bridge.holidaysCount} - Feriali: ${bridge.weekdaysCount}`} style={{ background }}>
                            <Col md={12} style={{ height: '20px' }} >
                            </Col>
                        </Row>
                    } else {
                        return <Row key={`${this.props.month}${this.props.dayOfTheMonth}${bridge.id}`} style={{ background, marginLeft: '-15px', marginRight: '-15px' }}>
                            <Col md={12} style={{ height: '20px' }} >
                            </Col>
                        </Row>
                    }
                })}
            </Col>
        );
    }
}