import React, { Component } from "react";
import { Row, Col, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import './DayOnCalendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
export default class DayOnCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridges: props.bridges,
            isHoliday: props.isHoliday,
            dayOfTheMonth: '',
            month: '',
            isLocked: false
        }
    }
    renderTooltip = (bridge) => {
        return <Tooltip style={{ fontSize: '1.5rem' }}>{`Festivi: ${bridge.holidaysCount} - Feriali: ${bridge.weekdaysCount}`}</Tooltip>;
    }
    toggleLock = () => {
        this.setState({
            isLocked: !this.state.isLocked
        })
    }
    renderLockButton = () => {
        // TODO: render the button only if is not a weekend day or holiday
        if (this.state.isHoliday) {
            return <Button className="lock-btn" style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '-30%' }} onClick={this.toggleLock}>
                <FontAwesomeIcon icon={this.state.isLocked ? faLock : faLockOpen}></FontAwesomeIcon>
            </Button>
        }
    }
    render() {
        let className = this.props.isWeekend ? 'weekend' : 'defaultDay'
        className = this.props.isHoliday ? 'holiday' : className
        return (
            <Col className={className}>
                <Row style={{ textAlign: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ marginLeft: '-30%' }}>{this.props.dayOfTheMonth}</h4>
                    {this.renderLockButton}
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