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
        return <Tooltip style={{ fontSize: '1.5rem' }}>{`Festivi: ${bridge.holidaysCount} - Feriali: ${bridge.weekdaysCount}`}</Tooltip>;
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