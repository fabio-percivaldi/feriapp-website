import React, { Component } from "react";
import { Row, Col, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
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
            day: props.day
        }
    }
    renderTooltip = (bridge) => {
        return <Tooltip style={{ fontSize: '1.5rem' }}>{`Festivi: ${bridge.holidaysCount} - Feriali: ${bridge.weekdaysCount}`}</Tooltip>;
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
        // TODO: render the button only if is not a weekend day or holiday
        if (((!this.props.isHoliday && !this.props.isWeekend) || this.state.isLocked) && !this.isDayInThePast(this.props.day)) {
            return <Button className={this.state.isLocked ? 'unlock-btn' : 'lock-btn'} style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }} onClick={this.toggleLock}>
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
            <Col className={className}>
                <Row style={{ textAlign: 'center', justifyContent: 'flex-start' }}>
                    <h4 style={{ padding: '.375rem .75rem' }}>{this.props.dayOfTheMonth}</h4>
                    {this.renderLockButton()}
                </Row>
                {this.props.bridges.map(bridge => {
                    const { background, marginLeft, marginRight } = bridge
                    if (Object.keys(bridge).length > 0) {
                        return <OverlayTrigger
                            key={`${this.props.month}${this.props.dayOfTheMonth}${bridge.id}`}
                            placement="bottom"
                            delay={{ show: 250, hide: 250 }}
                            overlay={this.renderTooltip(bridge)}
                        ><Row style={{ background, marginLeft, marginRight }}>
                                <Col md={12} style={{ height: '20px' }} >
                                </Col>
                            </Row>
                        </OverlayTrigger>
                    } else {
                        return <Row key={`${this.props.month}${this.props.dayOfTheMonth}${bridge.id}`} style={{ background, marginLeft, marginRight }}>
                            <Col md={12} style={{ height: '20px' }} >
                            </Col>
                        </Row>
                    }
                })}
            </Col>
        );
    }
}