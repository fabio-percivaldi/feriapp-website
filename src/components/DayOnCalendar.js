import React, { Component } from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import './DayOnCalendar.css'
export default class DayOnCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridges: props.bridges,
            isHoliday: props.isHoliday,
            dayOfTheMonth: '',
            month: ''
        }
    }
    renderTooltip = (bridge) => {
        return <Tooltip style={{ fontSize: '1.5rem' }}>{`Holidays: ${bridge.holidaysCount} - Weekdays: ${bridge.weekdaysCount}`}</Tooltip>;
    }
    render() {
        let className = this.props.isWeekend ? 'weekend' : 'defaultDay'
        className = this.props.isHoliday ? 'holiday' : className
        return (
            <Col className={className}>
                <Row style={{ textAlign: 'center' }}>
                    {this.props.dayOfTheMonth}
                </Row>
                {this.props.bridges.map(bridge => {
                    const { background, id, marginLeft, marginRight } = bridge
                    return <OverlayTrigger
                        key={id}
                        placement="bottom"
                        delay={{ show: 250, hide: 250 }}
                        overlay={this.renderTooltip(bridge)}
                    ><Row style={{ background, marginLeft, marginRight }}>
                            <Col md={12} style={{ height: '20px' }} >
                            </Col>
                        </Row>
                    </OverlayTrigger>
                })}
            </Col>
        );
    }
}